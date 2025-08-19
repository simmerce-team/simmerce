import { getProductById } from "@/actions/product";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailCard } from "./_component/detail_card";
import { ImageArea } from "./_component/image_area";
import { ProductHeader } from "./_component/product_header";
import { SellerCard } from "./_component/seller_card";

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
            <ProductHeader product={product} />

            {/* Product Details */}
            <DetailCard product={product} />

            {/* Seller Information */}
            <SellerCard product={product} />
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
