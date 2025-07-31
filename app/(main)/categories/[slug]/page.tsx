import { fetchCategories } from '@/actions/categories';
import { fetchProductsByCategory } from '@/actions/products';
import { PageHeader } from '@/components/page-header';
import { ProductCard } from '@/components/product/product-card';
import { Images } from '@/utils/constant';
import Image from 'next/image';
import Link from 'next/link';

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
  
  // Fetch data in parallel
  const [categories, categoryProducts] = await Promise.all([
    fetchCategories(),
    fetchProductsByCategory(paramsData.slug)
  ]);

  // Find the current category for breadcrumbs
  const currentCategory = categories.find(cat => 
    cat.name.toLowerCase().replace(/\s+/g, '-') === paramsData.slug
  );

  return (
    <div>
      <PageHeader 
        title={currentCategory?.name || categoryName}
        description={`Browse ${currentCategory?.name || categoryName} products from trusted suppliers`}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Categories', href: '/categories' },
          { 
            name: currentCategory?.name || categoryName, 
            href: `/categories/${paramsData.slug}` 
          },
        ]}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-medium text-slate-800 mb-8 tracking-tight">
            {currentCategory?.name || categoryName} Products
          </h2>
          
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-xl">
              <h3 className="text-lg font-medium text-slate-700 mb-2">No products found</h3>
              <p className="text-slate-500">We couldn't find any products in this category yet.</p>
            </div>
          )}
        </div>

        {/* Related Categories */}
        <div className="mb-12">
          <h3 className="text-xl font-medium text-slate-800 mb-6">
            Explore Related Categories
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {categories
              .filter(cat => cat.name.toLowerCase().replace(/\s+/g, '-') !== paramsData.slug)
              .slice(0, 6)
              .map((relatedCategory) => {
                const categorySlug = relatedCategory.name.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Link
                    key={relatedCategory.id}
                    href={`/categories/${categorySlug}`}
                    className="group flex flex-col items-center p-5 hover:bg-slate-50/50 rounded-xl transition-all duration-200 border border-slate-100 hover:border-slate-200"
                  >
                    <div className="w-12 h-12 mb-3 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-red-50 transition-colors">
                      <Image
                        src={relatedCategory.icon_url || Images.placeholder}
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
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
