import { createClient } from '@/utils/supabase/server';
import { cache } from 'react';

export interface ProductImage {
  id: string;
  url: string;
  file_type: string;
  is_primary: boolean;
  display_order: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  specifications?: Record<string, any> | null;
  price: number;
  unit: string;
  moq: number;
  stock_quantity: number;
  view_count?: number;
  youtube_url: string | null;
  created_at: string;
  updated_at: string;
  business_id: string;
  category_id: string;
  files: ProductImage[];
  business: Business | null;
  category: _Category | null;
  is_active?: boolean;
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  city?: {
    id: string;
    name: string;
    state?: {
      id: string;
      name: string;
    };
  };
  created_at: string;
}

export interface _Category {
  id: string;
  name: string;
  icon_url: string | null;
}

export const getProductById = cache(async function getProductById(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      business:businesses(
        id, 
        name, 
        slug,
        created_at,
        city:cities(id, name, state:states(id, name))
      ),
      category:categories(id, name, icon_url),
      files:product_files(id, url, file_type, is_primary, display_order)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  if (!product) return null;

  // Format the address with city and state
  const formattedBusiness = product.business ? {
    ...product.business,
    address: [
      product.business.city?.name,
      product.business.city?.state?.name
    ].filter(Boolean).join(', '),
    created_at: product.business.created_at
  } : null;

  // Ensure primary files come first, then by display_order
  const sortedFiles = (product.files || []).slice().sort((a: { is_primary: any; display_order: any; }, b: { is_primary: any; display_order: any; }) => {
    if (a.is_primary !== b.is_primary) return a.is_primary ? -1 : 1;
    const ao = (a.display_order ?? Number.MAX_SAFE_INTEGER);
    const bo = (b.display_order ?? Number.MAX_SAFE_INTEGER);
    if (ao !== bo) return ao - bo;
    return 0;
  });

  return {
    ...product,
    price: Number(product.price),
    files: sortedFiles,
    category: product.category || null,
    business: formattedBusiness,
  };
});

export async function incrementProductViewCount(productId: string): Promise<void> {
  const supabase = await createClient();
  
  try {
    const { error } = await supabase.rpc('increment_product_views', {
      product_id: productId
    });
    
    if (error) {
      console.error('Error incrementing view count:', error);
      // Fallback to direct update if RPC fails
      await supabase
        .from('products')
        .update({ view_count: supabase.rpc('increment') })
        .eq('id', productId);
    }
  } catch (err) {
    console.error('Failed to increment view count:', err);
  }
}
