"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types/productTypes";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { WishlistButton } from "@/components/WishlistButton";
import QuickLookWrapper from "@/components/QuickLookWrapper";
import { useAuth } from "@clerk/nextjs";
import { useDraggable } from "@dnd-kit/core";

interface ProductCardProps {
  product: Product;
  isShow?: boolean;
}

export const ProductCard = ({ product, isShow }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isQuickLookOpen, setIsQuickLookOpen] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const { userId } = useAuth();
  const { items, addItem, removeItem } = useWishlistStore();
  const router = useRouter();

  const isWishlisted = items.some((item) => item.id === product.id);

  const handleWishlistToggle = () => {
    if (!userId) return;
    isWishlisted
      ? removeItem(product.id, userId)
      : addItem({ ...product }, userId);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      });
    }
  };

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `product-${product.id}`,
    data: {
      type: "product",
      item: product,
    },
  });

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <>
      <Card
        onClick={handleCardClick}
        className="relative w-full max-w-xs mx-auto shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer"
      >
        {/* Wishlist + Quick Look */}
        {isShow && (
          <div className="absolute top-2 right-2 z-10 flex gap-1">
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleWishlistToggle();
              }}
            >
              <WishlistButton isWishlisted={isWishlisted} onClick={() => {}} />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/70 hover:bg-white dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsQuickLookOpen(true);
              }}
            >
              <Eye size={18} />
            </Button>
          </div>
        )}

        <CardHeader className="p-0">
          <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="relative w-full h-64"
            onClick={(e) => e.stopPropagation()} // Prevent navigating when dragging
          >
            <Image
              src={product.image}
              alt={product.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg cursor-grab active:cursor-grabbing"
            />
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <CardTitle className="text-lg font-medium text-muted-foreground truncate">
            {product.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
          <p className="text-xl font-semibold text-primary dark:text-white mt-2">
            ${product.price.toFixed(2)}
          </p>
        </CardContent>

        <CardFooter className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                decrementQuantity();
              }}
            >
              <Minus size={16} />
            </Button>
            <span className="text-base">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                incrementQuantity();
              }}
            >
              <Plus size={16} />
            </Button>
          </div>
          <Button
            onClick={handleAddToCart}
            className="border-transparent bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 py-2 px-4 rounded-md flex items-center"
          >
            <ShoppingCart size={16} className="mr-2" />
            Add
          </Button>
        </CardFooter>
      </Card>

      {/* Quick Look Modal */}
      {isQuickLookOpen && (
        <QuickLookWrapper
          product={product}
          isOpen={isQuickLookOpen}
          onClose={() => setIsQuickLookOpen(false)}
        />
      )}
    </>
  );
};
