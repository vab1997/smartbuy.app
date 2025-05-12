import { productWishedService } from '@/services/product-wished';
import { EyeIcon, Search, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { cache, unstable_ViewTransition as ViewTransition } from 'react';
import { ActionsTable } from './actions-table';
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
    <>
      {productsWished.length > 0 ? (
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
              <TableHead className="text-center">Acciones</TableHead>
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
                    <div className="flex flex-col gap-1">
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline max-w-[450px] truncate"
                      >
                        {product.title}
                      </a>
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline max-w-[450px] truncate"
                      >
                        {product.description}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {product.productWishedHistory[0].currency}
                    {product.productWishedHistory[0].price}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <span className="text-sm">★</span>{' '}
                      {parseFloat(
                        Number(product.productWishedHistory[0].rating).toFixed(
                          2
                        )
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
                      className="flex items-center justify-center gap-1 "
                    >
                      {product.productWishedHistory[0].stock || 'Out of Stock'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <span>
                        <EyeIcon className="w-4 h-4" />
                      </span>
                      {product.productWishedHistory[0].reviewsCount || 0}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {Number(product.productWishedHistory[0].discount || 0) >
                    0 ? (
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
                    <ActionsTable product={product} page={page} />
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
      ) : (
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="mb-2 text-2xl font-bold tracking-tight">
            No hay productos en tu lista
          </h2>
          <p className="mb-6 max-w-md text-muted-foreground">
            Tu lista de productos está vacía. Busca los productos que te
            interesan y añádelos a tu lista para seguir su precio.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="gap-2 flex items-center bg-white text-black px-4 py-2 rounded-md"
            >
              <Search className="h-4 w-4" />
              Explorar productos
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
