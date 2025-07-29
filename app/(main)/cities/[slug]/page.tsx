import { PageHeader } from '@/components/page-header';
import { ProductCard } from '@/components/product/product-card';
import { categories, cities, products } from '@/lib/mock-data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';

type Params = Promise<{ slug: string }>

export default function CityPage({ params }: { params: Params }) {
  const paramsData = use(params)
  const city = cities.find(c => c.slug === paramsData.slug);
  
  if (!city) {
    notFound();
  }
  
  // Mock function to get top categories in this city
  const getTopCategories = () => {
    return categories.slice(0, 4).map(category => ({
      ...category,
      businessCount: Math.floor(Math.random() * 500) + 100
    }));
  };

  // Mock function to get featured products in this city
  const getFeaturedProducts = () => {
    return products
      .map(p => ({ ...p, businessName: `${p.name.split(' ')[0]} ${city.name}` }))
      .slice(0, 4);
  };

  const topCategories = getTopCategories();
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      <PageHeader 
        title={`Businesses in ${city.name}`}
        description={`Connect with ${city.businessCount.toLocaleString()}+ businesses in ${city.name}`}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Cities', href: '/cities' },
          { name: city.name, href: `/cities/${city.slug}` },
        ]}
      />
      
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* Top Categories in City */}
        <section className="mb-16">
          <h2 className="text-2xl font-medium text-slate-800 mb-8 tracking-tight">
            Popular Categories in {city.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {topCategories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}?location=${city.slug}`}
                className="group block p-6 bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-medium text-slate-800 group-hover:text-red-600 mb-3 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-slate-600">
                  {category.businessCount.toLocaleString()} businesses
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-medium text-slate-800 tracking-tight">
              Featured Products in {city.name}
            </h2>
            <Link 
              href={`/products?location=${city.slug}`}
              className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
            >
              View all products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Other Cities */}
        <section>
          <h2 className="text-2xl font-medium text-slate-800 mb-8 tracking-tight">
            Other Business Hubs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities
              .filter(c => c.slug !== city.slug)
              .slice(0, 3)
              .map((otherCity) => (
                <Link
                  key={otherCity.id}
                  href={`/cities/${otherCity.slug}`}
                  className="group block p-6 bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-slate-800 group-hover:text-red-600 transition-colors">{otherCity.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {otherCity.businessCount.toLocaleString()}+ Businesses
                      </p>
                    </div>
                    <span className="text-slate-400 group-hover:text-red-500 transition-colors">→</span>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
