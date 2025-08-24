import { Product } from "@/actions/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Calendar, MapPin } from "lucide-react";
import Link from "next/link";

export const SellerCard = ({ product }: { product: Product }) => {
  const memberSince = product.business?.created_at
    ? new Date(product.business.created_at).getFullYear()
    : null;

  return (
    <Card>
      <CardHeader className="border-b border-slate-100">
        <CardTitle>Seller Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-lg text-slate-900">
                {product.business?.name || "Business Name"}
              </h3>
              <div className="mt-1 space-y-1">
                {product.business?.address && (
                  <p className="text-sm text-slate-600 flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                    <span className="truncate max-w-[200px]">
                      {product.business.address}
                    </span>
                  </p>
                )}
                {memberSince && (
                  <p className="text-sm text-slate-500 flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                    Member since {memberSince}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:self-center">
            <Link
              href={`/sellers/${product.business?.slug || "#"}`}
              className="w-full sm:w-auto"
            >
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
