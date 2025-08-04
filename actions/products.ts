'use server';

import { createClient } from '@/utils/supabase/server';

export interface ProductImage {
  id: string;
  url: string;
  alt_text: string | null;
  is_primary: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  unit: string;
  moq: number;
  stock_quantity: number;
  address: string | null;
  created_at: string;
  images: ProductImage[];
  business: {
    id: string;
    name: string;
    logo_url: string | null;
  };
  category: {
    id: string;
    name: string;
  } | null;
}

export async function fetchFeaturedProducts(limit: number = 8): Promise<Product[]> {
  const supabase = await createClient();
  
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      business:businesses(id, name, logo_url, address),
      category:categories(id, name),
      images:product_images(id, url, alt_text, is_primary)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }

  // Transform the data to match our interface
  return (products || []).map(product => ({
    ...product,
    price: Number(product.price),
    images: product.images || [],
    category: product.category || null,
    address: product.business.address || null,
  }));
}


export async function fetchProductsByLocation(location: string, limit: number = 8): Promise<Product[]> {
  const supabase = await createClient();
  
  // First, get the city ID from the location name
  const { data: cityData, error: cityError } = await supabase
    .from('cities')
    .select('id')
    .ilike('name', `%${location}%`)
    .single();

  if (cityError || !cityData) {
    console.error('Error finding city:', cityError);
    return [];
  }

  // Then get businesses in that city
  const { data: businesses, error: businessesError } = await supabase
    .from('businesses')
    .select('id')
    .eq('city_id', cityData.id);

  if (businessesError || !businesses || businesses.length === 0) {
    console.error('Error finding businesses in city:', businessesError);
    return [];
  }

  const businessIds = businesses.map(b => b.id);

  // Finally, get products from those businesses
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select(`
      *,
      business:businesses(id, name, logo_url, is_verified, address),
      category:categories(id, name),
      images:product_images(id, url, alt_text, is_primary)
    `)
    .in('business_id', businessIds)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (productsError) {
    console.error('Error fetching products by location:', productsError);
    return [];
  }

  // Transform the data to match our interface
  return (products || []).map(product => ({
    ...product,
    price: Number(product.price),
    images: product.images || [],
    category: product.category || null,
    address: product.business.address || null,
  }));
}

export async function fetchProductsByCategory(category: string, limit: number = 8): Promise<Product[]> {
  const supabase = await createClient();
  
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select(`
      *,
      business:businesses(id, name, logo_url, is_verified, address),
      category:categories(id, name),
      images:product_images(id, url, alt_text, is_primary)
    `)
    .eq('category.name', category)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (productsError) {
    console.error('Error fetching products by category:', productsError);
    return [];
  }

  // Transform the data to match our interface
  return (products || []).map(product => ({
    ...product,
    price: Number(product.price),
    images: product.images || [],
    category: product.category || null,
    address: product.business.address || null,
  }));
}
