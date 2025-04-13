import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <Card className="w-full max-w-xs mx-auto shadow-sm rounded-xl h-[500px] flex flex-col justify-between animate-pulse">
      <CardHeader className="p-0">
        <div className="relative w-full h-64 bg-muted rounded-t-xl">
          <Skeleton className="absolute inset-0 w-full h-full rounded-t-xl" />
        </div>
      </CardHeader>

      <CardContent className="space-y-3 p-4">
        <Skeleton className="h-5 w-3/4 bg-muted-foreground/30 rounded" />
        <Skeleton className="h-4 w-1/2 bg-muted-foreground/20 rounded" />
        <Skeleton className="h-6 w-1/3 bg-muted-foreground/40 rounded mt-2" />
      </CardContent>

      <CardFooter className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 rounded-full bg-muted-foreground/30" />
          <Skeleton className="h-8 w-8 rounded-full bg-muted-foreground/30" />
        </div>
        <Skeleton className="h-10 w-24 rounded-md bg-primary/30" />
      </CardFooter>
    </Card>
  );
};

export default ProductCardSkeleton;
