"use client";

import { ProductItem } from "@/actions/products";
import { ProductCard } from "@/components/product/product-card";
import Link from "next/link";

interface SellerProductsProps {
  products: ProductItem[];
  slug: string;
}

export function SellerProducts({ products, slug }: SellerProductsProps) {
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="md:text-xl font-semibold text-foreground">
          Products ({products.length})
        </h2>
        {products.length > 4 && (
          <Link
            href={`/sellers/${slug}/products`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View all products
          </Link>
        )}
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-800 mb-2">
            No products available
          </h3>
          <p className="text-slate-600">
            This supplier hasn't added any products yet.
          </p>
        </div>
      )}
    </div>
  );
}
