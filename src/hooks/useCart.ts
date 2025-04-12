import { useState, useEffect } from 'react';
import { Product } from '@/lib/types/productTypes';

type CartState = { [key: number]: { product: Product; quantity: number } };

export const useCart = () => {
  const [cart, setCart] = useState<CartState>({});

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const item = prev[product.id];
      return {
        ...prev,
        [product.id]: {
          product,
          quantity: item ? item.quantity + 1 : 1,
        },
      };
    });
  };

  return { cart, addToCart };
};
