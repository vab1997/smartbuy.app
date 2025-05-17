import { formatNumber } from '@/lib/utils';
import { ProductWished } from '@/types/types';
import { formatDistance } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export function TableProductHistory({
  historyProducts,
}: {
  historyProducts: ProductWished['productWishedHistory'];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border">
          <TableHead>Fecha</TableHead>
          <TableHead className="text-center">Precio</TableHead>
          <TableHead className="text-center">Descuento</TableHead>
          <TableHead className="text-center">Precio/Descuento</TableHead>
          <TableHead className="text-center">Rating</TableHead>
          <TableHead className="text-center">Stock</TableHead>
          <TableHead className="text-center">Reseñas</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {historyProducts.map((product) => (
          <TableRow key={product.id} className="border-border">
            <TableCell>
              {formatDistance(product.created_at, new Date(), {
                addSuffix: true,
              })}
            </TableCell>
            <TableCell className="text-center">
              {product.currency} {product.price}
            </TableCell>
            <TableCell className="text-center">
              {product.discount ? `${product.discount}%` : 'N/A'}
            </TableCell>
            <TableCell className="text-center">
              {product.priceWithoutDiscount
                ? `${product.currency} ${product.priceWithoutDiscount}`
                : 'N/A'}
            </TableCell>
            <TableCell className="text-center">
              {product.rating ? `${product.rating}/5` : 'N/A'}
            </TableCell>
            <TableCell className="text-center">
              {product.stock ? `${product.stock}` : 'N/A'}
            </TableCell>
            <TableCell className="text-center">
              {product.reviewsCount
                ? `${formatNumber(product.reviewsCount)}`
                : 'N/A'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
