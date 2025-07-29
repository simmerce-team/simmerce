import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import Link from "next/link";

// Mock sellers data
const sellers = [
  {
    id: "1",
    name: "AquaTech Industries",
    rating: 4.8,
    totalProducts: 156,
    verified: true,
    description: "Leading B2B manufacturer of premium stainless steel products for corporate and industrial use.",
    location: "Mumbai, Maharashtra",
    businessType: "Manufacturer & Exporter",
    categories: ["Industrial Supplies", "Corporate Gifting"],
    avatar: "A"
  },
  {
    id: "2",
    name: "TechElectro Solutions",
    rating: 4.7,
    totalProducts: 234,
    verified: true,
    description: "Specialized in electronic components and industrial automation solutions for B2B clients.",
    location: "Bangalore, Karnataka",
    businessType: "Distributor & Supplier",
    categories: ["Electronics", "Automation"],
    avatar: "T"
  },
  {
    id: "3",
    name: "Textile World Enterprises",
    rating: 4.6,
    totalProducts: 189,
    verified: true,
    description: "Premium textile manufacturer serving fashion brands and corporate clients with bulk orders.",
    location: "Surat, Gujarat",
    businessType: "Manufacturer",
    categories: ["Textiles", "Fabrics"],
    avatar: "T"
  },
  {
    id: "4",
    name: "ChemPro Industries",
    rating: 4.5,
    totalProducts: 98,
    verified: true,
    description: "Industrial chemicals and raw materials supplier for manufacturing and processing industries.",
    location: "Pune, Maharashtra",
    businessType: "Supplier & Distributor",
    categories: ["Chemicals", "Raw Materials"],
    avatar: "C"
  },
  {
    id: "5",
    name: "MachineTech Works",
    rating: 4.9,
    totalProducts: 67,
    verified: true,
    description: "Heavy machinery and industrial equipment manufacturer for construction and manufacturing sectors.",
    location: "Chennai, Tamil Nadu",
    businessType: "Manufacturer",
    categories: ["Machinery", "Equipment"],
    avatar: "M"
  },
  {
    id: "6",
    name: "BuildMat Suppliers",
    rating: 4.4,
    totalProducts: 312,
    verified: true,
    description: "Construction materials and building supplies for large-scale projects and contractors.",
    location: "Delhi, NCR",
    businessType: "Supplier & Distributor",
    categories: ["Construction", "Building Materials"],
    avatar: "B"
  }
];

export default function SellersPage() {
  return (
    <div>
      <PageHeader
        title="Verified Suppliers"
        description="Connect with trusted B2B suppliers and manufacturers for your business needs"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Suppliers", href: "/sellers" }
        ]}
      />
      
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-semibold text-slate-800 mb-1">500+</div>
            <div className="text-sm text-slate-600">Verified Suppliers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-slate-800 mb-1">10K+</div>
            <div className="text-sm text-slate-600">Products</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-slate-800 mb-1">4.7</div>
            <div className="text-sm text-slate-600">Avg Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-slate-800 mb-1">95%</div>
            <div className="text-sm text-slate-600">Response Rate</div>
          </div>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sellers.map((seller) => (
            <Link
              key={seller.id}
              href={`/sellers/${seller.id}`}
              className="block group"
            >
              <div className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg transition-all duration-300 hover:border-slate-200">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center text-lg font-semibold text-red-600 border border-red-100">
                    {seller.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-slate-800 group-hover:text-red-600 transition-colors truncate">
                        {seller.name}
                      </h3>
                      {seller.verified && (
                        <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-50 text-xs flex-shrink-0">
                          ✓
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-slate-600 mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span>{seller.rating}</span>
                      <span className="mx-1">•</span>
                      <span>{seller.totalProducts} products</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span className="truncate">{seller.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                  {seller.description}
                </p>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {seller.categories.slice(0, 2).map((category, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-slate-200 text-slate-600 text-xs"
                    >
                      {category}
                    </Badge>
                  ))}
                  {seller.categories.length > 2 && (
                    <Badge
                      variant="outline"
                      className="border-slate-200 text-slate-500 text-xs"
                    >
                      +{seller.categories.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Business Type */}
                <div className="text-xs text-slate-500 mb-4">
                  {seller.businessType}
                </div>

                {/* Action Button */}
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium">
                  View Profile
                </Button>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <Button variant="outline" className="border-slate-200 hover:border-red-300 hover:bg-red-50 font-medium px-8">
            Load More Suppliers
          </Button>
        </div>
      </div>
    </div>
  );
}
