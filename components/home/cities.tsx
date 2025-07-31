'use client';
import { fetchCities } from '@/actions/cities';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SectionHeader } from '../section-header';

export function CitiesSection() {
    const [cities, setCities] = useState<Array<{id: string; name: string; state: string | null}>>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const loadCities = async () => {
        try {
          const data = await fetchCities();
          setCities(data);
        } catch (error) {
          console.error('Failed to load cities:', error);
        } finally {
          setLoading(false);
        }
      };
  
      loadCities();
    }, []);
  
    if (loading) {
      return (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <SectionHeader title="Popular Cities" linkText="View all" linkHref="/cities" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 bg-slate-100 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </section>
      );
    }
  
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader title="Popular Cities" linkText="View all" linkHref="/cities" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {cities.slice(0, 6).map((city) => (
              <Link
                key={city.id}
                href={`/cities/${city.name.toLowerCase().replace(' ', '-')}`}
                className="block p-3 text-center bg-white border border-slate-200 rounded-lg hover:bg-red-50 hover:border-red-100 transition-colors"
              >
                <span className="text-sm font-medium text-slate-800">
                  {city.name}
                  {city.state ? "," : ''}
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