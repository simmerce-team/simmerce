import { PageHeader } from '@/components/page-header';
import { categories } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';

export default function CategoriesPage() {
  return (
    <div>
      <PageHeader 
        title="All Categories"
        description="Browse through our wide range of product categories"
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Categories', href: '/categories' },
        ]}
      />
      
      <div className="container mx-auto px-6 md:py-16 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group flex flex-col items-center p-6 bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 mb-4 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-red-50 transition-colors">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={40}
                  height={40}
                  className="text-slate-400"
                />
              </div>
              <h3 className="text-lg font-medium text-slate-800 text-center group-hover:text-red-600 transition-colors mb-2">
                {category.name}
              </h3>
              <span className="text-sm text-red-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">View products →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
