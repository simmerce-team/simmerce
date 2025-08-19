import { getBusinessById, getBusinessProducts } from "@/actions/business";
import { notFound } from "next/navigation";
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

  // Fetch business products
  const products = await getBusinessProducts(business.id);

  // Format business data for display
  const seller = {
    ...business,
    memberSince: business.created_at
      ? new Date(business.created_at).getFullYear()
      : "N/A",
    totalProducts: products.length,
    businessType: business.business_type ? [business.business_type.name] : [],
  };

  return (
    <div className="container mx-auto px-4 md:py-8">
      {/* Seller Header */}
      <SellerDetail seller={seller} />

      {/* Products Section */}
      <SellerProducts products={products} slug={slug} />
    </div>
  );
}
