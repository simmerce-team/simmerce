'use client';

import { Product } from "@/actions/products";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Images } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const {
    id,
    name,
    price,
    unit,
    moq,
    images = [],
    business,
    category,
    address,
  } = product;

  const primaryImage = images.find(img => img.is_primary) || images[0];
  const imageUrl = primaryImage?.url || Images.placeholder;

  const cardContent = (
    <Card className={`group overflow-hidden transition-all hover:shadow-md pt-0 ${className}`}>
      {/* Image Container - Fixed height to prevent oversized images */}
      <div className="relative h-32 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        <Image
          src={imageUrl}
          alt={primaryImage?.alt_text || name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Category badge */}
        {category && (
          <div className="absolute bottom-2 left-2">
            <Badge>
              {category.name}
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="px-4 py-0">
        <div className="space-y-3">          
          {/* Rating and Reviews */}
            <div className="space-y-2">
              {/* Business Info */}
              <div className="flex items-center space-x-2">
                {business?.logo_url && (
                  <div className="w-5 h-5 relative rounded-full overflow-hidden border border-slate-200">
                    <Image
                      src={business.logo_url}
                      alt={business.name}
                      fill
                      className="object-cover"
                      sizes="20px"
                    />
                  </div>
                )}
                <span className="text-xs font-medium text-slate-600 truncate">
                  {business?.name}
                </span>
              </div>
              
              {/* Product Name */}
              <h3 className="font-medium text-slate-900 line-clamp-2">
                {name}
              </h3>
              
              {/* Price */}
              <div className="flex items-baseline space-x-1">
                <span className="text-lg font-bold text-slate-900">
                  ₹{Number(price).toLocaleString()}
                </span>
                <span className="text-sm text-slate-500">/ {unit}</span>
              </div>
              
              {/* MOQ Information */}
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  MOQ: <span className="font-medium text-slate-700">
                    {moq.toLocaleString()} {unit}{moq > 1 ? 's' : ''}
                  </span>
                </div>
                
                {/* Price per MOQ */}
                <div className="text-xs font-medium text-slate-700">
                  ₹{(Number(price) * moq).toLocaleString()} min
                </div>
              </div>
              
              {/* Address */}
             {address && <div className="pt-2 text-xs text-slate-500 border-t border-slate-100 overflow-ellipsis">
                <span>{address}</span>
              </div>}
            </div>
        </div>
      </CardContent>
    </Card>
  );

  // Wrap with Link for navigation
  return (
    <Link 
      href={`/products/${id}`} 
      className="block group hover:scale-[1.02] transition-transform duration-300"
    >
      {cardContent}
    </Link>
  );
}
