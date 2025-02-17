import playwright from 'playwright-aws-lambda'

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { searchParams } = url;
  const urlToPreview = searchParams.get('page_url');

  if (!urlToPreview) {
    return new Response('Missing url parameter', { status: 400 });
  }
 
  let browser = null;

  browser = await playwright.launchChromium({
    headless: true,
  });
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto(urlToPreview);
  const pageTitle = await page.title();
  
  // get the html content of the page
  const infoProd = await page.$$eval('*', (results) => {
    return results.slice(0,1).map((el) => {
      const title = el.querySelector('h1')?.innerText;
      const priceElement = el.querySelector('.ui-pdp-price__second-line');
      const priceWithoutDiscountElement = el.querySelector('.andes-money-amount__fraction');
      const currencyElement = el.querySelector('.andes-money-amount__currency-symbol');
      const discountElement = el.querySelector('.ui-pdp-price__second-line__label .andes-money-amount__discount');
      const productImageElement = el.querySelector('.ui-pdp-gallery__figure');
      const ratingElement = el.querySelector('.ui-review-capability__rating__average');

      if (!title || !priceElement) {
        return;
      }

      const price = priceElement.querySelector('meta[itemprop="price"]')?.getAttribute('content');
      const priceWithoutDiscount = priceWithoutDiscountElement?.innerHTML;
      const currency = currencyElement?.innerHTML;
      const discount = discountElement?.innerHTML;
      const img = productImageElement?.querySelector('img')?.getAttribute('src');
      const rating = ratingElement?.innerHTML;

      return { title, priceWithoutDiscount, price, currency, discount, img, rating };
    }).filter(Boolean);
  });

  console.log(infoProd);

  await browser.close();

  return new Response(JSON.stringify({ url_prev: urlToPreview, page_title: pageTitle, infoProd }), {
    headers: { 'content-type': 'application/json' },
  });
}