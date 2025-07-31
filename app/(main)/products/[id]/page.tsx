import { getProductById } from "@/actions/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Images } from "@/utils/constant";
import { formatRelative, subDays } from "date-fns";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Params = Promise<{ id: string }>;

const ProductDetailPage = async ({ params }: { params: Params }) => {
  const paramsData = await params;

  const product = await getProductById(paramsData.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50/30">
      <div className="container mx-auto px-6 max-w-7xl">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Product Image (Smaller) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-8">
              <div className="aspect-square relative p-8 bg-gradient-to-br from-slate-50/50 to-slate-100/30">
                <Image
                  src={product?.images?.[0]?.url || Images.placeholder}
                  alt={product?.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                  quality={90}
                />
              </div>
              
              {/* Image Gallery */}
              {product?.images?.length > 1 && <div className="p-4 border-t border-slate-100">
                <div className="flex space-x-3">
                  {product?.images?.map((img, index) => (
                    <div
                      key={index}
                      className="flex-1 aspect-square bg-slate-50 border border-slate-200 rounded-lg overflow-hidden cursor-pointer hover:border-red-300 transition-colors"
                    >
                      <Image
                        src={img?.url || Images.placeholder}
                        alt={`${product?.name} ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                  ))}
                </div>
              </div>}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product Header */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {product.name}
                </CardTitle>
                <CardDescription>
                  {formatRelative(subDays(new Date(), 3), new Date(product.created_at))}
                </CardDescription>
                
                {/* Action Icons */}
                {/* <CardAction>
                  <Button variant="outline" size="icon" className="border-slate-200 hover:border-red-300 hover:bg-red-50">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </CardAction> */}
              </CardHeader>

              <CardContent>
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
                      <p className="text-xl font-semibold text-slate-900">{product.moq.toLocaleString()}</p>
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
              </CardContent>
            </Card>

            {/* Seller Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              <h3 className="font-medium text-lg text-slate-800 mb-6 tracking-tight">Seller Information</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-red-600 text-lg">
                      {product.business?.name?.charAt(0)}
                    </span>
                  </div>
                  <span className="flex flex-col">
                    <h1>{product.business?.name}</h1>
                    <p className="text-sm text-slate-600">{product.business?.is_verified ? 'Verified' : 'Not Verified'}</p>
                  </span>
                </div>
                <Link href={`/sellers/${product.business?.id}`}>
                  <Button variant="outline" className="border-slate-200 hover:border-red-300 hover:bg-red-50">
                    View Profile
                  </Button>
                </Link>
              </div>
            </div>

            {/* Product Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h2 className="text-xl font-medium text-slate-800 mb-6 tracking-tight">Product Details</h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {product?.description}
                </p>  
              </div>

         
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
