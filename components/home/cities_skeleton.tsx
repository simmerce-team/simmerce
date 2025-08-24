// components/home/cities_skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export const CitiesSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <section className="py-8 rounded-lg bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: count }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </section>
  );
};