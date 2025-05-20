import { ProductInfoType } from '@/schema/extract-info';
import { CustomScrollbarStyles } from '@/styles/scrollbar';
import { ExternalLink, Eye } from 'lucide-react';
import { AddProduct, TokenUsageStats } from './form-add-product';
import { ProductImage } from './product/product-image';
import { StarRating } from './product/star-rating';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

export function ResultProductCard({
  userId,
  productDetails,
  url,
}: {
  userId?: string;
  productDetails: { productDetails: ProductInfoType; usage: TokenUsageStats };
  url: string;
}) {
  const { productDetails: product, usage } = productDetails;

  return (
    <Card className="w-full mx-auto h-auto overflow-hidden bg-background text-foreground border border-border mb-24">
      <CustomScrollbarStyles />
      <div className="md:flex">
        <ProductImage
          image={product.img}
          name={product.name}
          className="rounded-tr-none rounded-br-none h-96 md:w-[450px]"
        />
        <div className="p-6 flex flex-col justify-between w-full">
          <CardHeader className="p-0">
            <div className="flex justify-between flex-col items-start">
              <CardTitle className="text-2xl font-bold text-white flex flex-col gap-3 break-words">
                <div className="flex items-center gap-2 relative">
                  <h2 className="text-2xl font-bold text-white">
                    {product.name}
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
                  {'rating' in product && Number(product.rating) > 0 && (
                    <StarRating rating={Number(product.rating)} />
                  )}
                  {'reviews' in product &&
                    !isNaN(Number(product.reviews)) &&
                    Number(product.reviews) !== 0 && (
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {`${product.reviews} reviews`}
                      </span>
                    )}
                </div>
              </CardTitle>
              <CardDescription className="text-xl flex gap-1 mt-2 flex-col w-full">
                <div className="text-gray-400 text-sm w-full whitespace-pre-line block h-20 overflow-y-auto scroll-smooth custom-scrollbar px-2">
                  {product.description}
                </div>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0 mt-4 w-full">
            <div className="font-bold mt-4 flex justify-between items-center">
              <div className="text-4xl">
                {'priceWithoutDiscount' in product &&
                product.priceWithoutDiscount !== null ? (
                  <div className="flex gap-1">
                    <span className="line-through text-gray-500 text-base">
                      {product.currency}
                      {product.priceWithoutDiscount}
                    </span>
                  </div>
                ) : null}
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2">
                    <span>{product.price}</span>
                    {product.discount && Number(product.discount) !== 0 ? (
                      <span className="text-green-500 text-base">
                        {`${product.discount}% off`}
                      </span>
                    ) : null}
                  </div>
                  <span className="text-green-500 text-xs">
                    {product.stock && `${product.stock}`}
                  </span>
                </div>
              </div>

              <AddProduct
                userId={userId}
                url={url}
                name={product.name}
                price={product.price}
                currency={product.currency}
                rating={Number(product.rating)}
                image={product.img}
                discount={product.discount}
                description={product.description}
                reviews={product.reviews}
                stock={product.stock}
                priceWithoutDiscount={product.priceWithoutDiscount}
                usage={usage}
              />
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
