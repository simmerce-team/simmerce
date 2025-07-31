'use server';

import { createClient } from '@/utils/supabase/server';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon_url: string | null;
  parent_id: string | null;
  created_at: string;
  subcategories?: Category[];
}

export interface Categories {
  id: string;
  name: string;
  icon_url: string | null;
  subcategories: Category[];
}

export async function fetchCategories(): Promise<Categories[]> {
  const supabase = await createClient();
  
  // Fetch all categories with their parent_id
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  // Separate parent categories (where parent_id is null) and subcategories
  const parentCategories = categories.filter(cat => !cat.parent_id);
  const subcategories = categories.filter(cat => !!cat.parent_id);

  // Map parent categories and attach their subcategories
  const categoriesWithSubcategories = parentCategories.map(parent => ({
    id: parent.id,
    name: parent.name,
    icon_url: parent.icon_url,
    subcategories: subcategories
      .filter(sub => sub.parent_id === parent.id)
      .map(sub => ({
        id: sub.id,
        name: sub.name,
        slug: sub.slug,
        icon_url: sub.icon_url,
        parent_id: sub.parent_id,
        created_at: sub.created_at
      }))
  }));
  

  return categoriesWithSubcategories;
}

export async function fetchHomeCategories(): Promise<Category[]> {
  const supabase = await createClient();
  
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .is('parent_id', null)
    .limit(10)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return categories || [];
}
