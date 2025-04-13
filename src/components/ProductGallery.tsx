
"use client";

import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx";

interface ProductGalleryProps {
  image: string;
}

const ProductGallery = ({ image }: ProductGalleryProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full">
      <div className="relative w-full h-[400px] md:h-[500px] bg-muted rounded-lg overflow-hidden">
        {isLoading && <Skeleton className="absolute inset-0 w-full h-full" />}
        <Image
          src={image}
          alt="Product image"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          onLoadingComplete={() => setIsLoading(false)}
          className={clsx(
            "object-contain transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100"
          )}
        />
      </div>
    </div>
  );
};

export default ProductGallery;
