import { productWishedService } from '@/services/product-wished';
import { CustomScrollbarStyles } from '@/styles/scrollbar';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { ExternalLink } from 'lucide-react';
import { unstable_ViewTransition as ViewTransition } from 'react';
import { ProductImage } from './product/product-image';
import { TableProductHistory } from './table-product-history';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

export async function DetailHistory({ id }: { id: string }) {
  const product = await productWishedService.getById(id);

  if (!product) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Producto no encontrado</AlertTitle>
        <AlertDescription>Producto no encontrado.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      <ViewTransition name={`product-${id}`}>
        <Card className="w-full mx-auto overflow-hidden bg-background text-foreground border border-border">
          <CustomScrollbarStyles />
          <div className="flex flex-col md:flex-row items-stretch">
            <ProductImage
              image={product.imageUrl || ''}
              name={product.title}
              size="2xl"
              className="rounded-tr-none rounded-br-none"
            />
            <div className="p-4 flex flex-col justify-between w-full ">
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
              <CardContent className="p-0  w-full">
                <span className="italic text-xs text-gray-500">
                  Agregado{' '}
                  {formatDistance(product.created_at, new Date(), {
                    addSuffix: true,
                    locale: es,
                  })}
                </span>
              </CardContent>
            </div>
          </div>
        </Card>
      </ViewTransition>

      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold mb-4">Historial de Precios</h2>
        <div className="w-full border rounded-md border-border">
          <TableProductHistory historyProducts={product.productWishedHistory} />
        </div>
      </div>
    </div>
  );
}
