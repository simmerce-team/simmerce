import { getBusinessById, getBusinessProducts, getBusinessStats, type Business } from "@/actions/business";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Award, Building2, Calendar, Globe, Mail, MapPin, MessageCircle, PackageOpen, Phone, ShieldCheck, Star, Users } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SellerProducts } from "./seller-products";

type Params = Promise<{ id: string }>;

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), 'MMMM yyyy');
  } catch (e) {
    return dateString;
  }
};

export default async function SellerProfilePage({ params }: { params: Params }) {
  const { id } = await params;
  
  // Fetch business/seller data
  const business = await getBusinessById(id);
  if (!business) {
    notFound();
  }
  
  // Fetch business products
  const products = await getBusinessProducts(id);
  
  // Fetch business stats
  const stats = await getBusinessStats(id);
  
  // Extend Business type with additional computed properties
  type SellerData = Business & {
    memberSince: string | number;
    totalProducts: number;
    rating: string;
    businessType: string[];
    location: string;
  };

  // Format business data for display
  const seller: SellerData = {
    ...business,
    memberSince: business.created_at ? new Date(business.created_at).getFullYear() : 'N/A',
    totalProducts: stats?.total_products || 0,
    rating: stats?.avg_rating ? Number(stats.avg_rating).toFixed(1) : 'N/A',
    businessType: business.business_type ? [business.business_type.name] : [],
    location: business.city ? `${business.city.name}${business.city.state?.name ? `, ${business.city.state.name}` : ''}` : 'N/A',
    employees: business.employees || 'N/A',
    certifications: business.certifications || ['GST Registered'],
    categories: business.categories || []
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Seller Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
            {seller.name?.charAt(0) || 'B'}
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {seller.name}
                {seller.is_verified && (
                  <Badge variant="secondary" className="gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </Badge>
                )}
              </h1>
              {seller.gst_number && (
                <div className="flex items-center text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                  <span className="font-medium">GST:</span> {seller.gst_number}
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
                {seller.rating} ({stats?.total_reviews || 0} reviews) | {seller.totalProducts} products
              </div>
              {seller.businessType.length > 0 && (
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 mr-1" /> {seller.businessType.join(", ")}
                </div>
              )}
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" /> {seller.employees}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" /> Member since {seller.memberSince}
              </div>
            </div>
            
            {seller.description && (
              <div className="mt-4">
                <h3 className="font-medium text-gray-900 mb-1">About {seller.name}</h3>
                <p className="text-gray-700">{seller.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Business Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Contact Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Contact Information
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {seller.address && (
                <li className="flex items-start">
                  <MapPin className="w-4 h-4 mt-0.5 mr-2 text-gray-500 flex-shrink-0" />
                  <span>{seller.address ? seller.address + ", " + seller.location : 'Address not specified'}</span>
                </li>
              )}
              {seller.email && (
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                  <a href={`mailto:${seller.email}`} className="text-blue-600 hover:underline">
                    {seller.email}
                  </a>
                </li>
              )}
              {seller.website && (
                <li className="flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                  <a 
                    href={seller.website.startsWith('http') ? seller.website : `https://${seller.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline"
                  >
                    {seller.website.replace(/^https?:\/\//, '')}
                  </a>
                </li>
              )}
              {seller.phone && (
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-500" />
                  <a href={`tel:${seller.phone.replace(/\D/g, '')}`} className="text-blue-600 hover:underline">
                    {seller.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Business Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-blue-600" />
              Business Details
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
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
              {seller.employees && seller.employees !== 'N/A' && (
                <li className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-gray-500" />
                  <span>Employees: {seller.employees}</span>
                </li>
              )}
              {stats && stats.total_orders > 0 && (
                <li className="flex items-center">
                  <Award className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{stats.total_orders} orders completed</span>
                </li>
              )}
              {seller.gst_number && (
                <li className="flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-gray-500" />
                  <span>GST: {seller.gst_number}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Certifications & Categories */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <Award className="w-5 h-5 mr-2 text-blue-600" />
              Business Information
            </h3>
            
            {/* Certifications */}
            {seller.certifications && seller.certifications.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {seller.certifications?.map((cert: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Business Type */}
            {seller.businessType && seller.businessType.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Business Type</h4>
                <div className="flex flex-wrap gap-2">
                  {seller.businessType.map((type, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Stats */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Business Stats</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {stats?.total_products > 0 && (
                  <div className="flex items-center">
                    <span className="text-gray-600">Products:</span>
                    <span className="ml-2 font-medium">{stats.total_products}</span>
                  </div>
                )}
                {stats?.total_orders > 0 && (
                  <div className="flex items-center">
                    <span className="text-gray-600">Orders:</span>
                    <span className="ml-2 font-medium">{stats.total_orders}</span>
                  </div>
                )}
                {stats?.avg_rating > 0 && (
                  <div className="flex items-center">
                    <span className="text-gray-600">Rating:</span>
                    <span className="ml-2 font-medium">{Number(stats.avg_rating).toFixed(1)}/5</span>
                  </div>
                )}
                {stats?.response_rate > 0 && (
                  <div className="flex items-center">
                    <span className="text-gray-600">Response Rate:</span>
                    <span className="ml-2 font-medium">{stats.response_rate}%</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          {seller.phone && (
            <Button asChild className="flex-1" size="lg">
              <a href={`tel:${seller.phone.replace(/\D/g, '')}`}>
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
            </Button>
          )}
          <Button variant="outline" className="flex-1" size="lg" disabled={!seller.email}>
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
          <h2 className="text-xl font-semibold text-gray-900">Products ({products.length})</h2>
          {products.length > 4 && (
            <Link 
              href={`/sellers/${id}/products`} 
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              View all products
            </Link>
          )}
        </div>
        
        {products.length > 0 ? (
          <SellerProducts products={products} />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <PackageOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              This seller hasn't listed any products yet. Check back later for updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
