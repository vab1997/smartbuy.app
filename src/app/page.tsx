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
import { Bell, Search, ShoppingCart, Smile } from 'lucide-react';
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
          Encuentra <span className="text-primary">🔍</span>, Sigue{' '}
          <span className="text-primary">👀</span> y Ahorra{' '}
          <span className="text-primary">💰</span>
        </h2>
        <p className="text-xl text-gray-300 mb-6 mx-auto max-w-4xl">
          Busca productos en cualquier tienda online, haz seguimiento de sus
          precios y recibe notificaciones instantáneas cuando estén en{' '}
          <strong className="text-yellow-500">oferta</strong> para comprar al{' '}
          <strong className="text-green-500">mejor precio</strong>.
        </p>

        <SearchPage url={url} />

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Badge variant="outline" className="text-sm border-border">
            Amazon
          </Badge>
          <Badge variant="outline" className="text-sm border-border">
            MercadoLibre
          </Badge>
          <Badge variant="outline" className="text-sm border-border">
            eBay
          </Badge>
          <Badge variant="outline" className="text-sm border-border">
            AliExpress
          </Badge>
          <Badge variant="outline" className="text-sm border-border">
            + Cientos de tiendas más
          </Badge>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <Card className="bg-background border-border">
          <CardHeader>
            <div className="bg-gray-900 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Search className="h-6 w-6" />
            </div>
            <CardTitle>Busca Productos</CardTitle>
            <CardDescription className="text-gray-400">
              Simplemente pega la URL de cualquier producto de cualquier tienda
              online
              <Smile className="inline-block ml-1 h-4 w-4 text-yellow-400" />
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-background border-border">
          <CardHeader>
            <div className="bg-gray-900 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Bell className="h-6 w-6" />
            </div>
            <CardTitle>Recibe Alertas</CardTitle>
            <CardDescription className="text-gray-400">
              Te notificamos al instante cuando el precio baja o hay una oferta
              especial
              <span className="ml-1 text-yellow-400">🔔</span>
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-background border-border">
          <CardHeader>
            <div className="bg-gray-900 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <CardTitle>Compra al Mejor Precio</CardTitle>
            <CardDescription className="text-gray-400">
              Aprovecha las mejores ofertas y ahorra en todas tus compras online
              <span className="ml-1 text-yellow-400">💸</span>
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
