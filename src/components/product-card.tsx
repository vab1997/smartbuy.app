import { tryCatch } from '@/lib/try-catch';
import { isGenericPage } from '@/lib/utils';
import { extractProduct } from '@/services/extract-product';
import { ResultProductCard } from './result-product-card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export async function ProductCard({
  url,
  userId,
}: {
  url: string;
  userId?: string;
}) {
  const { data: productResult, error: errorResponse } = await tryCatch(
    extractProduct(url)
  );

  const isProductResultValid =
    productResult && !isGenericPage(productResult.productDetails);

  if (errorResponse) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error al obtener información del producto</AlertTitle>
        <AlertDescription>
          Se ha producido un error al obtener la información del producto
        </AlertDescription>
      </Alert>
    );
  }

  if (!isProductResultValid) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Página no válida</AlertTitle>
        <AlertDescription>
          La página proporcionada no parece ser una página de producto. Por
          favor, asegúrate de proporcionar una URL de un producto válido.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ResultProductCard
      userId={userId}
      productDetails={productResult}
      url={url}
    />
  );
}
