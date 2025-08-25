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

  const baseSelect = `
      id, name, slug, price, unit, moq, created_at,
      business:businesses(name, city:cities(name, state:states(name))),
      category:categories!inner(name),
      files:product_files(url, is_primary, display_order)
    `;

  const buildQuery = () =>
    supabase
      .from("products")
      .select(baseSelect)
      .eq("is_active", true)
      .order("created_at", { ascending: false });

  let products: any[] | null = null;
  let error: any = null;

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.trim();
    // Two queries to avoid cross-table OR parsing issues
    const nameQuery = buildQuery().ilike("name", `%${q}%`).limit(limit);
    const categoryQuery = buildQuery()
      .filter("categories.name", "ilike", `%${q}%`)
      .limit(limit);

    const [nameRes, catRes] = await Promise.all([nameQuery, categoryQuery]);
    error = nameRes.error || catRes.error;

    // Merge and dedupe by id; prefer name matches first
    const byId = new Map<string, any>();
    for (const row of nameRes.data || []) byId.set(row.id, row);
    for (const row of catRes.data || []) if (!byId.has(row.id)) byId.set(row.id, row);
    products = Array.from(byId.values()).slice(0, limit);
  } else {
    const res = await buildQuery().limit(limit);
    error = res.error;
    products = res.data;
  }

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  // Transform the data to match our interface
  return (products || []).map((product) => {
    // Pick primary image if present; otherwise first by display_order; else undefined
    const files = (product as any).files as
      | { url: string; is_primary?: boolean; display_order?: number }[]
      | null;
    let image: string | undefined = undefined;
    if (files && files.length > 0) {
      const primary = files.find((f) => f.is_primary);
      if (primary) image = primary.url;
      else {
        const sorted = [...files].sort(
          (a, b) => (a.display_order ?? 999) - (b.display_order ?? 999)
        );
        image = sorted[0]?.url;
      }
    }

    return {
      ...product,
      price: Number((product as any).price),
      image,
      business: (product as any).business?.name || "",
      category: (product as any).category?.name || "",
      address: [
        (product as any).business?.city?.name,
        (product as any).business?.city?.state?.name,
      ]
        .filter(Boolean)
        .join(", "),
    } as ProductItem;
  });
}

export async function fetchProductsByLocation(
  city: string,
  limit: number = 8
): Promise<ProductItem[]> {
  const supabase = await createClient();

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select(
      `
    id, name, slug, price, unit, moq,
    business:businesses!inner(
      name,
      city:cities!inner(name, state:states(name))
    ),
    category:categories(name),
    files:product_files(url)
  `
    )
    .filter("businesses.cities.slug", "eq", city)
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
      category:categories!inner(name),
      files:product_files(url)
    `
    )
    .filter("categories.slug", "eq", category)
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
