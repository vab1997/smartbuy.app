import { Search } from 'lucide-react';

import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export function EmptyTableProduct() {
  return (
    <div className="mb-8 flex flex-col items-center text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">
        No hay productos en tu lista
      </h2>
      <p className="mb-6 max-w-md text-muted-foreground">
        Tu lista de productos está vacía. Busca los productos que te interesan y
        añádelos a tu lista para seguir su precio.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          className="gap-2 flex items-center bg-white text-black px-4 py-2 rounded-md"
        >
          <Search className="h-4 w-4" />
          Explorar productos
        </Link>
      </div>
    </div>
  );
}
