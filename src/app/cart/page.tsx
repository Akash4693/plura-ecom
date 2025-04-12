"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";
import { Trash2, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useDroppable } from "@dnd-kit/core";




export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, totalItems, totalPrice } = useCartStore();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="space-y-4 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Button variant="outline" onClick={() => router.push("/products")}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
         

          <div>
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="object-contain rounded"
                    />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>

                    <span className="w-6 text-center">{item.quantity}</span>

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove from cart"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Separator />

            <div className="flex justify-between items-center text-lg font-medium px-2">
              <span>Total ({totalItems} items)</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/checkout" className="w-full">
                <Button className="w-full">Go to Checkout</Button>
              </Link>
              <Link href="/products" className="w-full">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
