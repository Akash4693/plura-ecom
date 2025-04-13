'use client';

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WishlistButton } from '@/components/WishlistButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useWishlistStore } from '@/lib/store/wishlistStore';

export default function Wishlist() {
  const { userId } = useAuth();
  const { items, loadWishlist, removeItem, syncWishlist } = useWishlistStore();
  const router = useRouter();

  useEffect(() => {
    if (userId) loadWishlist(userId);
  }, [userId, loadWishlist]);

  
  useEffect(() => {
    const handleOnline = () => {
      syncWishlist(); 
    };

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, [syncWishlist]);

  if (!userId)
    return <p className="text-center mt-10">Please log in to view your wishlist.</p>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-center">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="relative group overflow-hidden">
              <CardContent className="p-4">
                <div className="w-full h-48 relative mb-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold line-clamp-2">{item.title}</h3>
                <p className="text-green-600 font-medium">${item.price}</p>
              </CardContent>

              <div className="absolute top-2 right-2 z-10">
                <WishlistButton
                  isWishlisted={true}
                  onClick={() => removeItem(item.id, userId)}
                />
              </div>

              <div className="p-4 pt-0">
                <Button
                  onClick={() => router.push(`/products/${item.id}`)}
                  variant="outline"
                  className="w-full"
                >
                  View Product
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
