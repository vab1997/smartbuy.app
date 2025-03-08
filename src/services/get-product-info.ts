import config from '@/lib/config';

export async function fetchProductInfoFromPage({ url }: { url: string }) {
  const origin = config.APP_URL ?? 'http://localhost:3000';
  console.log('getProductInfo', { url, origin });

  const controller = new AbortController(); 
  const { signal } = controller;
  
  const response = await fetch(`${origin}/api/get-product-info?page_url=${url}`, {
    signal,
  });

  console.log('response', response);

  if (!response.ok) {
    throw new Error('Failed to fetch product info');
  }

  return await response.json();
}