export type SendEmailProps = {
  name: string;
  price: string;
  discount?: number;
  stock: string;
  url: string;
  image: string;
  email: string;
  isPriceAlert: boolean;
  isStockAlert: boolean;
}

export type ProductWished = {
  id: string;
  title: string;
  imageUrl: string | null;
  updated_at: Date | null;
  created_at: Date;
  userId: string;
  description: string | null;
  url: string;
  productWishedHistory: {
    id: string;
    productWishedId: string;
    userId: string;
    currency: string | null;
    price: string | null;
    priceWithoutDiscount: string | null;
    discount: number | null;
    rating: string | null;
    reviewsCount: number | null;
    stock: string | null;
    created_at: Date;
    updated_at: Date | null;
  }[];
};