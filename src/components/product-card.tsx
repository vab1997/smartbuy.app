import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CustomScrollbarStyles } from '@/styles/scrollbar';
import { ExternalLink, Eye } from 'lucide-react';
import { ProductImage } from './product/product-image';
import { ProductPrice } from './product/product-price';
import { StarRating } from './product/star-rating';
import { UsageInfo } from './search-page';

interface ProductCardProps {
  userId?: string;
  url: string;
  name: string;
  price: number;
  currency: string;
  rating?: number;
  image: string;
  discount?: number;
  description: string;
  reviews: string;
  stock: string;
  readOnly?: boolean;
  usage: UsageInfo;
}

export function ProductCard({
  userId,
  url,
  name,
  price,
  currency,
  rating,
  image,
  discount,
  description,
  reviews,
  stock,
  readOnly = false,
  usage,
}: ProductCardProps) {
  return (
    <Card className="w-full mx-auto overflow-hidden bg-background text-foreground border border-border">
      <CustomScrollbarStyles />
      <div className="md:flex">
        <ProductImage image={image} name={name} />
        <div className="p-6 flex flex-col justify-between w-full md:w-2/3">
          <CardHeader className="p-0">
            <div className="flex justify-between flex-col items-start">
              <CardTitle className="text-2xl font-bold text-white flex flex-col gap-3 break-words">
                <div className="flex items-center gap-2 relative">
                  <h2 className="text-2xl font-bold text-white">
                    {name}
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
                  {rating && rating > 0 && <StarRating rating={rating} />}
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {reviews && `${reviews} reviews`}
                  </span>
                </div>
              </CardTitle>
              <CardDescription className="text-xl flex gap-1 mt-2 flex-col w-full">
                <div className="text-gray-400 text-sm w-full whitespace-pre-line block h-44 overflow-y-auto scroll-smooth custom-scrollbar">
                  {description}
                </div>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0 mt-4 w-full">
            <ProductPrice
              price={price}
              currency={currency}
              discount={discount}
              stock={stock}
              readOnly={readOnly}
              userId={userId}
              url={url}
              name={name}
              rating={rating || 0}
              image={image}
              description={description}
              reviews={Number(reviews)}
              usage={usage}
            />
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="w-full mx-auto overflow-hidden bg-background text-foreground border border-border">
      <div className="md:flex">
        <div className="md:flex-shrink-0 md:w-1/3">
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
