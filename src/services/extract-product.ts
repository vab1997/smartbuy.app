
import { ProductInfoSchema } from '@/schema/extract-info';
import { envConfig } from '@/lib/config';
import FirecrawlApp from '@mendable/firecrawl-js';

const app = new FirecrawlApp({
  apiKey: envConfig.FIRECRAWL_API_KEY,
});

export async function extractProduct(url: string) {
  const start = Date.now();

  const scrapeResponse = await app.scrapeUrl(url, {
    formats: ['json'],
    jsonOptions: { schema: ProductInfoSchema },
  });

  if (!scrapeResponse.success) {
    throw new Error(`Failed to scrape: ${scrapeResponse.error}`);
  }

  if (scrapeResponse.error) {
    console.error('Error:', scrapeResponse.error);
    throw new Error('Error fetching the body content');
  }

  if (!scrapeResponse.json) {
    throw new Error('No JSON data found');
  }

  const end = Date.now();
  const timeTaken = (end - start) / 1000;

  const productDetails = scrapeResponse.json;
  const usage = {
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    timeTaken: timeTaken,
  };

  return { productDetails, usage };
}
