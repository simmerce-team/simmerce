
import { EnquiryButton } from "@/components/product/enquiry-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

export const ProductHeader = ({ product }: { product: any }) => {
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
            ₹{product.price.toLocaleString()}
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
              {product.moq.toLocaleString()} {product.unit}
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
  );}