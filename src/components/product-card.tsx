import { AddProduct } from '@/components/form-add-product';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { tryCatch } from '@/lib/try-catch';
import { extractProduct } from '@/services/extract-product-info';
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
  const { data: productInfo, error } = await tryCatch(extractProduct(url));
  const { productDetails } = productInfo ?? {};

  if (error || !productDetails) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error al obtener información del producto</AlertTitle>
        <AlertDescription>
          Se ha producido un error al obtener la información del producto
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="w-full mx-auto h-96 overflow-hidden bg-background text-foreground border border-border mb-24">
      <CustomScrollbarStyles />
      <div className="md:flex">
        <ProductImage
          image={productDetails.img}
          name={productDetails.name}
          className="rounded-tr-none rounded-br-none w-full h-full"
          size="4xl"
        />
        <div className="p-6 flex flex-col justify-between w-full">
          <CardHeader className="p-0">
            <div className="flex justify-between flex-col items-start">
              <CardTitle className="text-2xl font-bold text-white flex flex-col gap-3 break-words">
                <div className="flex items-center gap-2 relative">
                  <h2 className="text-2xl font-bold text-white">
                    {productDetails.name}
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
                  {'rating' in productDetails &&
                    Number(productDetails.rating) > 0 && (
                      <StarRating rating={Number(productDetails.rating)} />
                    )}
                  {'reviews' in productDetails &&
                    !isNaN(Number(productDetails.reviews)) &&
                    Number(productDetails.reviews) !== 0 && (
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {`${productDetails.reviews} reviews`}
                      </span>
                    )}
                </div>
              </CardTitle>
              <CardDescription className="text-xl flex gap-1 mt-2 flex-col w-full">
                <div className="text-gray-400 text-sm w-full whitespace-pre-line block h-20 overflow-y-auto scroll-smooth custom-scrollbar px-2">
                  {productDetails.description}
                </div>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0 mt-4 w-full">
            <div className="font-bold mt-4 flex justify-between items-center">
              <div className="text-4xl">
                {'priceWithoutDiscount' in productDetails &&
                productDetails.priceWithoutDiscount !== null ? (
                  <div className="flex gap-1">
                    <span className="line-through text-gray-500 text-base">
                      {productDetails.currency}
                      {productDetails.priceWithoutDiscount}
                    </span>
                  </div>
                ) : null}
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2">
                    <span>
                      {productDetails.currency}
                      {Number(productDetails.price)}
                    </span>
                    {productDetails.discount &&
                    Number(productDetails.discount) !== 0 ? (
                      <span className="text-green-500 text-base">
                        {`${productDetails.discount}% off`}
                      </span>
                    ) : null}
                  </div>
                  <span className="text-green-500 text-xs">
                    {productDetails.stock && `${productDetails.stock}`}
                  </span>
                </div>
              </div>

              <AddProduct
                userId={userId}
                url={url}
                name={productDetails.name}
                price={Number(productDetails.price)}
                currency={productDetails.currency}
                rating={Number(productDetails.rating)}
                image={productDetails.img}
                discount={
                  isNaN(Number(productDetails.discount))
                    ? 0
                    : Number(productDetails.discount)
                }
                description={productDetails.description}
                reviews={
                  isNaN(Number(productDetails.reviews))
                    ? 0
                    : Number(productDetails.reviews)
                }
                stock={productDetails.stock}
                priceWithoutDiscount={Number(
                  productDetails.priceWithoutDiscount
                )}
                usage={productInfo.usage}
              />
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
