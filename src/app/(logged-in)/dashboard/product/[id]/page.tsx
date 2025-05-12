import { CardDetailPage } from '@/components/card-detail-page';
import { CustomScrollbarStyles } from '@/styles/scrollbar';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { unstable_ViewTransition as ViewTransition } from 'react';

export default async function ProductHistoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page: string }>;
}) {
  const { id } = await params;
  const { page } = await searchParams;

  return (
    <ViewTransition
      enter="page-enter duration-150"
      exit="page-exit duration-150"
    >
      <section className="container mx-auto py-16 px-4">
        <CustomScrollbarStyles />

        <Link
          href={`/dashboard?page=${page}`}
          className="text-xl font-bold flex items-center gap-2 mb-4 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Listado de productos
        </Link>

        <CardDetailPage id={id} />
      </section>
    </ViewTransition>
  );
}
