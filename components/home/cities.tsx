import { fetchCities } from '@/actions/cities';
import Link from 'next/link';
import { SectionHeader } from '../section-header';

export async function CitiesSection() {
  const cities = await fetchCities();

  return (
    <section className="py-8 rounded-lg bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeader title="Popular Cities" linkText="View all" linkHref="/cities" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {cities.slice(0, 6).map((city) => (
            <Link
              key={city.id}
              href={`/cities/${city.name.toLowerCase().replace(' ', '-')}`}
              className="block p-3 text-center bg-white border border-slate-200 rounded-lg hover:bg-accent hover:border-accent transition-colors"
            >
              <span className="text-sm font-medium text-slate-800">
                {city.name}
                {city.state ? ',' : ''}
                {city.state ? <br /> : ''}
                {city.state ? city.state : ''}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}