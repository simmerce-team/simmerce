import { fetchCityWithBusinessCount } from '@/actions/cities';
import { fetchProductsByLocation } from '@/actions/products';
import { PageHeader } from '@/components/page-header';
import { ProductCard } from '@/components/product/product-card';
import Link from 'next/link';

type Params = Promise<{ slug: string }>

export default async function CityPage({ params }: { params: Params }) {
  const { slug } = await params;
  
  // Fetch data in parallel
  const [cities, featuredProducts] = await Promise.all([
    fetchCityWithBusinessCount(),
    fetchProductsByLocation(slug)
  ]);

  // Format the city name for display (capitalize first letter of each word)
  const formattedCityName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader 
        title={`Businesses in ${formattedCityName}`}
        description={`Connect with ${featuredProducts.length}+ businesses in ${formattedCityName}`}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Cities', href: '/cities' },
          { name: formattedCityName, href: `/cities/${slug}` },
        ]}
      />

      {/* Featured Products */}
        <section className="my-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-medium text-slate-800 tracking-tight">
              Featured Products in {formattedCityName}
            </h2>
            {featuredProducts.length > 0 && (
            <Link 
              href={`/products?location=${slug}`}
              className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
            >
              View all products
            </Link>
            )}
          </div>
          {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          ) : (
            <p>No products found in this city.</p>
          )}
        </section>

      {/* Other Cities */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium text-slate-800 mb-8 tracking-tight">
          Explore Other Cities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities
            .filter(c => c.name.toLowerCase() !== slug)
            .slice(0, 3)
            .map((city) => {
              const citySlug = city.name.toLowerCase().replace(/\s+/g, '-');
              return (
                <Link
                  key={city.id}
                  href={`/cities/${citySlug}`}
                  className="group block p-6 bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-slate-800 group-hover:text-red-600 transition-colors">
                        {city.name}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {city.businessCount ? city.businessCount + "Businesses" : "No Businesses"}
                      </p>
                    </div>
                    <span className="text-slate-400 group-hover:text-red-500 transition-colors">→</span>
                  </div>
                </Link>
              );
            })}
        </div>
      </section>
    </div>
  );
}
