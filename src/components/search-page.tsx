'use client';

import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ProductCard, ProductCardSkeleton } from './product-card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface ProductInfo {
  name: string | null;
  price: string | null;
  discount: string | null;
  currency: string | null;
  rating: string | null;
  reviews: string | null;
  description: string | null;
  img: string | null;
  stock: string | null;
}

export interface UsageInfo {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  timeTaken: number;
}

export function SearchPage({ userId }: { userId?: string }) {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [productInfo, setProductInfo] = useState<
    | {
        text: ProductInfo;
        usage: UsageInfo;
      }
    | {
        error: string;
        usage: UsageInfo;
      }
    | undefined
  >();

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setIsLoading(true);
    const controller = new AbortController();
    const { signal } = controller;

    fetch(`/api/get-product-info?page_url=${searchQuery}`, { signal })
      .then((res) => res.json())
      .then(setProductInfo)
      .catch(console.error)
      .finally(() => setIsLoading(false));

    return () => {
      controller.abort();
    };
  }, [searchQuery]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const value = formData.get('url');

    if (!value) {
      toast.error('Please enter a URL to search for');
      return;
    }

    setSearchQuery(value as string);
  };

  console.log({ searchQuery, productInfo });

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch}>
        <div className="relative flex items-center gap-2 justify-center">
          <Input
            type="text"
            name="url"
            placeholder="Enter a URL to search for"
            className="w-full rounded-lg border border-gray-700/80 bg-transparent text-base hover:border-gray-700 transition-colors"
          />
          <Button
            variant="outline"
            type="submit"
            className="text-black bg-white border border-white rounded-md px-3 py-1 text-sm hover:opacity-85 hover:bg-white hover:text-black transition-opacity"
          >
            Search
          </Button>
        </div>
      </form>

      <div className="mt-8">
        {isLoading && <ProductCardSkeleton />}
        {productInfo && 'text' in productInfo && searchQuery && (
          <ProductCard
            userId={userId}
            url={searchQuery}
            name={productInfo.text.name || ''}
            price={parseFloat(
              productInfo.text.price?.replace(/[^0-9.]/g, '') || '0'
            )}
            currency={productInfo.text.currency || ''}
            rating={parseFloat(Number(productInfo.text.rating).toFixed(2))}
            image={productInfo.text.img || ''}
            discount={
              Number(productInfo.text.discount?.replace(/[^0-9.]/g, '')) || 0
            }
            description={productInfo.text.description || ''}
            reviews={productInfo.text.reviews || ''}
            stock={productInfo.text.stock || ''}
            usage={productInfo.usage}
          />
        )}
        {productInfo && 'error' in productInfo && (
          <Alert variant="destructive">
            <AlertTitle>Error fetching product information</AlertTitle>
            <AlertDescription>
              {productInfo.error &&
                'The URL is not a product page or the URL is not valid'}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
