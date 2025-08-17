import { getBusinesses } from "@/actions/business";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Link from "next/link";

export default async function SellersPage() {
  const businesses = await getBusinesses();

  if (!businesses) {
    return (
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <p className="text-center text-slate-600">No suppliers found.</p>
      </div>
    );
  }

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
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
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
        </div> */}

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businesses.map((seller) => (
            <Link
              key={seller.id}
              href={`/sellers/${seller.slug}`}
              className="block group"
            >
              <div className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg transition-all duration-300 hover:border-slate-200">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center text-lg font-semibold text-red-600 border border-red-100">
                    {seller.name.charAt(0).toUpperCase()}
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
                    <div className="flex items-center text-xs text-slate-600 mb-2">
                      {/* <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" /> */}
                      {/* <span>{seller.rating}</span>
                      <span className="mx-1">•</span> */}
                      <span>{seller.gst_number ?? 'GST Not Registered'}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span className="truncate">{seller.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                  {seller.description?.slice(0, 100)}
                </p>

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
