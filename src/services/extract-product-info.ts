import {
  ARGS_CHROME,
  ATTRIBUTES_TO_REMOVE,
  EXTRA_HTTP_HEADERS,
  TAGS_TO_REMOVE,
  USER_AGENTS,
} from '@/lib/constants';
import { tryCatch } from '@/lib/try-catch';
import { ProductInfoSchema, ProductInfoType } from '@/schema/extract-info';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import * as cheerio from 'cheerio';
import playwright from 'playwright-aws-lambda';

function generatePrompt(bodyContent: string | null) {
  if (!bodyContent) {
    throw new Error('Body content is required');
  }

  return `
    You are an expert at extracting product information from HTML.
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

    If it IS a product page, extract the following information with these specific rules:
    1. **Product Name:** Look for the most prominent heading (<h1> or <h2> tag) or any text that clearly identifies the product name.

    2. **Price:**
       - Extract the price exactly as it appears visually on the page, including thousands separators (dot or comma).
       - Do NOT add decimals if the original price does not have them.
       - If the price has decimals, keep them.
       - Do NOT convert the price to a plain number (e.g., "17999.00" is incorrect if the page shows "17.999").
       - Examples:
         - "$17.999" → "17.999"
         - "$1,299.50" → "1,299.50"
         - "$2.500" → "2.500"
         - "$109.99" → "109.99"
         - "$1,666.66" → "1666.66"

    3. **Currency:**
       - Extract the currency exactly as it appears next to the price on the web page (e.g., "$", "US$", "ARS", "€", etc.).
       - Do NOT infer, translate, or standardize the currency in any way.
       - The value must be the exact string shown on the page.

    4. **Price without discount:**
       - Extract the price without the discount. The price without discount is the price without the discount. Normaly is the same price but with a different color and localization is over or under the price. The price without discount might be in a <p>, <span>, or <div> tag. The price without discount can be in different formats(for example: $1.666.666, $1,666,666, etc.) so you extract the price without the currency symbol but always return the price without discount with the cents. The cents are the two last digits of the price.
       - If there is no price without discount, return null

    5. **Discount:**
       - Extract exactly the discount percentage
       - Only include if there is an actual discount (priceWithoutDiscount > price)
       - Example: If priceWithoutDiscount is "109.99" and price is "99.95", the page sure shows a discount, so the discount should be "9"

    6. **Rating:**
       - Extract the numerical rating value
       - Include one decimal place
       - Example: "4.7 out of 5" should be "4.7"

    7. **Reviews:**
       - Extract the number of reviews
       - Remove any text or formatting
       - Convert to a number
       - Example: "1,234 reviews" should be "1234"

    8. **Description:**
       - Look for the product description in the page
       - If no description is found, use the product name
       - Remove any HTML tags or special formatting

    9. **Image URL:**
       - Look for the main product image
       - Extract the highest quality image URL available
       - Prioritize images that appear to be the main product photo

    10. **Stock:**
       - Check if the product is in stock
       - if it is, first check if shows the stock in the page, example: "+50 disponibles", if it does, return the stock
       - if it's not, return "check the website for stock"
       - always check the stock before returning it

    Return the extracted information as a JSON object with the following format:
    \`\`\`json
    {
      "name": "Product Name",
      "price": "99.95",
      "priceWithoutDiscount": "109.99",
      "discount": "9",
      "currency": "USD",
      "rating": "4.7",
      "reviews": "1234",
      "description": "Product Description",
      "img": "https://example.com/image.jpg",
      "stock": "Available"
    }
    \`\`\`
    HTML Content:
    ${bodyContent}
  `;
}

export async function extractProduct(url: string) {
  const start = Date.now();

  const browser = await playwright.launchChromium({
    headless: true,
    args: [...ARGS_CHROME, '--no-sandbox', '--disable-setuid-sandbox'],
  });

  if (!browser) {
    throw new Error('Error to launch the browser');
  }

  const context = await browser.newContext({
    userAgent: USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)],
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    isMobile: false,
    permissions: ['geolocation'],
    extraHTTPHeaders: EXTRA_HTTP_HEADERS,
  });

  const page = await context.newPage();
  await page.goto(url);
  const content = await page.content();
  await browser.close();

  const $ = cheerio.load(content);

  TAGS_TO_REMOVE.forEach((tag) => {
    $(tag).remove();
  });

  $('*').each((i, elem) => {
    ATTRIBUTES_TO_REMOVE.forEach((attr) => {
      $(elem).removeAttr(attr);
    });
  });

  const bodyContent = $('body').html();

  const { data: productInfo, error: productInfoError } = await tryCatch(
    generateObject<ProductInfoType>({
      model: google('gemini-2.0-flash-001'),
      prompt: generatePrompt(bodyContent),
      schema: ProductInfoSchema,
    })
  );

  if (productInfoError) {
    console.error('Error:', productInfoError);
    throw new Error('Error fetching the product info');
  }

  console.log({ productInfo: productInfo.object, usage: productInfo.usage });

  const end = Date.now();
  const timeTaken = (end - start) / 1000;

  const productDetails = productInfo.object ?? null;
  const usage = {
    promptTokens: productInfo.usage.promptTokens,
    completionTokens: productInfo.usage.completionTokens,
    totalTokens: productInfo.usage.totalTokens,
    timeTaken: timeTaken,
  };

  return { productDetails, usage };
}
