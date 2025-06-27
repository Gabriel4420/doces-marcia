import { Skeleton } from "@/components/ui/skeleton";

export const TabsSkeleton = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6 md:mb-8">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-10 md:h-12 rounded-lg" />
        ))}
      </div>
      
      <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <Skeleton className="w-full h-32 md:h-40" />
            <div className="p-3 md:p-4 space-y-2 md:space-y-3">
              <Skeleton className="h-4 md:h-5 w-3/4" />
              <Skeleton className="h-3 md:h-4 w-1/2" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 md:h-5 w-16" />
                <Skeleton className="h-8 md:h-10 w-20 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
