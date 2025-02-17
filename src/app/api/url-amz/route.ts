import playwright from 'playwright-aws-lambda'
import * as cheerio from 'cheerio';
import { JSDOM } from 'jsdom';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { searchParams } = url;
  const urlToPreview = searchParams.get('url_prev');
  

  if (!urlToPreview) {
    return new Response('Missing url parameter', { status: 400 });
  }

  function extraerCodigo(url: string) {
    const regex = /\/dp\/([A-Z0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  const idProduct = extraerCodigo(urlToPreview);
  console.log({idProduct});
  // const urlToGo = `https://www.amazon.com/gp/product/ajax?asin=${idProduct}&m=&qid=&smid=&sourcecustomerorglistid=&sourcecustomerorglistitemid=&sr=&pc=dp&experienceId=aodAjaxMain`;
  const urlToGo = `https://www.amazon.com/gp/aod/ajax/?asin=${idProduct}&m=&qid=1618419581&smid=&sourcecustomerorglistid=&sourcecustomerorglistitemid=&sr=8-5&pc=dp`;
 
  let browser = null;

  browser = await playwright.launchChromium({
    headless: true
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(urlToGo);

  const pageTitle = await page.title();

  const $ = cheerio.load(await page.content());

  // Esperar a que el título de la página esté disponible
  await page.waitForSelector('#aod-asin-title-text');

  const infoProd = $('#aod-asin-title-text').text();
  console.log({infoProd});
  const img = $('#pinned-image-id').find('img').attr('src');
  console.log(img);
  // Obtener el descuento del segundo span
  // const discount = $('div.a-section').text();
  // console.log({ discount });

  // Obtener el descuento
  const discount = $('span.aok-offscreen').text().trim();
  console.log({ discount });

  // Obtener el precio
  const priceWhole = $('.a-price .a-offscreen').text().trim();
  const priceFraction = $('.a-price-fraction').text().trim();
  const price = `${priceWhole}.${priceFraction}`;
  console.log({ price });

  let offers = [];
  for (const offer of $('.a-section')) {
    const el = $(offer);

    console.log(el.find('.a-section').text().trim());

    offers.push({
      price: el.find('.a-offscreen').text().trim(),
      sellerName: el.find('div[id*="soldBy"] a[aria-label]').text().trim(),
    })
  }
  console.log({ offers });

  // const jsdom = new JSDOM(await page.content());
  // const priceJS = jsdom.window.document.querySelector('.a-price .a-offscreen')?.textContent;
  // console.log({ priceJS });

  await browser.close();

  return new Response(JSON.stringify({ url_prev: urlToPreview, page_title: pageTitle, infoProd, img }), {
    headers: { 'content-type': 'application/json' },
  });
}