import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

const ProductSkeleton = memo(() => (
  <div className="p-4 space-y-3">
    <Skeleton className="w-full h-48 rounded-lg" />
    <Skeleton className="w-3/4 h-6" />
    <Skeleton className="w-1/2 h-4" />
  </div>
));

const ProfileSkeleton = memo(() => (
  <div className="p-4 space-y-3">
    <Skeleton className="w-full h-48 rounded-lg" />
    <Skeleton className="w-3/4 h-6" />
    <Skeleton className="w-1/2 h-4" />
  </div>
));

export { ProductSkeleton, ProfileSkeleton };
