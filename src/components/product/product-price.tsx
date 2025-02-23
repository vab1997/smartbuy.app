import { AddProduct } from '@/components/add-product';
import { UsageInfo } from '../search-page';

interface ProductPriceProps {
  price: number;
  currency: string;
  discount?: number;
  stock?: string;
  readOnly?: boolean;
  userId?: string;
  url: string;
  name: string;
  rating: number;
  image: string;
  description: string;
  reviews: number;
  usage: UsageInfo;
}

export const ProductPrice = ({
  price,
  currency,
  discount = 0,
  stock,
  readOnly = false,
  usage,
  ...productProps
}: ProductPriceProps) => {
  const priceWithoutDiscount = discount && price / ((100 - discount) / 100);

  return (
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
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <span>
              {currency}
              {price?.toFixed(2) || 0}
            </span>
            <span className="text-green-500 text-base">
              {discount !== 0 && ` ${discount}% off`}
            </span>
          </div>
          <span className="text-green-500 text-xs">
            {stock && `${stock} en stock`}
          </span>
        </div>
      </div>
      {!readOnly && (
        <AddProduct
          userId={productProps.userId}
          url={productProps.url}
          name={productProps.name}
          price={price}
          currency={currency}
          rating={productProps.rating}
          image={productProps.image}
          discount={discount}
          description={productProps.description}
          reviews={productProps.reviews}
          stock={stock || ''}
          priceWithoutDiscount={priceWithoutDiscount}
          usage={usage}
        />
      )}
    </div>
  );
};
