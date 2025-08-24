import { fetchProductsByLocation } from "@/actions/products";
import { ProductCard } from "@/components/product/product-card";

export async function FeaturedProductsByCity({ slug }: { slug: string }) {
  const products = await fetchProductsByLocation(slug);

  if (!products || products.length === 0) {
    return <p className="text-center">No products found in this city.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}