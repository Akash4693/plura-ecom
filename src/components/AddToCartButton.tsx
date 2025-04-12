// components/AddToCartButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { Product } from "@/lib/types/productTypes";

type Props = {
  product: Product;
};

const AddToCartButton = ({ product }: Props) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <Button onClick={handleAddToCart} className="border-transparent bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 py-2 px-4 rounded-md flex items-center">
      <ShoppingCart size={18} />
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
