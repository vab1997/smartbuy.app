import { DropDownDashboard } from '@/components/drop-down-dashboard';
import { PaginationControls } from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getCurrentSession } from '@/services/get-current-session';
import { productWishedService } from '@/services/product-wished';
import { EyeIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { userDb } = await getCurrentSession();
  const { page } = await searchParams;

  if (!userDb) {
    redirect('/sign-in');
  }

  const currentPage = Number(page) || 1;

  const [productsWished, totalPages] = await Promise.all([
    productWishedService.getByUserId(userDb.id, currentPage),
    productWishedService.getTotalPages(userDb.id),
  ]);

  if (productsWished.length === 0 && currentPage > 1) {
    redirect(`/dashboard?page=${currentPage - 1}`);
  }

  return (
    <div className="container mx-auto py-14">
      <div className="rounded-md border border-border">
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
              <TableRow key={product.id} className="border-border">
                <TableCell>
                  <div className="relative size-16">
                    <img
                      src={product.imageUrl || '/placeholder.png'}
                      alt={product.title}
                      className="object-cover rounded-md size-16"
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
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
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
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center mt-4">
        <PaginationControls totalPages={totalPages} />
      </div>
    </div>
  );
}
