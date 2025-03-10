'use client';

import { EllipsisVertical, EyeIcon } from 'lucide-react';

import { removeProductWished } from '@/app/actions/product-wished';
import { useSafeAction } from '@/hooks/use-safe-action';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ConfirmationModal } from './confirmation-modal';
import { Button } from './ui/button';
import { DropdownMenuItem } from './ui/dropdown-menu';

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

export function DropDownDashboard({ product }: { product: Product }) {
  const { executeAsync } = useSafeAction(removeProductWished);

  const handleRemoveProductWished = async () => {
    toast.promise(executeAsync({ id: product.id }), {
      loading: 'Removing product...',
      success: 'Product removed successfully',
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-background border border-gray-700/50 rounded-md"
      >
        <DropdownMenuItem asChild>
          <Link
            href={`/dashboard/product/${product.id}`}
            className="flex items-center gap-2"
          >
            <EyeIcon className="size-4" />
            Ver historial
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive" asChild>
          <ConfirmationModal
            trigger={
              <button className="relative flex cursor-default items-center text-destructive gap-2 rounded-sm px-2 py-1.5 transition-colors w-full hover:bg-accent">
                <TrashIcon className="size-4" />
                Eliminar
              </button>
            }
            title="Eliminar producto"
            description="¿Estás seguro de querer eliminar este producto?"
            onAccept={handleRemoveProductWished}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
