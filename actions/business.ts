import { createClient } from "@/utils/supabase/server";
import { ProductItem } from "./products";

export interface Business {
  id: string;
  name: string;
  description?: string | null;
  gst_number?: string | null;
  created_at: string;
  updated_at: string;
  email?: string | null;
  phone?: string | null;
  city: {
    id: string;
    name: string;
    state: {
      id: string;
      name: string;
    };
  };
  business_type: {
    id: string;
    name: string;
  };
}

export async function getBusinessById(slug: string): Promise<Business | null> {
  const supabase = await createClient();

  const { data: business, error } = await supabase
    .from("businesses")
    .select(
      `
      *,
      city:cities(id, name, state:states(id, name)),
      business_type:business_type_id (id, name)
    `
    )
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching business:", error);
    return null;
  }

  return business;
}

export async function getBusinessProducts(
  businessId: string,
  limit: number = 4
):Promise<ProductItem[]> {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select(
      `
      id, name, slug, price, unit, moq,
      business:businesses(name, city:cities(name, state:states(name))),
      category:categories(name),
      files:product_files(url)
    `
    )
    .eq("business_id", businessId)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching business products:", error);
    return [];
  }

  return (products || []).map((product) => ({
    ...product,
    price: Number(product.price),
    image: product.files?.[0]?.url,
    business: (product.business as any)?.name || "",
    category: (product.category as any)?.name || "",
    address: [
      (product.business as any)?.city?.name,
      (product.business as any)?.city?.state?.name,
    ]
      .filter(Boolean)
      .join(", "),
  }));
}