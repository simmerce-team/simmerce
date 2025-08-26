import { MobileHeader } from "@/components/header/mobile-header";
import { CitiesSection } from "@/components/home/cities";
import { CitiesSkeleton } from "@/components/home/cities_skeleton";
import { ProductsSection } from "@/components/home/products";
import { ProductsSkeleton } from "@/components/home/products_skeleton";
import { SellerCTA } from "@/components/home/seller-cta";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <>
      <MobileHeader isLogo title="Simmerce" />
      <div className="p-4 md:px-6">
        {/* Categories Section */}
        {/* <CategoriesSection /> */}

        {/* Featured Products */}
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsSection />
        </Suspense>

        {/* Seller CTA Section */}
        <SellerCTA />

        {/* Cities Section */}
        <Suspense fallback={<CitiesSkeleton count={6} />}>
          <CitiesSection />
        </Suspense>
      </div>
      <BottomNav />
    </>
  );
}
