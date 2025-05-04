import { Skeleton } from '@/components/ui/skeleton';

export function ProductTableSkeleton() {
  return (
    <div className="w-full overflow-auto">
      <table className="w-full border-collapse bg-black text-white">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="p-3 text-left">Imagen</th>
            <th className="p-3 text-left">Producto</th>
            <th className="p-3 text-right">Precio</th>
            <th className="p-3 text-center">Rating</th>
            <th className="p-3 text-center">Stock</th>
            <th className="p-3 text-center">Reseñas</th>
            <th className="p-3 text-center">Descuento</th>
            <th className="p-3 text-center">Historial</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className="border-b border-gray-800">
              <td className="p-3">
                <Skeleton className="h-16 w-16 rounded bg-gray-700" />
              </td>
              <td className="p-3 max-w-md">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full max-w-[250px] bg-gray-700" />
                  <Skeleton className="h-4 w-full max-w-[200px] bg-gray-700" />
                  <Skeleton className="h-4 w-full max-w-[180px] bg-gray-700" />
                </div>
              </td>
              <td className="p-3 text-right">
                <Skeleton className="h-4 w-24 ml-auto bg-gray-700" />
              </td>
              <td className="p-3 text-center">
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-16 bg-gray-700" />
                </div>
              </td>
              <td className="p-3 text-center">
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-24 bg-gray-700" />
                </div>
              </td>
              <td className="p-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Skeleton className="h-4 w-4 rounded-full bg-gray-700" />
                  <Skeleton className="h-4 w-8 bg-gray-700" />
                </div>
              </td>
              <td className="p-3 text-center">
                {index % 2 === 0 ? (
                  <div className="flex justify-center">
                    <Skeleton className="h-6 w-16 rounded-full bg-gray-700" />
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <Skeleton className="h-4 w-12 bg-gray-700" />
                  </div>
                )}
              </td>
              <td className="p-3 text-center">
                <Skeleton className="h-4 w-12 mx-auto bg-gray-700" />
              </td>
              <td className="p-3">
                <div className="flex justify-center">
                  <Skeleton className="h-6 w-6 rounded-full bg-gray-700" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
