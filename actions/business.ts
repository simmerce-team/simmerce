import { createClient } from '@/utils/supabase/server';

export interface Business {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  gst_number: string | null;
  address: string | null;
  city_id: string | null;
  business_type_id: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  employees?: string | null;
  certifications?: string[] | null;
  categories?: string[] | null;
  city?: {
    id: string;
    name: string;
    state: {
      id: string;
      name: string;
    } | null;
  } | null;
  business_type?: {
    id: string;
    name: string;
  } | null;
}

export interface Businesses {
    id: string,
    name: string,
    gst_number?: string | null,
    verified: boolean,
    description: string,
    location: string,
    businessType: string,
    logo_url?: string | null
}

export async function getBusinessById(id: string): Promise<Business | null> {
  const supabase = await createClient();
  
  const { data: business, error } = await supabase
    .from('businesses')
    .select(`
      *,
      city:cities(id, name, state:states(id, name)),
      business_type:business_type_id (id, name)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching business:', error);
    return null;
  }

  return business;
}

export async function getBusinessProducts(businessId: string, limit: number = 4) {
  const supabase = await createClient();
  
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(id, name),
      images:product_images(id, url, alt_text, is_primary)
    `)
    .eq('business_id', businessId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching business products:', error);
    return [];
  }

  return (products || []).map(product => ({
    ...product,
    price: Number(product.price),
    images: product.images || [],
    category: product.category || null,
  }));
}

export async function getBusinessStats(businessId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase.rpc('get_business_metrics', {
    p_business_id: businessId
  });

  if (error) {
    console.error('Error fetching business stats:', error);
    return null;
  }

  return data;
}


export async function getBusinesses(limit: number = 8): Promise<Businesses[] | null> {
  const supabase = await createClient();
  
  const { data: businesses, error } = await supabase
    .from('businesses')
    .select(`
      *,
      city:cities(id, name, state:states(id, name)),
      business_type:business_type_id (id, name)
    `)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching businesses:', error);
    return null;
  }

  return (businesses || []).map(business => ({
    ...business,
    businessType: business.business_type?.name || 'Business',
    location: business.city ? `${business.city.name}${business.city.state?.name ? `, ${business.city.state.name}` : ''}` : 'Location not specified',
  }));
}
