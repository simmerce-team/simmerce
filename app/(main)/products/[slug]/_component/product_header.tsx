import { Product } from "@/actions/product";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import dynamic from "next/dynamic";

const nfmt = new Intl.NumberFormat("en-IN");

// Defer client-only enquiry dialog and related code until interaction
const EnquiryButton = dynamic(
  () => import("@/components/product/enquiry-button").then((m) => m.EnquiryButton),
);

export const ProductHeader = ({ product }: { product: Product }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{product.name}</CardTitle>
          </div>
          <Badge variant="outline" className="hidden sm:flex">
            <Package className="w-4 h-4 mr-1" />
            {product.category?.name || "Uncategorized"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Pricing */}
        <div className="mb-2">
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="text-3xl font-bold text-slate-900">
              ₹{nfmt.format(product.price)}
            </span>
            <span className="text-lg text-slate-600">
              / {product.unit}
            </span>
          </div>

          <div className="space-y-2 text-sm text-slate-700">
            <p className="flex items-center">
              <span className="font-medium min-w-[120px]">
                Minimum Order:
              </span>
              <span>
                {nfmt.format(product.moq)} {product.unit}
              </span>
            </p>
          </div>
          
          {/* Enquiry Button */}
          {product.business && <EnquiryButton 
            productId={product.id}
            sellerId={product.business.id}
            productName={product.name}
          />}
        </div>
      </CardContent>
    </Card>
  );
}