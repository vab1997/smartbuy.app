import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink, Eye, Star } from 'lucide-react';

interface ProductCardProps {
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
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={star} className="relative">
          <Star className="w-5 h-5 text-gray-700" fill="currentColor" />
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{
              width: `${Math.max(0, Math.min(100, (rating - star + 1) * 100))}%`,
            }}
          >
            <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />{' '}
          </div>
        </div>
      ))}
      {`(${rating})`}
    </div>
  );
};

export function ProductCard({
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
}: ProductCardProps) {
  console.log({ discount, price });

  const priceWithoutDiscount = discount && price / ((100 - discount) / 100);

  return (
    <Card className="w-full mx-auto overflow-hidden bg-black text-white border border-gray-800">
      <CustomScrollbarStyles />
      <div className="md:flex">
        <div className="md:flex-shrink-0 md:w-1/3">
          <img
            className="w-full h-full object-cover aspect-square"
            src={image || '/placeholder.svg'}
            alt={name}
          />
        </div>
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
                <div className="text-gray-400 text-sm w-full whitespace-pre-line block h-44 overflow-y-auto scroll-smooth custom-scrollbar ">
                  {description}
                </div>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0 mt-4 w-full">
            <div className="font-bold mt-4 flex justify-between items-center">
              <div className="text-4xl">
                {discount !== 0 && (
                  <div className="flex gap-1">
                    <span className="line-through text-gray-500 text-base">
                      {currency}
                      {priceWithoutDiscount?.toFixed(2) || 0}
                    </span>
                  </div>
                )}
                <div className="flex gap-2">
                  <span>
                    {currency}
                    {price?.toFixed(2) || 0}
                  </span>
                  <span className="text-green-500 text-base">
                    {discount !== 0 && ` ${discount}% off`}
                  </span>
                </div>
              </div>
              <span className="text-lg text-green-500">
                {stock && `${stock} en stock`}
              </span>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="w-full mx-auto overflow-hidden bg-black text-white border border-gray-800">
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

// Add custom scrollbar styles
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #1f2937;
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
`;

export function CustomScrollbarStyles() {
  return <style>{styles}</style>;
}
