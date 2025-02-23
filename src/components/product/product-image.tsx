import { cn } from '@/lib/utils';

interface ProductImageProps {
  image: string;
  name: string;
  className?: string;
}

export const ProductImage = ({ image, name, className }: ProductImageProps) => {
  return (
    <div className="md:flex-shrink-0 md:w-1/3">
      <img
        className={cn('w-full h-full object-cover aspect-square', className)}
        src={image || '/placeholder.svg'}
        alt={name}
      />
    </div>
  );
};
