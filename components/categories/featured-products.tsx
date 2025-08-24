import { fetchProductsByCategory } from "@/actions/products";
import { ProductCard } from "@/components/product/product-card";

export async function FeaturedProductsByCategory({ slug }: { slug: string }) {
  const products = await fetchProductsByCategory(slug);

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-xl">
        <h3 className="text-lg font-medium text-slate-700 mb-2">No products found</h3>
        <p className="text-slate-500">
          We couldn't find any products in this category yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}