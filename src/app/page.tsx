import { FeatureCards } from '@/components/feature-cards';
import { PendingProductBanner } from '@/components/pending-product-banner';
import { ProductCard } from '@/components/product-card';
import { ProductCardSkeleton } from '@/components/product/product-skeleton';
import { SearchPage } from '@/components/search-page';
import { StoreBadges } from '@/components/store-badges';
import { loadSearchParams } from '@/lib/searchparams';
import { getCurrentSession } from '@/services/get-current-session';
import { Suspense, unstable_ViewTransition as ViewTransition } from 'react';

type Props = {
  searchParams: Promise<{ url: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { userDb } = await getCurrentSession();
  const { url } = await loadSearchParams(searchParams);

  return (
    <ViewTransition
      enter="page-enter duration-150"
      exit="page-exit duration-150"
    >
      <main className="container mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 py-6 pt-24">
        <section className="w-full mx-auto text-center flex flex-col gap-4">
          <h2 className="text-5xl md:text-7xl font-bold mb-4">
            Encuentra <span className="text-primary">🔍</span>, Sigue{' '}
            <span className="text-primary">👀</span> y Ahorra{' '}
            <span className="text-primary">💰</span>
          </h2>
          <p className="text-xl text-gray-300 mb-6 mx-auto max-w-4xl text-pretty">
            Busca productos en cualquier tienda online, haz seguimiento de sus
            precios y stock, y recibe notificaciones instantáneas cuando estén
            en <strong className="text-yellow-500">oferta</strong> o cuando haya{' '}
            <strong className="text-blue-500">stock</strong> para comprar apenas
            este <strong className="text-pink-500">disponible</strong> y al{' '}
            <strong className="text-green-500">mejor precio</strong>.
          </p>

          <SearchPage url={url} />
          <StoreBadges />
        </section>

        {url && (
          <Suspense fallback={<ProductCardSkeleton />} key={url}>
            <ProductCard url={url} userId={userDb?.id} />
          </Suspense>
        )}
        {userDb?.id && <PendingProductBanner userId={userDb?.id} url={url} />}

        <FeatureCards />
      </main>
    </ViewTransition>
  );
}
