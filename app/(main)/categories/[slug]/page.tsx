import { PageHeader } from '@/components/page-header';
import { ProductCard } from '@/components/product/product-card';
import { categories, products } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';

type Params = Promise<{ slug: string }>

export default function CategoryPage({ params }: { params: Params }) {
  const paramsData = use(params)
  const category = categories.find(cat => cat.slug === paramsData.slug);
  
  if (!category) {
    notFound();
  }
  
  const categoryProducts = products.filter(p => p.category === category.slug);

  return (
    <div>
      <PageHeader 
        title={category.name}
        description={`Browse ${category.name} products from trusted suppliers`}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Categories', href: '/categories' },
          { name: category.name, href: `/categories/${category.slug}` },
        ]}
      />
      
      <div className="container mx-auto px-6 md:py-16 max-w-7xl">
        <div className="mb-12">
          <h2 className="text-2xl font-medium text-slate-800 mb-8 tracking-tight">
            {category.name} Products
          </h2>
          
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50/30 rounded-2xl">
              <div className="max-w-md mx-auto">
                <p className="text-slate-600 text-lg mb-6">No products found in this category.</p>
                <Link 
                  href="/categories" 
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Browse all categories
                </Link>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-16 border-t border-slate-200 pt-12">
          <h3 className="text-xl font-medium text-slate-800 mb-8 tracking-tight">
            Looking for something else?
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {categories
              .filter(cat => cat.slug !== category.slug)
              .slice(0, 6)
              .map((relatedCategory) => (
                <Link
                  key={relatedCategory.id}
                  href={`/categories/${relatedCategory.slug}`}
                  className="group flex flex-col items-center p-5 hover:bg-slate-50/50 rounded-xl transition-all duration-200 border border-slate-100 hover:border-slate-200"
                >
                  <div className="w-12 h-12 mb-3 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-red-50 transition-colors">
                    <Image
                      src={relatedCategory.image}
                      alt={relatedCategory.name}
                      width={24}
                      height={24}
                      className="text-slate-400"
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-700 text-center group-hover:text-red-600 transition-colors">
                    {relatedCategory.name}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
