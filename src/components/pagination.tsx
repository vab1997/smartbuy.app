'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn, generatePagination } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationControlsProps {
  totalPages: number;
}

export const PaginationControls = ({ totalPages }: PaginationControlsProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent className="text-sm">
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            className={
              currentPage <= 1
                ? 'pointer-events-none opacity-50'
                : 'hover:bg-accent py-0.5 px-1'
            }
            aria-disabled={currentPage <= 1}
          />
        </PaginationItem>

        {allPages.map((page, index) => (
          <PaginationItem key={page}>
            {page === '...' ? (
              <PaginationEllipsis />
            ) : (
              <Link
                href={createPageURL(page)}
                className={cn(
                  currentPage === page &&
                    'bg-primary text-primary-foreground p-2 bg-accent',
                  'px-2 py-1 rounded-md'
                )}
              >
                <span>{page}</span>
              </Link>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            className={
              currentPage >= totalPages
                ? 'pointer-events-none opacity-50'
                : 'hover:bg-accent py-0.5 px-1'
            }
            aria-disabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
