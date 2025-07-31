import { createClient } from '@/utils/supabase/server';

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  unit: string;
  moq: number;
  stock_quantity: number;
  is_featured: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
  business_id: string;
  category_id: string;
  images: ProductImage[];
  business: Business | null;
  category: Category | null;
}

export interface ProductImage {
  id: string;
  url: string;
  alt_text: string | null;
  is_primary: boolean;
}

export interface Business {
  id: string;
  name: string;
  logo_url: string | null;
  is_verified: boolean;
  description: string | null;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  icon_url: string | null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();
  
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      business:businesses(id, name, logo_url, is_verified, description, created_at),
      category:categories(id, name, icon_url),
      images:product_images(id, url, alt_text, is_primary, display_order)
    `)
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  if (!product) return null;

  // Transform the data to match our Product interface
  return {
    ...product,
    price: Number(product.price),
    images: product.images || [],
    category: product.category || null,
    business: product.business ? {
      ...product.business,
      logo: product.business.logo_url
    } : null,
    description: product.description || '',
  };
}

export async function incrementProductViewCount(productId: string): Promise<void> {
  const supabase = await createClient();
  
  await supabase
    .from('products')
    .update({ view_count: supabase.rpc('increment') })
    .eq('id', productId);
}
