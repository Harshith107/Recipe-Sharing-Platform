import { Skeleton } from "@/components/ui/skeleton";

export default function CursedSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-full h-40 bg-white/10 rounded-lg animate-pulse mb-4"
        />
      ))}
    </>
  );
}


  
