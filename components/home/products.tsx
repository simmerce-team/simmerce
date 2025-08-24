import { fetchFeaturedProducts, ProductItem } from "@/actions/products";
import { ProductCard } from "../product/product-card";

export async function ProductsSection() {
  const products: ProductItem[] = await fetchFeaturedProducts(8);

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-slate-500">
          No featured products available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
