import { ProductInfoType } from "@/schema/extract-info"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ]
}

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('es-ES', {
    maximumFractionDigits: 0,
  }).format(value);
}; 

export const isGenericPage = (productDetails: ProductInfoType) => {
  // Check if the name is too generic or looks like a website name
  const genericNames = [
    'home',
    'welcome',
    'login',
    'sign in',
    'sign up',
    'register',
    'account',
  ];
  const isGenericName = genericNames.some((name) =>
    productDetails.name?.toLowerCase().includes(name)
  );

  // Check if description contains common non-product page phrases
  const nonProductPhrases = [
    'log in',
    'sign in',
    'sign up',
    'register',
    'create account',
    'welcome to',
    'home page',
    'dashboard',
    'account settings',
  ];
  const hasNonProductPhrases = nonProductPhrases.some((phrase) =>
    productDetails.description?.toLowerCase().includes(phrase)
  );

  // Check if the image URL contains common logo patterns
  const logoPatterns = ['logo', 'brand', 'icon', 'favicon'];
  const isLogoImage = logoPatterns.some((pattern) =>
    productDetails.img?.toLowerCase().includes(pattern)
  );

  // Check if essential product information is missing
  const hasEssentialInfo =
    productDetails.price !== null &&
    productDetails.currency !== null

  return (
    isGenericName || hasNonProductPhrases || isLogoImage || !hasEssentialInfo
  );
};

export function convertedPrice(price: number | string): number {
  if (typeof price === 'number') return price;

  // Remove currency symbols (including US$) and trim whitespace
  const cleanPrice = price.replace(/US\$|\$/g, '').trim();

  // Handle different formats:
  // 1. If the price has a decimal point (e.g., "107.62")
  if (cleanPrice.includes('.')) {
    // Remove thousand separators and keep decimal point
    const normalizedPrice = cleanPrice.replace(/\.(?=.*\.)/g, '');
    return parseFloat(normalizedPrice);
  }

  // 2. If the price has commas (e.g., "1,876,499")
  if (cleanPrice.includes(',')) {
    // Remove commas and convert to number
    return parseFloat(cleanPrice.replace(/,/g, ''));
  }

  // 3. If the price has dots as thousand separators (e.g., "1.876.499")
  if (cleanPrice.includes('.')) {
    // Remove dots and convert to number
    return parseFloat(cleanPrice.replace(/\./g, ''));
  }

  // 4. Simple number without separators
  return parseFloat(cleanPrice);
}