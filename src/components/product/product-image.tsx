import { cn } from '@/lib/utils';

interface ProductImageProps {
  image: string;
  name: string;
  className?: string;
}

export const ProductImage = ({ image, name, className }: ProductImageProps) => {
  return (
    <div className={cn('h-auto', className)}>
      <img
        className={cn(
          'w-full h-full object-cover rounded-md transition-transform duration-300 hover:scale-105',
          className
        )}
        src={image || '/placeholder.png'}
        alt={name}
      />
    </div>
  );
};
