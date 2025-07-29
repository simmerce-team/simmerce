import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/mock-data";
import { Award, Building2, Calendar, Globe, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Star, Users } from "lucide-react";
import { use } from "react";
import { SellerProducts } from "./seller-products";

type Params = Promise<{ id: string }>

const SellerProfilePage = ({ params }: { params: Params }) => {
  const paramsData = use(params)
  // Enhanced seller data with additional business details
  const seller = {
    id: paramsData.id,
    name: "Eyes Fashion House",
    rating: 4.7,
    totalProducts: 128,
    memberSince: 2023, // 1 year ago from 2024
    foundedYear: 2018,
    verified: true,
    gstNumber: "19ESNPS7018K2ZU",
    description: "Leading manufacturer of premium quality fashion products since 2018.",
    location: "Kolkata, West Bengal, India",
    address: "C/84 New Raipur Green View Road, Kolkata, West Bengal 700032, India",
    businessType: ["Manufacturer", "Supplier", "Wholesaler"],
    employees: "10",
    ceo: "Eyes Fashion Suvro",
    email: "info@eyefashion.com",
    website: "www.eyefashion.com",
    certifications: ["ISO 9001:2015", "GST Registered"],
    categories: ["Men's Fashion", "Women's Fashion", "Accessories"]
  };

  return (
    <div className="container mx-auto px-4">
      {/* Seller Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-500">
            {seller.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {seller.name}
                {seller.verified && (
                  <Badge variant="secondary" className="gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </Badge>
                )}
              </h1>
              <div className="flex items-center text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                <span className="font-medium">GST:</span> {seller.gstNumber}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
                {seller.rating} | {seller.totalProducts} products
              </div>
              <div className="flex items-center">
                <Building2 className="w-4 h-4 mr-1" /> {seller.businessType.join(", ")}
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" /> {seller.employees} Employees
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" /> Est. {seller.foundedYear}
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium text-gray-900 mb-1">About {seller.name}</h3>
              <p className="text-gray-700">{seller.description}</p>
            </div>
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
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mt-0.5 mr-2 text-gray-500 flex-shrink-0" />
                <span>{seller.address}</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                <a href={`mailto:${seller.email}`} className="text-blue-600 hover:underline">
                  {seller.email}
                </a>
              </li>
              <li className="flex items-center">
                <Globe className="w-4 h-4 mr-2 text-gray-500" />
                <a href={`https://${seller.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {seller.website}
                </a>
              </li>
              <li className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-gray-500" />
                <span>CEO: {seller.ceo}</span>
              </li>
            </ul>
          </div>

          {/* Business Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-blue-600" />
              Business Details
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <span>Established: {seller.foundedYear}</span>
              </li>
              <li className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-gray-500" />
                <span>Employees: {seller.employees}</span>
              </li>
              <li className="flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2 text-gray-500" />
                <span>Member Since: {seller.memberSince} ({new Date().getFullYear() - seller.memberSince} years)</span>
              </li>
              <li className="flex items-center">
                <Award className="w-4 h-4 mr-2 text-gray-500" />
                <span>GST: {seller.gstNumber}</span>
              </li>
            </ul>
          </div>

          {/* Certifications & Categories */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <Award className="w-5 h-5 mr-2 text-blue-600" />
              Certifications & Categories
            </h3>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {seller.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Business Categories</h4>
              <div className="flex flex-wrap gap-2">
                {seller.categories.map((category, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button className="flex-1" size="lg">
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </Button>
          <Button variant="outline" className="flex-1" size="lg">
            <MessageCircle className="w-4 h-4 mr-2" />
            Send Message
          </Button>
          <Button variant="outline" className="flex-1" size="lg">
            <Mail className="w-4 h-4 mr-2" />
            Email Us
          </Button>
        </div>
      </div>

      {/* Products Section */}
      <SellerProducts products={products} />
    </div>
  );
};

export default SellerProfilePage;
