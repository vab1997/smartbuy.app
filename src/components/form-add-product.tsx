'use client';

import { addProductWished } from '@/app/actions/product-wished';
import { useProductPersistence } from '@/hooks/use-product-persistence';
import { useSafeAction } from '@/hooks/use-safe-action';
import { CirclePlus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { useRateLimit } from '@/hooks/use-rate-limit';
import { redirect } from 'next/navigation';
import { ConfirmationModal } from './confirmation-modal';
import { Button } from './ui/button';

type ProductWishedProps = {
  userId?: string;
  url: string;
  name: string;
  price: number;
  currency: string;
  rating: number;
  image: string;
  discount: number;
  description: string;
  reviews: number;
  stock: string;
  priceWithoutDiscount: number;
  usage: TokenUsageStats;
};

export interface TokenUsageStats {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  timeTaken: number;
}

export function AddProduct({
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
  priceWithoutDiscount,
  usage,
}: ProductWishedProps) {
  const { executeAsync, isPending } = useSafeAction(addProductWished);
  const { reset } = useRateLimit();
  const { saveProductData, clearProductData } = useProductPersistence();

  if (!userId) {
    const handleRedirect = () => {
      saveProductData({
        productDetails: {
          url,
          name,
          price: price.toString(),
          currency,
          rating,
          img: image,
          discount,
          description,
          reviews,
          stock,
          priceWithoutDiscount: priceWithoutDiscount.toString(),
        },
        usage,
      });
      redirect('/sign-in');
    };

    return (
      <ConfirmationModal
        trigger={
          <Button className="bg-black border border-gray-700/80 hover:bg-gray-700/40 text-white px-3">
            <CirclePlus className="w-4 h-4" />
            Agregar a la lista
          </Button>
        }
        title="Iniciar sesión"
        description="Por favor, inicia sesión para agregar este producto a tu lista"
        onAccept={handleRedirect}
        acceptButtonText="Iniciar sesión"
        rejectButtonText="Cancel"
      />
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      executeAsync({
        userId: userId,
        url,
        title: name,
        price: price.toString(),
        currency,
        rating: rating.toString(),
        imageUrl: image,
        discount,
        description,
        reviewsCount: reviews,
        stock,
        priceWithoutDiscount: priceWithoutDiscount.toString(),
        totalTokens: usage.totalTokens,
        promptTokens: usage.promptTokens,
        completionTokens: usage.completionTokens,
        timeTaken: usage.timeTaken.toString(),
      }),
      {
        loading: 'Agregando producto a la lista...',
      }
    );

    clearProductData();
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button className="bg-black border border-gray-700/80 hover:bg-gray-700/40 text-white px-3">
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Agregando...
          </>
        ) : (
          <>
            <CirclePlus className="w-4 h-4" />
            Agregar a la lista
          </>
        )}
      </Button>
    </form>
  );
}
