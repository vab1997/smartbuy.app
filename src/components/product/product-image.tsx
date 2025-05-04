import { cn } from '@/lib/utils';

interface ProductImageProps {
  image: string;
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

export const ProductImage = ({
  image,
  name,
  className,
  size = 'md',
}: ProductImageProps) => {
  const sizeClasses = {
    sm: 'size-16',
    md: 'size-32',
    lg: 'size-48',
    xl: 'size-64',
    '2xl': 'size-80',
    '3xl': 'size-96',
    '4xl': 'size-[390px]',
  };

  return (
    <div className={cn('relative', sizeClasses[size])}>
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
