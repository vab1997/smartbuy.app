import { envConfig } from "@/lib/config";

type ProductDetails = {
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

type Usage = {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  timeTaken: number;
}

type ProductInfo = {
  productDetails: ProductDetails;
  error: string | null;
  usage: Usage;
}

export async function extractProductInfo(url: string) {
  try {
    const productPage = `${envConfig.VERCEL_URL}/api/get-product-info?page_url=${url}`
    const getProductInfo = await fetch(productPage);
    const productInfo = await getProductInfo.json() as ProductInfo;
    return productInfo;
  } catch (error) {
    console.error('Error:', error);
    return {
      productDetails: null,
      error: 'Error fetching the product info',
      usage: {
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
        timeTaken: 0,
      },
    };
  }
}