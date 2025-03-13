import { Skeleton } from "@/components/ui/skeleton";
import { Camera, LocateIcon, PhoneCallIcon } from "lucide-react";
import { memo } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const ProductSkeleton = () => (
  <div className="w-full p-2 rounded-md bg-zinc-800 space-y-2">
    <Skeleton className="w-full rounded-md h-60" />
    <Skeleton className="h-8 w-[70%]" />
    <Skeleton className="h-6 w-[40%]" />
    <Button variant="revanta" className="w-full mt-3">
      Rent Now
    </Button>
  </div>
);

const SkeletonList = memo(({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 w-full">
    {Array(count)
      .fill(0)
      .map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
  </div>
));

const ProfileSkeleton = memo(() => (
  <div className="mx-2 md:mx-20">
    <div className="relative p-6 rounded-md bg-zinc-700/60 backdrop-blur-sm">
      <div className="space-y-5">
        <div className="relative mx-auto w-fit">
          <Avatar className="border-2 rounded-full size-40 border-zinc-400">
            <AvatarFallback className="flex items-center justify-center text-6xl bg-zinc-500/50 size-full">
              <Skeleton className="rounded-full size-full" />
            </AvatarFallback>
          </Avatar>
          <label
            htmlFor="picture"
            className="absolute p-2 bg-gray-700 rounded-full cursor-pointer bottom-2 right-2"
          >
            <Camera />
          </label>
          <Input id="picture" type="file" className="hidden" />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 space-y-2">
            <div className="text-3xl font-bold font-montserrat">
              <Skeleton className="h-6 w-18" />
            </div>
            <div className="flex gap-1">
              <LocateIcon />
              <Skeleton className="w-full h-4" />
            </div>
            <div className="flex gap-1">
              <PhoneCallIcon />
              <Skeleton className="w-full h-6" />
            </div>
          </div>
          <div className="col-span-1">1</div>
        </div>
      </div>
    </div>
  </div>
));

export { ProductSkeleton, SkeletonList, ProfileSkeleton };
