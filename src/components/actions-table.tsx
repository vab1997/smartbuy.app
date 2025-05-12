'use client';

import { removeProductWished } from '@/app/actions/product-wished';
import { useSafeAction } from '@/hooks/use-safe-action';
import { EyeIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ConfirmationModal } from './confirmation-modal';

type Product = {
  id: string;
  title: string;
  imageUrl: string | null;
  updated_at: Date | null;
  created_at: Date;
  userId: string;
  description: string | null;
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

export function ActionsTable({
  product,
  page,
}: {
  product: Product;
  page: number;
}) {
  const { executeAsync } = useSafeAction(removeProductWished);

  const handleRemoveProductWished = async () => {
    toast.promise(executeAsync({ id: product.id }), {
      loading: 'Removing product...',
      success: 'Product removed successfully',
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/dashboard/product/${product.id}?page=${page}`}
        className="flex items-center gap-2 hover:bg-accent rounded-sm px-2 py-1.5 transition-colors"
      >
        <EyeIcon className="size-5" />
      </Link>
      <ConfirmationModal
        trigger={
          <button className="cursor-pointer relative flex items-center text-destructive gap-2 rounded-sm px-2 py-1.5 transition-colors w-full hover:bg-accent">
            <TrashIcon className="size-5" />
          </button>
        }
        title="Eliminar producto"
        description="¿Estás seguro de querer eliminar este producto?"
        onAccept={handleRemoveProductWished}
      />
    </div>
  );
}
