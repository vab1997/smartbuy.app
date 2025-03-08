import { ProductImage } from '@/components/product/product-image';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { productWishedService } from '@/services/product-wished';
import { CustomScrollbarStyles } from '@/styles/scrollbar';
import { formatDistance } from 'date-fns';
import { ExternalLink } from 'lucide-react';

export default async function ProductHistoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await productWishedService.getById(id);

  if (!product) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Producto no encontrado</AlertTitle>
        <AlertDescription>
          El producto con el ID {id} no fue encontrado.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <section className="container mx-auto py-16 px-4">
      <CustomScrollbarStyles />

      <h1 className="text-2xl font-bold mb-4">Historial de Productos</h1>

      <div className="flex flex-col gap-12">
        <Card className="w-full mx-auto overflow-hidden bg-background text-foreground border border-border">
          <CustomScrollbarStyles />
          <div className="md:flex">
            <ProductImage
              image={product.imageUrl || ''}
              name={product.title}
              className="w-full h-[350px] object-cover object-center"
            />
            <div className="p-6 flex flex-col justify-between w-full md:w-2/3">
              <CardHeader className="p-0">
                <div className="flex justify-between flex-col items-start">
                  <CardTitle className="text-2xl font-bold text-white flex flex-col gap-3 break-words">
                    <div className="flex items-center gap-2 relative">
                      <h2 className="text-2xl font-bold text-white">
                        {product.title}
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block ml-2 text-gray-400 hover:text-gray-300"
                        >
                          <ExternalLink className="w-4 h-4 inline" />
                        </a>
                      </h2>
                    </div>
                  </CardTitle>
                  <CardDescription className="text-xl flex gap-1 mt-2 flex-col w-full">
                    <div className="text-gray-400 text-sm w-full whitespace-pre-line block h-44 overflow-y-auto scroll-smooth custom-scrollbar">
                      {product.description}
                    </div>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-0 mt-4 w-full">
                <h2 className="italic md:text-base text-sm">
                  Este producto fue agregado a la lista de deseos el{' '}
                  {formatDistance(product.created_at, new Date(), {
                    addSuffix: true,
                  })}
                </h2>
              </CardContent>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold mb-4">Historial de Precios</h2>
          <div className="w-full border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-center">Precio</TableHead>
                  <TableHead className="text-center">Descuento</TableHead>
                  <TableHead className="text-center">
                    Precio/Descuento
                  </TableHead>
                  <TableHead className="text-center">Rating</TableHead>
                  <TableHead className="text-center">Stock</TableHead>
                  <TableHead className="text-center">Reseñas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {product.productWishedHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {formatDistance(item.created_at, new Date(), {
                        addSuffix: true,
                      })}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.currency} {item.price}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.discount ? `${item.discount}%` : 'N/A'}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.priceWithoutDiscount
                        ? `${item.currency} ${item.priceWithoutDiscount}`
                        : 'N/A'}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.rating ? `${item.rating}/5` : 'N/A'}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.stock ? `${item.stock}` : 'N/A'}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.reviewsCount ? `${item.reviewsCount}` : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}
