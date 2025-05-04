import { extractProductInfo } from "@/services/extracted-product-info";
import { productWishedService } from "@/services/product-wished";

export async function GET(request: Request) {
  const start = Date.now();
  const url = new URL(request.url);
  const { searchParams } = url;
  const pageUrl = searchParams.get('page_url');
  const userId = searchParams.get('user_id');
  const productId = searchParams.get('product_id');

  if (!pageUrl || !userId || !productId) {
    return new Response('No URL provided', { status: 400 });
  }

  const productInfo = await extractProductInfo(pageUrl);

  if (!productInfo || !productInfo.productDetails) {
    return new Response('No product info found', { status: 400 });
  }

  await productWishedService.createProductWishedHistoryAndUsage({
    productWishedId: productId,
    userId,
    currency: productInfo.productDetails.currency,
    price: productInfo.productDetails.price,
    priceWithoutDiscount: productInfo.productDetails.priceWithoutDiscount,
    discount: Number(productInfo.productDetails.discount),
    rating: productInfo.productDetails.rating,
    reviewsCount: Number(productInfo.productDetails.reviews) || 0,
    stock: productInfo.productDetails.stock,
    promptTokens: productInfo.usage.promptTokens,
    completionTokens: productInfo.usage.completionTokens,
    totalTokens: productInfo.usage.totalTokens,
    timeTaken: productInfo.usage.timeTaken.toString(),
  });

  const end = Date.now();
  const timeTaken = end - start;

  return new Response(JSON.stringify({ timeTaken }), { status: 200 });
}