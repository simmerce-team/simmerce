import { getProductById } from "@/actions/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Images } from "@/utils/constant";
import { CheckCircle, Clock, MessageCircle, Package, Share2, Shield, Truck } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";

type Params = Promise<{ id: string }>;

export async function generateMetadata(
  { params }: { params: Params; },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: `${product?.name} | Simmerce`,
    description: product?.description?.substring(0, 160) || 'Explore this product on Simmerce',
    openGraph: {
      images: [product?.images?.[0]?.url || Images.placeholder, ...previousImages],
    },
  }
}

const ProductDetailPage = async ({ params }: { params: Params }) => {
  const paramsData = await params;
  const product = await getProductById(paramsData.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50/30">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-2xl font-semibold text-slate-800 mb-2">Product Not Found</h1>
          <p className="text-slate-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const features = [
    { icon: <Truck className="w-5 h-5" />, text: 'Free shipping on orders over ₹10,000' },
    { icon: <Shield className="w-5 h-5" />, text: 'Secure payment options' },
    { icon: <Package className="w-5 h-5" />, text: 'Genuine products' },
    { icon: <Clock className="w-5 h-5" />, text: 'Fast delivery' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/30 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Product Images */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="aspect-square relative bg-gradient-to-br from-slate-50/50 to-slate-100/30">
                <Image
                  src={product?.images?.[0]?.url || Images.placeholder}
                  alt={product?.name}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
              </div>
              
              {/* Image Gallery */}
              {product?.images?.length > 1 && (
                <div className="p-4 border-t border-slate-100">
                  <h3 className="text-sm font-medium text-slate-700 mb-3">More Views</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {product.images.map((img, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-slate-50 border border-slate-200 rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors"
                      >
                        <Image
                          src={img?.url || Images.placeholder}
                          alt={`${product?.name} ${index + 1}`}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            {/* <Card>
              <CardContent className="p-6 space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="text-primary mt-0.5">{feature.icon}</span>
                    <span className="text-sm text-slate-700">{feature.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card> */}
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Header */}
            <Card>
              <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-900">
                      {product.name}
                    </CardTitle>
                    <CardDescription>
                        {product.business?.address}
                    </CardDescription>
                    {/* <div className="flex items-center mt-1 space-x-2">
                      <div className="flex items-center bg-amber-50 text-amber-700 text-xs font-medium px-2 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-1" />
                        <span>4.8</span>
                        <span className="text-amber-600 ml-1">(24 reviews)</span>
                      </div>
                      <span className="text-sm text-slate-500">
                        Listed {formatRelative(subDays(new Date(product.created_at), 0), new Date())}
                      </span>
                    </div> */}
              </CardHeader>

              <CardContent className="pt-0">
                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline space-x-2 mb-2">
                    <span className="text-3xl font-bold text-slate-900">₹{product.price.toLocaleString()}</span>
                    <span className="text-lg text-slate-600">/ {product.unit}</span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-slate-700">
                    <p className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      In Stock ({product.stock_quantity.toLocaleString()} {product.unit} available)
                    </p>
                    <p>
                      <span className="font-medium">Minimum Order:</span> {product.moq.toLocaleString()} {product.unit}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1 text-base">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Send Inquiry
                  </Button>
                  <Button variant="outline" className="flex-1 text-base">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-slate-700">
                  {product.description ? (
                    <p className="whitespace-pre-line">{product.description}</p>
                  ) : (
                    <p className="text-slate-500 italic">No description available for this product.</p>
                  )}
                </div>
                
                {/* Specifications */}
                <div className="mt-6 border-t border-slate-100 pt-6">
                  <h3 className="font-medium text-slate-900 mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm"><span className="text-slate-500">Category:</span> <span className="font-medium">{product.category?.name || 'N/A'}</span></p>
                      <p className="text-sm"><span className="text-slate-500">Unit:</span> <span className="font-medium">{product.unit}</span></p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="text-slate-500">MOQ:</span> <span className="font-medium">{product.moq.toLocaleString()} {product.unit}</span></p>
                      <p className="text-sm"><span className="text-slate-500">Stock:</span> <span className="font-medium">{product.stock_quantity.toLocaleString()} {product.unit} available</span></p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Information */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-semibold text-primary">
                        {product.business?.name?.charAt(0) || 'B'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{product.business?.name || 'Business Name'}</h3>
                      <div className="flex items-center space-x-3">
                        {product.business?.is_verified && (
                          <span className="inline-flex items-center text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded">
                            <Shield className="w-3 h-3 mr-1" /> Verified Seller
                          </span>
                        )}
                        {/* <div className="flex items-center text-xs text-slate-600">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" />
                          4.8 (24 reviews)
                        </div> */}
                      </div>
                      <p className="text-sm text-slate-600 mt-1">Member since {new Date(product.business?.created_at || new Date()).getFullYear()}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:ml-auto">
                    <Link href={`/sellers/${product.business?.id}`} className="w-full sm:w-auto">
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Products (Placeholder) */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Similar Products</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white rounded-lg border border-slate-200 p-3 hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-slate-100 rounded-md mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
