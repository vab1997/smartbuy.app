import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import playwright from 'playwright-aws-lambda';
import * as cheerio from 'cheerio';

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
];

const TAGS_TO_REMOVE = [
  'head',
  'script', 
  'style',
  'noscript',
  'link',
  'svg',
  'iframe',
  'link[rel="stylesheet"]',
  'meta[name="description"]',
  'meta[name="keywords"]',
  'meta[name="robots"]',
  'meta[name="author"]',
  'meta[name="generator"]',
  'meta[name="copyright"]',
  'meta[name="language"]',
  'meta[name="distribution"]'
];

const ATTRIBUTES_TO_REMOVE = [
  'id',
  'class', 
  'style',
  'aria-label',
  'aria-hidden',
  'data-*',
  'role',
  'tabindex',
  'title',
  'alt',
  'target',
  'rel',
  'onclick',
  'onload',
  'onerror',
  'aria-*'
];

export interface ProductInfo {
  name: string | null;
  price: string | null;
  priceWithoutDiscount: string | null;
  discount: string | null;
  currency: string | null;
  rating: string | null;
  reviews: string | null;
  description: string | null;
  img: string | null;
  stock: string | null;
}

interface UsageInfo {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export async function GET(request: Request) {
  const start = Date.now();
  const url = new URL(request.url);
  const { searchParams } = url;
  const urlParams = searchParams.get('page_url');
  const decodedUrlParams = decodeURIComponent(urlParams?.split("#")[0] || '');

  if (!urlParams) {
    return new Response('Missing url parameter', { status: 400 });
  }

  let browser = null;
  let productDetails: ProductInfo | null = null;
  let usage: UsageInfo | null = null;
  
  try {
    browser = await playwright.launchChromium({ 
      headless: true,
      args: [
        '--disable-blink-features=AutomationControlled',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
      ]
    });

    const context = await browser.newContext({
      userAgent: USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)],
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
      isMobile: false,
      permissions: ['geolocation'],
      extraHTTPHeaders: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Cache-Control': 'max-age=0'
      }
    });

    const page = await context.newPage();
    await page.goto(decodedUrlParams);
    const content = await page.content();
    await browser.close();

    const $ = cheerio.load(content);
    
    TAGS_TO_REMOVE.forEach(tag => {
      $(tag).remove();
    });

    $('*').each((i, elem) => {
      ATTRIBUTES_TO_REMOVE.forEach(attr => {
        $(elem).removeAttr(attr);
      });
    });

    const bodyContent = $('body').html();

    const { text: textResponse, usage: usageResponse } = await generateText({
      model: google('gemini-2.0-flash-001'),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `You are an expert at extracting product information from HTML.
                Given the following HTML content, first determine if this is a product page.
                If it's not a product page, return: { "error": "This is not a product page" }
                
                To determine if it's a product page, look for these indicators:
                - Presence of product-specific elements (price, add to cart button, product images)
                - Product name in prominent heading
                - Product details/specifications
                - doesn't have a search bar
                - doesn't have a list of products
                - doesn't have a list of filters
                - doesn't have a list of sort options
                - doesn't have a list of pagination options
                - The HTML may be very long as is the case of Amazon, for those cases the content reads well before return error, so you should return the product info anyway.
                
                If it IS a product page, extract the following information:
                1.  **Product Name:** Look for the most prominent heading (<h1> or <h2> tag) or any text that clearly identifies the product name.
                2.  **Price:** The price is the part most important in the data, then focus to extract correctly the price. The price might be in a <p>, <span>, or <div> tag. The price can be in different formats(for example: $1.666.666, $1,666,666, etc.) so you extract the price without the currency symbol but always return the price with the cents. The cents are the two last digits of the price.
                3.  **Price without discount:** Extract the price without the discount. The price without discount is the price without the discount. Normaly is the same price but with a different color and localization is over or under the price. The price without discount might be in a <p>, <span>, or <div> tag. The price without discount can be in different formats(for example: $1.666.666, $1,666,666, etc.) so you extract the price without the currency symbol but always return the price without discount with the cents. The cents are the two last digits of the price.
                4.  **Currency:** Look for the currency in the page. The currency is the currency of the price. Always is before the price.
                5.  **Discount:** Look for text that includes a currency symbol ($ , €, etc.) or the word "USD", "EUR", etc.
                6.  **Image URL:** Look for <img> tags and extract the "src" attribute. Prioritize image that seem to be the main product image and is the image of the card of the product.
                7.  **Rating:** Look for the product rating in the page.
                8.  **Reviews:** Look for the number of reviews in the page.
                9.  **Description:** Look for the product description in the page. Look for the most prominent heading (<p> or <span> tag) or any text that clearly identifies the product description.
                10.  **Stock:** first check if the product is in stock, if it is, return the stock, if it's not, return "check the website for stock", but always check the stock before returning it.
                
                Return the extracted information as a JSON object with the following format:
                \`\`\`json
                {
                  "name": "Apple iPhone 13 (128 GB) - Azul medianoche",
                  "price": "1.666.666",
                  "priceWithoutDiscount": "2.000.000",
                  "discount": "33",
                  "currency": "USD",
                  "rating": "4.5",
                  "reviews": "100",
                  "description": "Apple iPhone 13 (128 GB) - Azul medianoche",
                  "img": "https://www.apple.com/co/iphone-13/images/overview/hero_large_2x.jpg",
                  "stock": "+25 available"
                }
                \`\`\`
                
                HTML Content:
                ${bodyContent}`,
            },
          ],
        },
      ],
    });

    const jsonStr = textResponse.split('```json\n')[1].split('\n```')[0];
    const parsedResponse = JSON.parse(jsonStr);
    
    if (parsedResponse.error) {
      return new Response(JSON.stringify({ 
        error: parsedResponse.error,
        usage: usageResponse 
      }), {
        headers: { 'content-type': 'application/json' },
      });
    }

    productDetails = parsedResponse as ProductInfo;
    usage = usageResponse as UsageInfo;
  } catch (error) {
    console.error('Error:', error);
    return new Response('Error fetching the product info', { status: 500 });
  }

  const end = Date.now();
  const timeTaken = (end - start) / 1000;

  return new Response(JSON.stringify({ 
    productDetails,
    usage: {
      promptTokens: usage?.promptTokens,
      completionTokens: usage?.completionTokens,
      totalTokens: usage?.totalTokens,
      timeTaken,
    },
  }), {
    headers: { 'content-type': 'application/json' },
  });
}
