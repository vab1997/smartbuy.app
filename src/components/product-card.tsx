import { tryCatch } from '@/lib/try-catch';
import { extractProduct } from '@/services/extract-product-info';
import { ResultProductCard } from './result-product-card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export async function ProductCard({
  url,
  userId,
}: {
  url: string;
  userId?: string;
}) {
  const { data: productResult, error } = await tryCatch(extractProduct(url));

  console.log({ productResult, error });

  if (
    error ||
    !productResult ||
    productResult.productDetails.name === 'Internal Server Error' ||
    productResult.productDetails.price === null
  ) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error al obtener información del producto</AlertTitle>
        <AlertDescription>
          Se ha producido un error al obtener la información del producto
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
