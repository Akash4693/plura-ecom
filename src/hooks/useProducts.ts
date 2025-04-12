import { useEffect, useState } from 'react';
import { Product } from '@/lib/types/productTypes';
import axios from 'axios';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get<Product[]>('https://fakestoreapi.com/products?limit=8');
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { products, loading };
};
