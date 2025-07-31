'use client';

import { fetchFeaturedProducts, Product } from '@/actions/products';
import { useEffect, useState } from 'react';
import { ProductList } from '../product/product-list';
import { SectionHeader } from '../section-header';

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchFeaturedProducts(8);
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Failed to load featured products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader
            title="Featured Products"
            linkText="View all products"
            linkHref="/products"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 bg-slate-100 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg inline-block">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeader
          title="Featured Products"
          linkText="View all products"
          linkHref="/products"
        />
        {products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500">No featured products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
