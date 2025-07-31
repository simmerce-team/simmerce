'use client';

import { Product } from '@/actions/products';
import { ProductCard } from '@/components/product/product-card';

interface SellerProductsProps {
  products: Product[];
}

export function SellerProducts({ products }: SellerProductsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-medium text-slate-800 tracking-tight">Products & Services</h2>
        <div className="text-sm text-slate-600">
          {products.length} products available
        </div>
      </div>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-800 mb-2">No products available</h3>
          <p className="text-slate-600">This supplier hasn't added any products yet.</p>
        </div>
      )}
    </div>
  );
}
