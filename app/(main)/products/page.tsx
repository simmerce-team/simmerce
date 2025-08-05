import { fetchFeaturedProducts } from "@/actions/products";
import { Loading } from "@/components/loading";
import { PageHeader } from "@/components/page-header";
import { ProductList } from "@/components/product/product-list";
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
  const products = await fetchFeaturedProducts(100, searchQuery);

  return (
    <div className="min-h-screen bg-slate-50/30">
      <PageHeader
        title={
          searchQuery ? `Search Results for "${searchQuery}"` : "All Products"
        }
        description={
          searchQuery
            ? `Showing results for "${searchQuery}"`
            : "Discover quality products from verified suppliers across India"
        }
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          ...(searchQuery
            ? [{ name: `Search: ${searchQuery}`, href: `#` }]
            : []),
        ]}
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
            <ProductList products={products} />
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
