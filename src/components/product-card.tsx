import { AddProduct } from '@/components/form-add-product';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { extractProductInfo } from '@/services/extracted-product-info';
import { CustomScrollbarStyles } from '@/styles/scrollbar';
import { ExternalLink, Eye } from 'lucide-react';
import { ProductImage } from './product/product-image';
import { StarRating } from './product/star-rating';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export async function ProductCard({
  url,
  userId,
}: {
  url: string;
  userId?: string;
}) {
  if (!url) {
    return null;
  }

  const productInfo = await extractProductInfo(url);

  if (!productInfo.productDetails || productInfo.error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error al obtener información del producto</AlertTitle>
        <AlertDescription>
          {productInfo.error &&
            'La URL no es una página de producto o la URL no es válida'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      {productInfo && 'productDetails' in productInfo && (
        <Card className="w-full mx-auto overflow-hidden bg-background text-foreground border border-border mb-24">
          <CustomScrollbarStyles />
          <div className="md:flex">
            <ProductImage
              image={productInfo.productDetails.img || ''}
              name={productInfo.productDetails.name || ''}
              className="rounded-tr-none rounded-br-none"
              size="4xl"
            />
            <div className="p-6 flex flex-col justify-between w-full md:w-2/3">
              <CardHeader className="p-0">
                <div className="flex justify-between flex-col items-start">
                  <CardTitle className="text-2xl font-bold text-white flex flex-col gap-3 break-words">
                    <div className="flex items-center gap-2 relative">
                      <h2 className="text-2xl font-bold text-white">
                        {productInfo.productDetails.name || ''}
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block ml-2 text-gray-400 hover:text-gray-300"
                        >
                          <ExternalLink className="w-4 h-4 inline" />
                        </a>
                      </h2>
                    </div>
                    <div className="text-gray-400 text-sm flex items-center gap-3">
                      {productInfo.productDetails.rating &&
                        Number(productInfo.productDetails.rating) > 0 && (
                          <StarRating
                            rating={Number(productInfo.productDetails.rating)}
                          />
                        )}
                      {productInfo.productDetails.reviews &&
                        Number(productInfo.productDetails.reviews) > 0 && (
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {`${productInfo.productDetails.reviews} reviews`}
                          </span>
                        )}
                    </div>
                  </CardTitle>
                  <CardDescription className="text-xl flex gap-1 mt-2 flex-col w-full">
                    <div className="text-gray-400 text-sm w-full whitespace-pre-line block h-44 overflow-y-auto scroll-smooth custom-scrollbar px-2">
                      {productInfo.productDetails.description || ''}
                    </div>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-0 mt-4 w-full">
                <div className="font-bold mt-4 flex justify-between items-center">
                  <div className="text-4xl">
                    {productInfo.productDetails.discount !== null &&
                      Number(productInfo.productDetails.discount) !== 0 && (
                        <div className="flex gap-1">
                          <span className="line-through text-gray-500 text-base">
                            {productInfo.productDetails.currency}
                            {productInfo.productDetails.priceWithoutDiscount
                              ? Number(
                                  productInfo.productDetails
                                    .priceWithoutDiscount
                                ).toFixed(2)
                              : null}
                          </span>
                        </div>
                      )}
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2">
                        <span>
                          {productInfo.productDetails.currency}
                          {Number(productInfo.productDetails.price)}
                        </span>
                        <span className="text-green-500 text-base">
                          {productInfo.productDetails.discount !== null &&
                            Number(productInfo.productDetails.discount) !== 0 &&
                            ` ${productInfo.productDetails.discount}% off`}
                        </span>
                      </div>
                      <span className="text-green-500 text-xs">
                        {productInfo.productDetails.stock &&
                          `${productInfo.productDetails.stock} en stock`}
                      </span>
                    </div>
                  </div>

                  <AddProduct
                    userId={userId}
                    url={url}
                    name={productInfo.productDetails.name || ''}
                    price={Number(productInfo.productDetails.price) || 0}
                    currency={productInfo.productDetails.currency || ''}
                    rating={Number(productInfo.productDetails.rating) || 0}
                    image={productInfo.productDetails.img || ''}
                    discount={Number(productInfo.productDetails.discount) || 0}
                    description={productInfo.productDetails.description || ''}
                    reviews={Number(productInfo.productDetails.reviews) || 0}
                    stock={productInfo.productDetails.stock || ''}
                    priceWithoutDiscount={
                      Number(productInfo.productDetails.priceWithoutDiscount) ||
                      0
                    }
                    usage={productInfo.usage}
                  />
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="w-full mx-auto overflow-hidden bg-background text-foreground border border-border">
      <div className="md:flex">
        <div className="md:shrink-0 md:w-1/3">
          <Skeleton className="w-full h-full aspect-[0.90]" />
        </div>
        <div className="p-6 flex flex-col justify-between w-full md:w-2/3">
          <CardHeader className="p-0">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          </CardHeader>
          <CardContent className="p-0 mt-4 space-y-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-5 rounded-full" />
              ))}
              <Skeleton className="h-4 w-12 ml-2" />
            </div>
            <Skeleton className="h-10 w-24" />
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
