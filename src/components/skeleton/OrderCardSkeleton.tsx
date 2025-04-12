// components/skeletons/OrderCardSkeleton.tsx
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const OrderCardSkeleton = () => {
  return (
    <Card className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32 bg-muted-foreground/30 rounded" />
          <Skeleton className="h-4 w-24 bg-muted-foreground/20 rounded" />
        </div>
        <Skeleton className="h-6 w-20 bg-muted-foreground/40 rounded" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-16 w-16 rounded-md bg-muted-foreground/20" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 bg-muted-foreground/20 rounded" />
              <Skeleton className="h-3 w-12 bg-muted-foreground/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default OrderCardSkeleton
