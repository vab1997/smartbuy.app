import { envConfig } from '@/lib/config';
import { sendEmail } from '@/lib/send-email';
import { tryCatch } from '@/lib/try-catch';
import { extractProduct } from '@/services/extract-product-info';
import { productWishedService } from '@/services/product-wished';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${envConfig.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const start = Date.now();

  const { data: products, error } = await tryCatch(
    productWishedService.getAll()
  );

  if (error || !products) {
    console.warn(`Error getting products:`, error);
    return;
  }

  await Promise.all(
    products.map(async (product) => {
      const { data: productInfo, error } = await tryCatch(
        extractProduct(product.url)
      );

      if (error || !productInfo || !productInfo.productDetails) {
        console.warn(`Error processing product ${product.id}:`, error);
        return;
      }

      const priceProduct = Number(productInfo?.productDetails?.price);
      const lowPriceWithRespectToLastProductWishedHistory =
        priceProduct <
        Number(product.productWishedHistory?.[0]?.price);

      const increasedPercentageOfDiscount =
        product.productWishedHistory?.[0]?.discount &&
        productInfo.productDetails.discount &&
        Number(product.productWishedHistory?.[0]?.discount) <
          Number(productInfo.productDetails.discount)


      const { data: productWishedHistory, error: productWishedHistoryError } =
        await tryCatch(
          productWishedService.createProductWishedHistoryAndUsage({
            productWishedId: product.id,
            userId: product.userId,
            currency: productInfo.productDetails.currency,
            price: productInfo.productDetails.price,
            priceWithoutDiscount:
              productInfo.productDetails.priceWithoutDiscount,
            discount: productInfo.productDetails.discount,
            rating: isNaN(Number(productInfo.productDetails.rating))
              ? '0'
              : String(productInfo.productDetails.rating),
            reviewsCount: isNaN(Number(productInfo.productDetails.reviews))
              ? 0
              : Number(productInfo.productDetails.reviews),
            stock: productInfo.productDetails.stock,
            promptTokens: productInfo.usage.promptTokens,
            completionTokens: productInfo.usage.completionTokens,
            totalTokens: productInfo.usage.totalTokens,
            timeTaken: productInfo.usage.timeTaken.toString(),
          })
        );

      if (productWishedHistoryError || !productWishedHistory) {
        console.warn(
          `Error creating product wished history for product ${product.id}:`,
          productWishedHistoryError
        );
        return;
      }

      if (lowPriceWithRespectToLastProductWishedHistory || increasedPercentageOfDiscount) {
        await sendEmail({
          name: productInfo.productDetails.name,
          price: productInfo.productDetails.price,
          discount: productInfo.productDetails.discount,
          stock: productInfo.productDetails.stock,
          url: product.url,
          image: productInfo.productDetails.img,
          email: product.user?.email as string,
          isPriceAlert: lowPriceWithRespectToLastProductWishedHistory,
          isStockAlert: Boolean(increasedPercentageOfDiscount),
        });
      }

      console.log(`Product ${product.id} processed successfully`);
      return;
    })
  );

  const end = Date.now();
  const timeTaken = (end - start) / 1000;

  return new Response(JSON.stringify({ timeTaken, products: products.length }), { status: 200 });
}
