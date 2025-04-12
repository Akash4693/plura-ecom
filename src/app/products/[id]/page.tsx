import { getProductById } from "@/lib/api/product";
import { Product } from "@/lib/types/productTypes";
import ProductGallery from "@/components/ProductGallery";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { Star } from "lucide-react";

type Props = {
  params: { id: string };
};

export default async function ProductDetailPage({ params }: Props) {
  const product: Product | null = await getProductById(params.id);

  if (!product) return notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-[140px] flex justify-center items-center">
      <div className="flex flex-col lg:flex-row justify-center gap-12 items-center lg:items-start">
        {/* Image Gallery */}
        <div className="w-full lg:w-1/2 rounded-xl shadow-md overflow-hidden">
          <ProductGallery image={product.image} />
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
              {product.title}
            </h1>
            <p className="text-sm text-muted-foreground">{product.category}</p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-yellow-500">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.round(product.rating.rate) ? "currentColor" : "none"}
                    stroke="currentColor"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
              </span>
            </div>
          </div>

          <div className="text-2xl lg:text-3xl font-semibold text-primary dark:text-white">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-gray-600 leading-relaxed mt-4">
            {product.description ||
              "This is a high-quality product curated just for you. Enjoy a seamless shopping experience and unmatched value."}
          </p>

          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
