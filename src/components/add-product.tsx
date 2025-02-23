import { addProductWished } from '@/app/actions/product-wished';
import { useSafeAction } from '@/hooks/use-safe-action';
import { CirclePlus, Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { ConfirmationModal } from './confirmation-modal';
import { UsageInfo } from './search-page';
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
  usage: UsageInfo;
};

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

  if (!userId) {
    return (
      <ConfirmationModal
        trigger={
          <Button className="bg-black border border-gray-700/80 hover:bg-gray-700/40 text-white px-3">
            <CirclePlus className="w-4 h-4" />
            Add to List
          </Button>
        }
        title="Sign in"
        description="Please sign in to add this product to your list"
        onAccept={() => redirect('/sign-in')}
        acceptButtonText="Sign in"
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
        loading: 'Adding product to list...',
        success: 'Product added to list',
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button className="bg-black border border-gray-700/80 hover:bg-gray-700/40 text-white px-3">
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <CirclePlus className="w-4 h-4" />
            Add to List
          </>
        )}
      </Button>
    </form>
  );
}
