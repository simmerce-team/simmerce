import { getProductById } from "@/actions/product";
import { Metadata } from "next";
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
        alternates: { canonical: `/products/${slug}` },
      };
    }

    return {
      title: `${product.name} | Simmerce`,
      description: product.description
        ? String(product.description).substring(0, 160)
        : `Explore ${product.name} on Simmerce`,
      alternates: { canonical: `/products/${slug}` },
      openGraph: {
        url: `/products/${slug}`,
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
      alternates: { canonical: `/products/${slug}` },
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
    throw error;
  }

  if (!product) {
    notFound();
  }

  // Construct canonical URL and JSON-LD schema
  const canonicalPath = `/products/${slug}`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? ""}${canonicalPath}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.files?.[0]?.url ? [product.files[0].url] : undefined,
    description: product.description ?? undefined,
    brand: product.business?.name
      ? { "@type": "Brand", name: product.business.name }
      : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      url: canonicalUrl || canonicalPath,
      availability:
        (product as any).stock_quantity > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

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
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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

export default ProductDetailPage;
