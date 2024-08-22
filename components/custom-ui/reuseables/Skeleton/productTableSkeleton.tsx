import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton () {
  return (
    <div className="border rounded-lg grid grid-cols-3 gap-4">
      <div>
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      </div>
        <div className=" col-span-2 grid grid-cols-2 gap-4">
          <div>
            <div className="grid grid-cols-2">
              <Skeleton className="h-4 w-12" />
              </div>
              <div className="grid grid-cols-2">
              <Skeleton className="h-4 w-12" />
              </div>
              <div className="grid grid-cols-2">
              <Skeleton className="h-4 w-12" />
              </div>
          </div>

           <div>
            <div className="grid grid-cols-2">
              <Skeleton className="h-4 w-12" />
              </div>
              <div className="grid grid-cols-2">
              <Skeleton className="h-4 w-12" />
              </div>
              <div className="grid grid-cols-2">
              <Skeleton className="h-4 w-12" />
              </div>
          </div>
       
      </div>
    </div>
  )
}
