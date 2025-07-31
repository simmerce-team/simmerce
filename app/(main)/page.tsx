import { CategoriesSection } from '@/components/home/categories';
import { CitiesSection } from '@/components/home/cities';
import { ProductsSection } from '@/components/home/products';

export default function HomePage() {
  return (
    <div>

      {/* Categories Section */}
      <CategoriesSection />

      {/* Featured Products */}
     <ProductsSection />

      {/* Cities Section */}
      <CitiesSection />
    </div>
  );
}