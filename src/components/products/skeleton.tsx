import { Skeleton } from "../ui/skeleton";

export const TabsSkeleton = () => {
  return (
<div>
  <Skeleton className="w-full h-2 rounded-xl" />

  <div className="mt-6 grid gap-5 cel:grid-cols-1 cel2:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="space-y-3">
        <Skeleton className="w-full h-32 rounded-xl" />
        <Skeleton className="mt-2 w-full h-7 rounded-xl" />
        <Skeleton className="mt-2 w-16 h-5 rounded-xl" />
        <Skeleton className="mt-2 w-full h-9 rounded-xl" />
      </div>
    ))}
  </div>
</div>
  );
};
