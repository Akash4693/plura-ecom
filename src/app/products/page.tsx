import { getFeaturedProducts } from "@/lib/api/product";
import ClientProductList from "@/components/products/ClientProductList";
import { Product } from "@/lib/types/productTypes"; 

export default async function ProductsPage() {
  const products: Product[] = await getFeaturedProducts();

 
  const categorySet: Set<string> = new Set(products.map((p) => p.category));
  const categories: string[] = Array.from(categorySet); 

  return <ClientProductList products={products} categories={categories} />;
}
