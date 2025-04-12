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

  // Drag start logic with logging and validation
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

  // Drag end logic with logging, validation, and error handling
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Log the full event object for debugging
    console.log("🟢 Drag ended", event);

    // Ensure that the 'active' object has an 'id' and contains the correct product data
    console.log("👉 Dragged item ID:", active.id);

    // Log the 'over' object and its 'id'
    console.log("📦 Dropped over:", over?.id);
    console.log("📦 Full 'over' object:", over);

    // Check if there's a valid drop target
    if (!over || over.id !== "cart-dropzone") {
      console.warn("⚠️ Drop target is invalid or missing product");
      return;
    }

    // Ensure that the dragged product data is available
    const draggedProduct = active.data?.current?.item as Product;

    if (!draggedProduct) {
      console.warn("⚠️ Dragged product data is missing.");
      return;
    }

    // Log the product and proceed with adding it to the cart
    addToCart(draggedProduct);
    console.log("✅ Product added to cart:", draggedProduct.title);
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
