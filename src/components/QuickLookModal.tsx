"use client";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { Product } from "@/lib/types/productTypes";
import Image from "next/image";
import { ShoppingCart, X } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface QuickLookModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickLookModal({
  product,
  isOpen,
  onClose,
}: QuickLookModalProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
        </TransitionChild>

        {/* Modal Panel */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-zinc-900 shadow-xl overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {/* Close Button */}
                <div className="flex justify-end">
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="icon"
                    className="text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </Button>
                </div>

                {/* Product Image */}
                <div className="relative w-full h-64 md:h-80">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Title + Category + Rating */}
                  <div>
                    <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                      {product.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {product.category}
                    </p>
                    <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      <span className="mr-1">
                        ⭐ {product.rating.rate.toFixed(1)}
                      </span>
                      <span>({product.rating.count} reviews)</span>
                    </div>
                  </div>

                  {/* Price */}
                  <p className="text-primary text-lg font-bold">
                    ${product.price.toFixed(2)}
                  </p>

                  {/* Description */}
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                    {product.description ||
                      "A premium product crafted for you."}
                  </p>

                  {/* Add to Cart */}
                  <Button
                    onClick={handleAddToCart}
                    className="w-full flex items-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
