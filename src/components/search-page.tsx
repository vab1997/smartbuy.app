'use client';

import { FormEvent, useEffect, useState } from 'react';
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

interface UsageInfo {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export function SearchPage() {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [testAi, setTestAi] = useState<
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
    if (!inputValue) {
      return;
    }

    setIsLoading(true);
    const controller = new AbortController();
    const { signal } = controller;

    fetch(`/api/test-ai?page_url=${inputValue}`, { signal })
      .then((res) => res.json())
      .then(setTestAi)
      .catch(console.error)
      .finally(() => setIsLoading(false));

    return () => {
      controller.abort();
    };
  }, [inputValue]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const value = formData.get('url') as string;

    setInputValue(value);
  };

  console.log({ inputValue, testAi });

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
            className="text-black bg-white border border-white rounded-md px-3 py-1 text-sm hover:opacity-85 transition-opacity"
          >
            Search
          </Button>
        </div>
      </form>

      <div className="mt-8">
        {isLoading && <ProductCardSkeleton />}
        {testAi && 'text' in testAi && (
          <ProductCard
            url={inputValue}
            name={testAi.text.name || ''}
            price={parseFloat(
              testAi.text.price?.replace(/[^0-9.]/g, '') || '0'
            )}
            currency={testAi.text.currency || ''}
            rating={parseFloat(Number(testAi.text.rating).toFixed(2))}
            image={testAi.text.img || ''}
            discount={
              Number(testAi.text.discount?.replace(/[^0-9.]/g, '')) || 0
            }
            description={testAi.text.description || ''}
            reviews={testAi.text.reviews || ''}
            stock={testAi.text.stock || ''}
          />
        )}
        {testAi && 'error' in testAi && (
          <Alert variant="destructive">
            <AlertTitle>Error fetching product information</AlertTitle>
            <AlertDescription>
              {testAi.error &&
                'The URL is not a product page or the URL is not valid'}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
