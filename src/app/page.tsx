import { ProductCard } from '@/components/product-card';
import { ProductCardSkeleton } from '@/components/product/product-skeleton';
import { SearchPage } from '@/components/search-page';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { loadSearchParams } from '@/lib/searchparams';
import { getCurrentSession } from '@/services/get-current-session';
import { Bell, Search, ShoppingCart } from 'lucide-react';
import { Suspense } from 'react';
type Props = {
  searchParams: Promise<{ url: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { userDb } = await getCurrentSession();
  const { url } = await loadSearchParams(searchParams);

  return (
    <main className="container mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 py-6 pt-24">
      <section className="w-full mx-auto text-center flex flex-col gap-4">
        <h2 className="text-5xl md:text-7xl font-bold mb-4">
          Encuentra, Sigue y Ahorra
        </h2>
        <p className="text-xl text-gray-300 mb-6 mx-auto max-w-4xl">
          Busca productos en cualquier tienda online, haz seguimiento de sus
          precios y recibe notificaciones instantáneas cuando estén en oferta
          para comprar al mejor precio.
        </p>

        <SearchPage url={url} />

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Badge variant="outline" className="text-sm">
            Amazon
          </Badge>
          <Badge variant="outline" className="text-sm">
            MercadoLibre
          </Badge>
          <Badge variant="outline" className="text-sm">
            eBay
          </Badge>
          <Badge variant="outline" className="text-sm">
            AliExpress
          </Badge>
          <Badge variant="outline" className="text-sm">
            + Cientos de tiendas más
          </Badge>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <Card className="bg-background border-border">
          <CardHeader>
            <Search className="size-8 text-primary mb-2" />
            <CardTitle>Busca Productos</CardTitle>
            <CardDescription className="text-gray-400">
              Simplemente pega la URL de cualquier producto de cualquier tienda
              online
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-background border-border">
          <CardHeader>
            <Bell className="size-8 text-primary mb-2" />
            <CardTitle>Recibe Alertas</CardTitle>
            <CardDescription className="text-gray-400">
              Te notificamos al instante cuando el precio baja o hay una oferta
              especial
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-background border-border">
          <CardHeader>
            <ShoppingCart className="size-8 text-primary mb-2" />
            <CardTitle>Compra al Mejor Precio</CardTitle>
            <CardDescription className="text-gray-400">
              Aprovecha las mejores ofertas y ahorra en todas tus compras online
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Suspense fallback={<ProductCardSkeleton />} key={url}>
        <ProductCard url={url} userId={userDb?.id} />
      </Suspense>
    </main>
  );
}
