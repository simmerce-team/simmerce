import { getProductById } from "@/actions/product";
import { EnquiryButton } from "@/components/product/enquiry-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import {
  Building2,
  Calendar,
  MapPin,
  Package,
  XCircle
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageArea } from "./_component/image_area";

type Params = Promise<{ slug: string }>;

// Re-validate the page every 60 seconds
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const slug = (await params).slug;

  try {
    const product = await getProductById(slug);
    if (!product) {
      return {
        title: "Product Not Found | Simmerce",
        description:
          "The product you're looking for doesn't exist or has been removed.",
      };
    }

    return {
      title: `${product.name} | Simmerce`,
      description: product.description
        ? String(product.description).substring(0, 160)
        : `Explore ${product.name} on Simmerce`,
      openGraph: {
        images: [
          {
            url: product.files?.[0]?.url || "/placeholder-product.jpg",
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Product | Simmerce",
      description: "Explore this product on Simmerce",
    };
  }
}

const ProductDetailPage = async ({ params }: { params: Params }) => {
  const slug = (await params).slug;

  let product;

  try {
    product = await getProductById(slug);
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <ErrorState
        title="Error Loading Product"
        message="There was an error loading this product. Please try again later."
      />
    );
  }

  if (!product) {
    notFound();
  }

  // const features = [
  //   {
  //     icon: <Truck className="w-5 h-5" />,
  //     text: "Free shipping on orders over ₹10,000",
  //   },
  //   { icon: <Shield className="w-5 h-5" />, text: "Secure payment options" },
  //   { icon: <Package className="w-5 h-5" />, text: "Genuine products" },
  //   { icon: <Clock className="w-5 h-5" />, text: "Fast delivery" },
  // ];

  // const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/products/${slug}`;
  const memberSince = product.business?.created_at
    ? new Date(product.business.created_at).getFullYear()
    : null;

  return (
    <div className="min-h-screen bg-slate-50/30 py-4 md:py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Product Images */}
          <div className="lg:col-span-1 space-y-6">
            <ImageArea product={product} />

            {/* Features */}
            {/* <Card className="hidden md:block">
              <CardContent className="p-6 space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="text-primary mt-0.5">{feature.icon}</span>
                    <span className="text-sm text-slate-700">
                      {feature.text}
                    </span>
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
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{product.name}</CardTitle>
                    {product.business?.address && (
                      <CardDescription className="mt-1 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {product.business.address}
                      </CardDescription>
                    )}
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
                    {product.updated_at && (
                      <p className="flex items-center text-slate-500 text-xs mt-2">
                        <Calendar className="w-3 h-3 mr-1" />
                        Updated{" "}
                        {formatDistanceToNow(new Date(product.updated_at), {
                          addSuffix: true,
                        })}
                      </p>
                    )}
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

            {/* Product Details */}
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent>
                {product.description ? (
                  typeof product.description === "string" ? (
                    <div
                      className="prose prose-slate max-w-none"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  ) : (
                    <div className="space-y-3">
                      {Object.entries(product.description).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex gap-4 py-2 border-b border-slate-100 last:border-0 last:pb-0"
                          >
                            <span className="font-medium text-slate-700 min-w-[120px]">
                              {key}:
                            </span>
                            <span className="text-slate-600">
                              {String(value)}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  )
                ) : (
                  <p className="text-slate-500 italic">
                    No description available for this product.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Seller Information */}
            <Card>
              <CardHeader>
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
          </div>
        </div>
      </div>
    </div>
  );
};

// Error state component
function ErrorState({ title, message }: { title: string; message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/30 p-4">
      <div className="text-center max-w-md w-full">
        <div className="mx-auto w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <XCircle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">{title}</h1>
        <p className="text-slate-600 mb-6">{message}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
