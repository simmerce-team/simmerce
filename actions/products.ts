"use server";

import { createClient } from "@/utils/supabase/server";

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  unit: string;
  moq: number;
  address: string;
  image?: string;
  business: string;
  category: string;
}

export async function fetchFeaturedProducts(
  limit: number = 8,
  searchQuery?: string
): Promise<ProductItem[]> {
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select(
      `
      id, name, slug, price, unit, moq,
      business:businesses(name, city:cities(name, state:states(name))),
      category:categories(name),
      files:product_files(url)
    `
    )
    .eq("is_active", true)
    .eq("product_files.is_primary", true);

  // Add search condition if searchQuery is provided
  if (searchQuery && searchQuery.trim()) {
    query = query.ilike("name", `%${searchQuery.trim()}%`);
  }

  const { data: products, error } = await query
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  // Transform the data to match our interface
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

export async function fetchProductsByLocation(
  location: string,
  limit: number = 8
): Promise<ProductItem[]> {
  const supabase = await createClient();

  // First, get the city ID from the location name
  const { data: cityData, error: cityError } = await supabase
    .from("cities")
    .select("id")
    .ilike("name", `%${location}%`)
    .single();

  if (cityError || !cityData) {
    console.error("Error finding city:", cityError);
    return [];
  }

  // Then get businesses in that city
  const { data: businesses, error: businessesError } = await supabase
    .from("businesses")
    .select("id")
    .eq("city_id", cityData.id);

  if (businessesError || !businesses || businesses.length === 0) {
    console.error("Error finding businesses in city:", businessesError);
    return [];
  }

  const businessIds = businesses.map((b) => b.id);

  // Finally, get products from those businesses
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select(
      `
      id, name, slug, price, unit, moq,
      business:businesses(name, city:cities(name, state:states(name))),
      category:categories(name),
      files:product_files(url)
    `
    )
    .in("business_id", businessIds)
    .eq("is_active", true)
    .eq("product_files.is_primary", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (productsError) {
    console.error("Error fetching products by location:", productsError);
    return [];
  }

  // Transform the data to match our interface
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

export async function fetchProductsByCategory(
  category: string,
  limit: number = 8
): Promise<ProductItem[]> {
  const supabase = await createClient();

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select(
      `
      id, name, slug, price, unit, moq,
      business:businesses(name, city:cities(name, state:states(name))),
      category:categories(name),
      files:product_files(url)
    `
    )
    .eq("category.name", category)
    .eq("is_active", true)
    .eq("product_files.is_primary", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (productsError) {
    console.error("Error fetching products by category:", productsError);
    return [];
  }

  // Transform the data to match our interface
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
