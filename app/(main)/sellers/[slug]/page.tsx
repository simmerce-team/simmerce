import { getBusinessById } from "@/actions/business";
import { ProductsSkeleton } from "@/components/home/products_skeleton";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SellerDetail from "./seller-detail";
import { SellerProducts } from "./seller-products";

type Params = Promise<{ slug: string }>;

export default async function SellerProfilePage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;

  // Fetch business/seller data
  const business = await getBusinessById(slug);
  if (!business) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:py-8">
      {/* Seller Header */}
      <SellerDetail seller={business} />

      {/* Products Section */}
      <Suspense fallback={<ProductsSkeleton count={8} />}>
        <SellerProducts businessId={business.id} slug={slug} />
      </Suspense>
    </div>
  );
}
