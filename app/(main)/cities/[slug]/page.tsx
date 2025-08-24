import { FeaturedProductsByCity } from "@/components/cities/featured-products";
import { OtherCitiesList } from "@/components/cities/other-cities";
import { CitiesSkeleton } from "@/components/home/cities_skeleton";
import { ProductsSkeleton } from "@/components/home/products_skeleton";
import { PageHeader } from "@/components/page-header";
import Link from "next/link";
import { Suspense } from "react";

type Params = Promise<{ slug: string }>;

export default async function CityPage({ params }: { params: Params }) {
  const { slug } = await params;

  // Format the city name for display (capitalize first letter of each word)
  const formattedCityName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="container mx-auto px-4 md:py-8 max-w-7xl">
      <PageHeader
        title={`Businesses in ${formattedCityName}`}
        description={`Discover suppliers, manufacturers, and wholesalers across ${formattedCityName}.`}
      />

      {/* Featured Products */}
      <section className="my-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-base md:text-lg font-semibold text-slate-800 tracking-tight">
            Featured Products in {formattedCityName}
          </h2>
          <Link
            href={`/products?location=${slug}`}
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            View all products
          </Link>
        </div>
        <Suspense fallback={<ProductsSkeleton count={8} />}> 
          <FeaturedProductsByCity slug={slug} />
        </Suspense>
      </section>

      {/* Other Cities */}
      <section className="mb-12">
        <h2 className="md:text-lg font-semibold text-slate-800 mb-8 tracking-tight">
          Explore Other Cities
        </h2>
        <Suspense fallback={<CitiesSkeleton count={6} />}> 
          <OtherCitiesList />
        </Suspense>
      </section>
    </div>
  );
}