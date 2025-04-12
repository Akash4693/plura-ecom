"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Product } from "@/lib/types/productTypes";

import FilterSidebar from "@/components/FilterSidebar";
import SortDropdown from "@/components/SortDropdown";
import { ProductCard } from "../ProductCard";

type Props = {
  products: Product[];
  categories: string[];
};

export default function ClientProductList({ products, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sort, setSort] = useState("default");

  const filteredProducts = useMemo(() => {
    let result = selectedCategory
      ? products.filter((p) => p.category === selectedCategory)
      : products;

    if (sort === "price-asc")
      result = [...result].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc")
      result = [...result].sort((a, b) => b.price - a.price);
    else if (sort === "rating")
      result = [...result].sort((a, b) => b.rating.rate - a.rating.rate);

    return result;
  }, [products, selectedCategory, sort]);

  return (
    <main className="min-h-screen bg-background text-foreground px-4 md:px-12 py-8">
      <section className="text-center py-10 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold">Our Products</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Browse our collection of curated items just for you.
        </p>
      </section>

      <section className="flex flex-col md:flex-row justify-between gap-6 mb-10">
        <FilterSidebar
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <SortDropdown selected={sort} onChange={setSort} />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ProductCard product={product} isShow={true} />
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
    </main>
  );
}
