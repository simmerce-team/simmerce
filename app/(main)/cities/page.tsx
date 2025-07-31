import { fetchCityWithBusinessCount } from '@/actions/cities';
import { PageHeader } from '@/components/page-header';
import Link from 'next/link';

export default async function CityPage() {
  const cities = await fetchCityWithBusinessCount();

  return (
    <div>
      <PageHeader 
        title="Business Cities"
        description="Find suppliers and manufacturers in major business hubs across India"
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Cities', href: '/cities' },
        ]}
      />
      
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/cities/${city.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group block p-6 bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-slate-800 group-hover:text-red-600 transition-colors mb-2">
                    {city.name}
                  </h3>
                  <p className="text-slate-600">
                    {city.businessCount ? city.businessCount + " Businesses" : "No Businesses"}
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-red-50 text-red-700 border border-red-100 group-hover:bg-red-100 transition-colors">
                  View
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
