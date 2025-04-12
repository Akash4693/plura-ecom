import { getFeaturedProducts } from "@/lib/api/product";
import ClientProductList from "@/components/products/ClientProductList";
import { Product } from "@/lib/types/productTypes"; // ✅ Import the Product type

export default async function ProductsPage() {
  const products: Product[] = await getFeaturedProducts();

  // ✅ Explicitly type Set to Set<string> so it avoids TS errors
  const categorySet: Set<string> = new Set(products.map((p) => p.category));
  const categories: string[] = Array.from(categorySet); // ✅ Use Array.from instead of spread for compatibility

  return <ClientProductList products={products} categories={categories} />;
}
