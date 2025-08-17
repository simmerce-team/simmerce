import { getBusinessById, getBusinessProducts } from "@/actions/business";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Award,
  Building2,
  Calendar,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SellerProducts } from "./seller-products";

type Params = Promise<{ slug: string }>;

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), "MMMM yyyy");
  } catch (e) {
    return dateString;
  }
};

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
    location: business.city
      ? `${business.city.name}${
          business.city.state?.name ? `, ${business.city.state.name}` : ""
        }`
      : "N/A",
    employees: business.employees || "N/A",
    certifications: business.certifications || ["GST Registered"],
    categories: business.categories || [],
  };

  return (
    <div className="container mx-auto px-4 md:py-8">
      {/* Seller Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="hidden md:flex w-24 h-24 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 items-center justify-center text-3xl font-bold text-blue-600">
            {seller.name?.charAt(0) || "B"}
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h1 className="md:text-2xl text-xl font-bold flex items-center gap-2">
                {seller.name}
                {/* {seller.is_verified && (
                  <Badge variant="secondary" className="gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </Badge>
                )} */}
              </h1>
              {seller.gst_number && (
                <div className="flex items-center text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                  <span className="font-medium">GST:</span> {seller.gst_number}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
              {/* <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
                {seller.rating} ({stats?.total_reviews || 0} reviews) | {seller.totalProducts} products
              </div> */}
              {seller.businessType.length > 0 && (
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 mr-1" />{" "}
                  {seller.businessType.join(", ")}
                </div>
              )}
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" /> {seller.employees}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" /> Member since{" "}
                {seller.memberSince}
              </div>
            </div>

            {seller.description && (
              <div className="mt-4">
                <p className="text-sm text-foreground">{seller.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Business Details */}
        <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Contact Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-foreground mb-3 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Contact Information
            </h3>
            <ul className="space-y-2 text-sm text-foreground">
              {seller.address && (
                <li className="flex items-start">
                  <MapPin className="w-4 h-4 mt-0.5 mr-2 text-gray-500 flex-shrink-0" />
                  <span>
                    {seller.address
                      ? seller.address + ", " + seller.location
                      : "Address not specified"}
                  </span>
                </li>
              )}
              {seller.email && (
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                  <a
                    href={`mailto:${seller.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {seller.email}
                  </a>
                </li>
              )}
              {seller.website && (
                <li className="flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                  <a
                    href={
                      seller.website.startsWith("http")
                        ? seller.website
                        : `https://${seller.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {seller.website.replace(/^https?:\/\//, "")}
                  </a>
                </li>
              )}
              {seller.phone && (
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-500" />
                  <a
                    href={`tel:${seller.phone.replace(/\D/g, "")}`}
                    className="text-blue-600 hover:underline"
                  >
                    {seller.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Business Details */}
          <div className="hidden md:block bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-foreground mb-3 flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-blue-600" />
              Business Details
            </h3>
            <ul className="space-y-2 text-sm text-foreground">
              {business.created_at && (
                <li className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span>Member since: {formatDate(business.created_at)}</span>
                </li>
              )}
              {business.updated_at && (
                <li className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span>Last updated: {formatDate(business.updated_at)}</span>
                </li>
              )}
              {seller.employees && seller.employees !== "N/A" && (
                <li className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-gray-500" />
                  <span>Employees: {seller.employees}</span>
                </li>
              )}
              {/* {stats && stats.total_orders > 0 && (
                <li className="flex items-center">
                  <Award className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{stats.total_orders} orders completed</span>
                </li>
              )} */}
              {seller.gst_number && (
                <li className="flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-gray-500" />
                  <span>GST: {seller.gst_number}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Business Information */}
          <div className="hidden md:block bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-foreground mb-3 flex items-center">
              <Award className="w-5 h-5 mr-2 text-blue-600" />
              Business Information
            </h3>

            {/* Business Type */}
            {seller.businessType && seller.businessType.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Business Type
                </h4>
                <div className="flex flex-wrap gap-2">
                  {seller.businessType.map((type, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="flex-1"
            size="lg"
            disabled={!seller.email}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Send Message
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            size="lg"
            asChild={!!seller.email}
            disabled={!seller.email}
          >
            {seller.email ? (
              <a href={`mailto:${seller.email}`}>
                <Mail className="w-4 h-4 mr-2" />
                Email Us
              </a>
            ) : (
              <span className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email Not Available
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Products Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="md:text-xl font-semibold text-foreground">
            Products ({products.length})
          </h2>
          {products.length > 4 && (
            <Link
              href={`/sellers/${slug}/products`}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              View all products
            </Link>
          )}
        </div>

        <SellerProducts products={products} />
      </div>
    </div>
  );
}
