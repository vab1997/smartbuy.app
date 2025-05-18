import { TokenUsageStats } from '@/components/form-add-product';
import { ProductInfoType } from '@/schema/extract-info';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'pendingProductData';

type ProductData = {
  productDetails: ProductInfoType & {url: string};
  usage: TokenUsageStats;
}

export const useProductPersistence = () => {
  const [productData, setProductData] = useState<ProductData | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setProductData(JSON.parse(stored));
    }
  }, []);

  const saveProductData = (data: ProductData) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setProductData(data);
  };

  const clearProductData = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
    setProductData(null);
  };

  return {
    productData,
    saveProductData,
    clearProductData,
  };
}; 