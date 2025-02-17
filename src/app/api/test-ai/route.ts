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

interface ProductInfo {
  name: string | null;
  price: string | null;
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
  const url = new URL(request.url);
  const { searchParams } = url;
  const urlParams = searchParams.get('page_url');

  if (!urlParams) {
    return new Response('Missing url parameter', { status: 400 });
  }

  let browser = null;
  let text: ProductInfo | null = null;
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
    await page.goto(urlParams);
    const content = await page.content();

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
              
              If it IS a product page, extract the following information:
              1.  **Product Name:** Look for the most prominent heading (<h1> or <h2> tag) or any text that clearly identifies the product name.
              2.  **Price:** The price might be in a <p>, <span>, or <div> tag.
              3.  **Discount:** Look for text that includes a currency symbol ($ , €, etc.) or the word "USD", "EUR", etc.
              4.  **Image URL:** Look for <img> tags and extract the "src" attribute. Prioritize images that seem to be the main product image.
              5.  **Rating:** Look for the product rating in the page.
              6.  **Reviews:** Look for the number of reviews in the page.
              7.  **Description:** Look for the product description in the page. Look for the most prominent heading (<p> or <span> tag) or any text that clearly identifies the product description.
              8.  **Stock:** Look for the stock in the page.
              
              Return the extracted information as a JSON object with the following format:
              \`\`\`json
              {
                "name": "Product Name",
                "price": "Product Price",
                "discount": "Product Discount",
                "currency": "Product Currency",
                "rating": "Product Rating",
                "reviews": "Product Reviews",
                "description": "Product Description",
                "img": "Image URL",
                "stock": "Product Stock"
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

    text = parsedResponse as ProductInfo;
    usage = usageResponse as UsageInfo;

    console.log({ text, usage });

    await page.screenshot({
      path: `public/img/image-${crypto.randomUUID()}.png`,
      timeout: 10000,
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Error fetching the image', { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  return new Response(JSON.stringify({ 
    text,
    usage 
  }), {
    headers: { 'content-type': 'application/json' },
  });
}
