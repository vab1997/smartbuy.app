'use client';

import { useProductPersistence } from '@/hooks/use-product-persistence';
import { ResultProductCard } from './result-product-card';

export function PendingProductBanner({
  userId,
  url,
}: {
  userId: string;
  url: string;
}) {
  const { productData } = useProductPersistence();

  if (!productData) return null;

  return (
    <ResultProductCard userId={userId} productDetails={productData} url={url} />
  );
}
