import { productWishedService } from '@/services/product-wished';
import { EyeIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { cache, unstable_ViewTransition as ViewTransition } from 'react';
import { DropDownDashboard } from './drop-down-dashboard';
import { PaginationControls } from './pagination';
import { ProductImage } from './product/product-image';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

const productsByUserId = cache(productWishedService.getByUserId);
const totalPagesByUserId = cache(productWishedService.getTotalPages);

export async function TableProductsList({
  userId,
  page,
}: {
  userId: string;
  page: number;
}) {
  const [productsWished, totalPages] = await Promise.all([
    productsByUserId(userId, page),
    totalPagesByUserId(userId),
  ]);

  if (productsWished.length === 0 && page > 1) {
    redirect(`/dashboard?page=${page - 1}`);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border">
          <TableHead className="w-[100px] text-center">Imagen</TableHead>
          <TableHead>Producto</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead className="text-center">Rating</TableHead>
          <TableHead className="text-center">Stock</TableHead>
          <TableHead className="text-center">Reseñas</TableHead>
          <TableHead className="text-center">Descuento</TableHead>
          <TableHead className="text-center">Historial</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productsWished.map((product) => (
          <ViewTransition key={product.id} name={`product-${product.id}`}>
            <TableRow key={product.id} className="border-border">
              <TableCell>
                <div className="relative">
                  <ProductImage
                    image={product.imageUrl || '/placeholder.png'}
                    name={product.title}
                    size="sm"
                  />
                </div>
              </TableCell>
              <TableCell>
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline"
                >
                  {product.title}
                </a>
                {product.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                )}
              </TableCell>
              <TableCell className="text-center">
                {product.productWishedHistory[0].currency}
                {product.productWishedHistory[0].price}
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <span className="text-sm">★</span>{' '}
                  {parseFloat(
                    Number(product.productWishedHistory[0].rating).toFixed(2)
                  )}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  variant={
                    product.productWishedHistory[0].stock
                      ? 'default'
                      : 'destructive'
                  }
                  className="flex items-center gap-1 w-fit text-center"
                >
                  {product.productWishedHistory[0].stock || 'Out of Stock'}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <span>
                    <EyeIcon className="w-4 h-4" />
                  </span>
                  {product.productWishedHistory[0].reviewsCount || 0}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                {Number(product.productWishedHistory[0].discount || 0) > 0 ? (
                  <Badge
                    variant="outline"
                    className="bg-green-500/50 border-border"
                  >
                    -{product.productWishedHistory[0].discount}%
                  </Badge>
                ) : (
                  'N/A'
                )}
              </TableCell>
              <TableCell className="align-middle text-center h-auto">
                <DropDownDashboard product={product} />
              </TableCell>
            </TableRow>
          </ViewTransition>
        ))}
      </TableBody>
      <TableFooter className="border-t border-border">
        <TableRow>
          <TableCell colSpan={8} className="p-2">
            <PaginationControls totalPages={totalPages} />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
