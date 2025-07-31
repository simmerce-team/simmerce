import { fetchFeaturedProducts } from "@/actions/products";
import { PageHeader } from "@/components/page-header";
import { ProductList } from "@/components/product/product-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function ProductsPage() {
  const products = await fetchFeaturedProducts();
  return (
    <div className="min-h-screen bg-slate-50/30">
      {/* Page Header */}
      <PageHeader
        title="All Products"
        description="Discover quality products from verified suppliers across India"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
        ]}
      />

      <div className="container mx-auto py-8">
        {/* Main Content */}
        <div>
          {/* Results Header */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-900">
                All Products
              </h2>
              <div className="flex items-center gap-3">
                <Input placeholder="Search products..." />
              </div>
              <div className="flex items-center gap-3">
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <ProductList products={products} />

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="px-8">
                Load More Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
