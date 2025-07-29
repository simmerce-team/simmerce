import { ProductList } from '@/components/product/product-list';
import { categories, cities, products } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';

function SectionHeader({ title, linkText, linkHref }: { title: string; linkText: string; linkHref: string }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-lg md:text-2xl font-medium text-slate-800">{title}</h2>
      <Link href={linkHref} className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors">
        {linkText}
      </Link>
    </div>
  );
}

function CategoryCard({ category }: { category: typeof categories[0] }) {
  return (
    <Link 
      href={`/categories/${category.slug}`}
      className="group flex flex-col items-center p-6 bg-white hover:bg-slate-50/50 rounded-xl transition-all duration-200 border border-slate-100 hover:border-slate-200"
    >
      <div className="w-14 h-14 mb-4 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-red-50 transition-colors">
        <Image 
          src={category.image} 
          alt={category.name}
          width={48}
          height={48}
          className="rounded-xl"
        />
      </div>
      <span className="text-sm font-medium text-slate-700 text-center group-hover:text-red-600 transition-colors">
        {category.name}
      </span>
    </Link>
  );
}


export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* Categories Section */}
      <section className="md:py-16 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-medium text-slate-800 mb-3">Explore Categories</h1>
            <p className="text-slate-600 text-lg">Discover products across various industries</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>



      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader 
            title="Featured Products" 
            linkText="View all products" 
            linkHref="/products" 
          />
          
          <ProductList products={products} />
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-16 bg-slate-50/30">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader 
            title="Popular Business Hubs" 
            linkText="View all Cities" 
            linkHref="/cities" 
          />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {cities.map((city) => (
              <Link 
                key={city.id} 
                href={`/cities/${city.slug}`}
                className="group block p-6 bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-200"
              >
                <h3 className="font-medium text-slate-800 group-hover:text-red-600 transition-colors">{city.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{city.businessCount.toLocaleString()}+ Businesses</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}