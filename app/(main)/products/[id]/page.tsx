"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Images } from "@/utils/constant";
import { ArrowLeft, Check, MessageCircle, Share2, Shield, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

type Params = Promise<{ id: string }>;

const ProductDetailPage = ({ params }: { params: Params }) => {
  const paramsData = use(params);

  // Mock product data
  const product = {
    id: paramsData.id,
    title: "Premium Stainless Steel Water Bottle",
    price: 1299, // Price per unit
    unit: "piece",
    minOrderQuantity: 50,
    maxOrderQuantity: 10000,
    category: "Industrial Supplies",
    brand: "AquaTech Industries",
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    description:
      "High-quality stainless steel water bottles perfect for corporate gifting, bulk orders for offices, schools, and promotional events. Made from food-grade 304 stainless steel with double-wall insulation technology.",
    features: [
      "Food-grade 304 stainless steel construction",
      "Double-wall vacuum insulation keeps drinks hot/cold for hours",
      "Leak-proof design with secure cap mechanism",
      "BPA-free and eco-friendly alternative to plastic bottles",
      "Custom logo printing available for bulk orders",
      "Available in multiple colors and sizes",
      "Suitable for corporate gifting and promotional use",
      "Easy to clean and maintain"
    ],
    specifications: {
      material: "304 Stainless Steel",
      capacity: "500ml / 750ml / 1000ml",
      weight: "280g (500ml variant)",
      dimensions: "25cm x 7cm diameter",
      colors: "Silver, Black, Blue, Red, Green",
      customization: "Logo printing available",
      certification: "FDA approved, BPA-free",
      packaging: "Individual boxes, bulk packaging available"
    },
    seller: {
      id: "1",
      name: "Aqua Products India",
      rating: 4.7,
      responseRate: "98%",
      memberSince: 2020,
    },
    images: [Images.placeholder, Images.placeholder, Images.placeholder],
  };

  return (
    <div className="min-h-screen bg-slate-50/30">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-slate-600 mb-8">
          <Link
            href="/"
            className="inline-flex items-center hover:text-red-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Product Image (Smaller) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-8">
              <div className="aspect-square relative p-8 bg-gradient-to-br from-slate-50/50 to-slate-100/30">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                  quality={90}
                />
              </div>
              
              {/* Image Gallery */}
              <div className="p-4 border-t border-slate-100">
                <div className="flex space-x-3">
                  {product.images.slice(0, 3).map((img, index) => (
                    <div
                      key={index}
                      className="flex-1 aspect-square bg-slate-50 border border-slate-200 rounded-lg overflow-hidden cursor-pointer hover:border-red-300 transition-colors"
                    >
                      <Image
                        src={img}
                        alt={`${product.title} ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h1 className="text-xl font-medium text-slate-800 mb-4 tracking-tight leading-tight">
                    {product.title}
                  </h1>
                  
                  {/* Rating and Reviews */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 font-medium text-slate-800">{product.rating}</span>
                      <span className="text-slate-500 ml-1">({product.reviewCount} reviews)</span>
                    </div>
                    {product.inStock && (
                      <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-50">
                        ✓ In Stock
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Action Icons */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" className="border-slate-200 hover:border-red-300 hover:bg-red-50">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-4 mb-8">
                <div className="flex items-baseline space-x-4">
                  <span className="text-3xl font-semibold text-slate-900">₹{product.price.toLocaleString()}</span>
                  <span className="text-lg text-slate-600">per {product.unit}</span>
                </div>
                
                {/* Min Order Quantity */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-slate-800">Minimum Order Quantity</p>
                      <p className="text-sm text-slate-600">Start your bulk order today</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-semibold text-slate-900">{product.minOrderQuantity.toLocaleString()}</p>
                      <p className="text-sm text-slate-600">{product.unit}s</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Inquiry
                </Button>
                <Button variant="outline" className="flex-1 border-slate-200 hover:border-red-300 hover:bg-red-50 font-medium py-3">
                  Contact Seller
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">Verified Supplier</p>
                    <p className="text-slate-500 text-xs">Trusted B2B partner</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">Quality Assured</p>
                    <p className="text-slate-500 text-xs">ISO certified products</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">Bulk Orders</p>
                    <p className="text-slate-500 text-xs">Min {product.minOrderQuantity} {product.unit}s</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              <h3 className="font-medium text-lg text-slate-800 mb-6 tracking-tight">Seller Information</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-red-600 text-lg">
                      {product.seller.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-slate-800">{product.seller.name}</h4>
                      <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-50 text-xs">
                        Verified
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <span className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                        {product.seller.rating}
                      </span>
                      <span>{product.seller.responseRate} Response</span>
                      <span>Since {product.seller.memberSince}</span>
                    </div>
                  </div>
                </div>
                <Link href={`/sellers/${product.seller.id}`}>
                  <Button variant="outline" className="border-slate-200 hover:border-red-300 hover:bg-red-50">
                    View Profile
                  </Button>
                </Link>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Description & Features */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h2 className="text-xl font-medium text-slate-800 mb-6 tracking-tight">Product Details</h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {product.description}
                </p>
                
                <h3 className="font-medium text-slate-800 mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0 mt-1" />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h2 className="text-xl font-medium text-slate-800 mb-6 tracking-tight">Specifications</h2>
                <div className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-3 border-b border-slate-100 last:border-0"
                    >
                      <span className="text-slate-600 font-medium capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-slate-800 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
