import { ProductsSection } from '@/components/home/products';
import { SellerCTA } from '@/components/home/seller-cta';

export default function HomePage() {
  return (
    <div className="px-4 md:px-6">
      {/* Categories Section */}
      {/* <CategoriesSection /> */}

      {/* Featured Products */}
      <ProductsSection />

      {/* Seller CTA Section */}
      <SellerCTA />

      {/* Cities Section */}
      {/* <CitiesSection /> */}
    </div>
  );
}