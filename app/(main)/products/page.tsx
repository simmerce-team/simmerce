import { fetchFeaturedProducts } from "@/actions/products";
import { MobileHeader } from "@/components/header/mobile-header";
import { Loading } from "@/components/loading";
import { PageHeader } from "@/components/page-header";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

type SearchParams = Promise<{
  search?: string;
  [key: string]: string | string[] | undefined;
}>;

type PageProps = {
  searchParams: SearchParams;
};

export default async function ProductsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const searchQuery = resolvedSearchParams.search?.toString() || "";
  const products = await fetchFeaturedProducts(10, searchQuery);

  return (
    <div className="min-h-screen bg-slate-50/30">
      <MobileHeader isBack={true} title="All Products" />
      <PageHeader
        title={
          searchQuery ? `Search Results for "${searchQuery}"` : "All Products"
        }
        description={
          searchQuery
            ? `Showing results for "${searchQuery}"`
            : "Discover quality products from verified suppliers across India"
        }
      />

      <div className="bg-white rounded-xl border border-slate-200 p-6 mt-6">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery
                ? `No products found for "${searchQuery}"`
                : "No products available"}
            </h3>
            <p className="text-sm text-gray-500">
              {searchQuery
                ? "Try adjusting your search or filter to find what you're looking for."
                : "Please check back later for new products."}
            </p>
          </div>
        ) : (
          <Suspense fallback={<Loading />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Suspense>
        )}

        {products.length > 0 && !searchQuery && (
          <div className="text-center mt-8">
            <Button variant="outline" className="px-8">
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}