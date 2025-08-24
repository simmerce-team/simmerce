import { FeaturedProductsByCategory } from '@/components/categories/featured-products';
import { RelatedCategories } from '@/components/categories/related-categories';
import { ProductsSkeleton } from '@/components/home/products_skeleton';
import { PageHeader } from '@/components/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

type Params = Promise<{ slug: string }>

export default async function CategoryPage({ 
  params 
}: { 
  params: Params 
}) {
  const paramsData = await(params);
  
  // Format the category name for display
  const categoryName = paramsData.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div>
      <PageHeader 
        title={categoryName}
        description={`Browse ${categoryName} products from trusted suppliers`}
      />
      
      <div className="container mx-auto px-4 md:py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-medium text-slate-800 mb-8 tracking-tight">
            {categoryName} Products
          </h2>
          <Suspense fallback={<ProductsSkeleton count={8} />}> 
            <FeaturedProductsByCategory slug={paramsData.slug} />
          </Suspense>
        </div>

        {/* Related Categories */}
        <div className="mb-12">
          <h3 className="text-xl font-medium text-slate-800 mb-6">
            Explore Related Categories
          </h3>
          <Suspense
            fallback={
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="group flex flex-col items-center p-5 rounded-xl border border-slate-100">
                    <Skeleton className="w-12 h-12 mb-3 rounded-2xl" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            }
          >
            <RelatedCategories currentSlug={paramsData.slug} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
