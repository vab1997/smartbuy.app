import { productWishedService } from "@/services/product-wished";
import { envConfig } from "@/lib/config";
export async function GET(request: Request) {
  const start = Date.now();
  
  // Get all products from the database
  const url = envConfig.VERCEL_URL;
  const products = await productWishedService.getAll();

  // Trigger the cron job for each product
  Promise.all(products.map(async (product) => {
    fetch(`${url}/api/extract-product-info-and-saved?user_id=${product.userId}&product_id=${product.id}&page_url=${product.url}`);
  }));

  const end = Date.now();
  const timeTaken = (end - start) / 1000;

  return new Response(JSON.stringify({ timeTaken }), { status: 200 });
}