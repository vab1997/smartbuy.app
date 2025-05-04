import { TableProductsList } from '@/components/table-products-list';
import { getCurrentSession } from '@/services/get-current-session';
import { redirect } from 'next/navigation';
import { unstable_ViewTransition as ViewTransition } from 'react';

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

  const currentPage = Number(page) ?? 1;

  return (
    <ViewTransition
      enter="page-enter duration-150"
      exit="page-exit duration-150"
    >
      <div className="container mx-auto py-14">
        <div className="rounded-md border border-border">
          {/* <Suspense fallback={<ProductTableSkeleton />}> */}
          <TableProductsList userId={userDb.id} page={currentPage} />
          {/* </Suspense> */}
        </div>
      </div>
    </ViewTransition>
  );
}
