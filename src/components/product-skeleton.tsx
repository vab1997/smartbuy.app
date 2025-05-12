import { Skeleton } from '@/components/ui/skeleton';

export default function ProductSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Product Section */}
      <div className="flex flex-col md:flex-row gap-6 p-4 bg-background rounded-lg border mb-8 border-border">
        {/* Product Image */}
        <div className="w-full md:w-1/4 min-w-[250px]">
          <Skeleton className="aspect-square w-full rounded-md border border-border bg-gray-700/50" />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-3/4 space-y-4">
          {/* Title */}
          <Skeleton className="h-8 w-full bg-gray-700/50" />
          <Skeleton className="h-4 w-3/4 bg-gray-700/50" />

          {/* Description */}
          <div className="space-y-2 mt-6">
            <Skeleton className="h-4 w-full bg-gray-700/50" />
            <Skeleton className="h-4 w-full bg-gray-700/50" />
            <Skeleton className="h-4 w-5/6 bg-gray-700/50" />
          </div>

          {/* Features */}
          <div className="space-y-2 mt-6">
            <Skeleton className="h-4 w-48" />
            <div className="space-y-2 mt-2">
              <Skeleton className="h-4 w-full bg-gray-700/50" />
              <Skeleton className="h-4 w-full bg-gray-700/50" />
              <Skeleton className="h-4 w-4/5 bg-gray-700/50" />
            </div>
          </div>

          {/* Time Added */}
          <Skeleton className="h-4 w-40 mt-4 bg-gray-700/50" />
        </div>
      </div>

      {/* Price History Section */}
      <div className="p-4 bg-background rounded-lg border-none">
        {/* Section Title */}
        <Skeleton className="h-6 w-48 mb-6 bg-gray-700/50" />

        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 py-3 border-b border-border">
          <Skeleton className="h-4 w-20 bg-gray-700/50" />
          <Skeleton className="h-4 w-20 bg-gray-700/50" />
          <Skeleton className="h-4 w-24 bg-gray-700/50" />
          <Skeleton className="h-4 w-32 bg-gray-700/50" />
          <Skeleton className="h-4 w-16 bg-gray-700/50" />
          <Skeleton className="h-4 w-20 bg-gray-700/50" />
        </div>

        {/* Table Rows */}
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-6 gap-4 py-4 border-b border-border"
          >
            <Skeleton className="h-4 w-24 bg-gray-700/50" />
            <Skeleton className="h-4 w-20 bg-gray-700/50" />
            <Skeleton className="h-4 w-12 bg-gray-700/50" />
            <Skeleton className="h-4 w-12 bg-gray-700/50" />
            <Skeleton className="h-4 w-8 bg-gray-700/50" />
            <Skeleton className="h-4 w-16 bg-gray-700/50" />
          </div>
        ))}
      </div>
    </div>
  );
}
