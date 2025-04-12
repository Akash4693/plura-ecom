"use client";

import { useDraggable } from "@dnd-kit/core";
import { ProductCard } from "../ProductCard";
import { Product } from "@/lib/types/productTypes";

type DragItemProps = {
  product: Product;
};

export const DragItem = ({ product }: DragItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: product.id.toString(),
    data: {
      type: "product",
      item: product,
    },
  });

  console.log("isDragging", attributes, listeners, setNodeRef, isDragging);
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        opacity: isDragging ? 1 : 0.5,
        cursor: isDragging ? "grab" : "grabbing",
        maxWidth: "180px",
        height: "180px",
        overflow: "hidden",
      }}
    >
      <ProductCard product={product} isShow={false} />
    </div>
  );
};
