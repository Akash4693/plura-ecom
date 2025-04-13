"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { DragItem } from "@/components/drag-and-drop/DragItem";
import { Product } from "@/lib/types/productTypes";

type Props = {
  children: React.ReactNode;
};

const DndContextProvider = ({ children }: Props) => {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const { addToCart } = useCartStore();

  const sensors = useSensors(useSensor(PointerSensor));

 
  const handleDragStart = (event: any) => {
    const { active } = event;
    const product = active.data?.current?.item as Product;

    if (product) {
      setActiveProduct(product);
      console.log("Drag started with product:", product);
    } else {
      console.error("No product found during drag start", active);
    }
  };


  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || over.id !== "cart-dropzone") {
      console.warn("⚠️ Drop target is invalid or missing product");
      return;
    }

    const draggedProduct = active.data?.current?.item as Product;

    if (!draggedProduct) {
      console.warn("⚠️ Dragged product data is missing.");
      return;
    }

    addToCart(draggedProduct);
   
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay>
        {activeProduct ? <DragItem product={activeProduct} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DndContextProvider;
