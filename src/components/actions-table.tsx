'use client';

import { removeProductWished } from '@/app/actions/product-wished';
import { useSafeAction } from '@/hooks/use-safe-action';
import { ProductWished } from '@/types/types';
import { EyeIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ConfirmationModal } from './confirmation-modal';

export function ActionsTable({
  product,
  page,
}: {
  product: ProductWished;
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
