'use server';

import { createClient } from '@/utils/supabase/server';

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
}

export interface MegaMenuCategory {
  id: string;
  name: string;
  slug: string;
  subcategories: {
    id: string;
    name: string;
    slug: string;
  }[];
}

export async function fetchCategories(): Promise<Category[]> {
  const supabase = await createClient();
  
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, name, slug, parent_id')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return categories || [];
}

export async function fetchHomeCategories(): Promise<Category[]> {
  const supabase = await createClient();
  
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, name, slug, parent_id')
    .is('parent_id', null)
    .limit(10)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return categories || [];
}

export async function fetchMegaMenuCategories(): Promise<MegaMenuCategory[]> {
  const supabase = await createClient();

  // 1) Fetch top-level categories (parents)
  const { data: parents, error: parentsError } = await supabase
    .from('categories')
    .select('id, name, slug')
    .is('parent_id', null)
    .limit(10)
    .order('name', { ascending: true });

  if (parentsError) {
    console.error('Error fetching parent categories:', parentsError);
    return [];
  }

  if (!parents || parents.length === 0) {
    return [];
  }

  const parentIds = parents.map((p) => p.id);

  // 2) Fetch subcategories for those parents
  const { data: children, error: childrenError } = await supabase
    .from('categories')
    .select('id, name, slug, parent_id')
    .in('parent_id', parentIds)
    .order('name', { ascending: true });

  if (childrenError) {
    console.error('Error fetching subcategories:', childrenError);
  }

  // 3) Group children by parent_id
  const childrenByParent = new Map<string, { id: string; name: string; slug: string }[]>();
  (children || []).forEach((c) => {
    if (!c.parent_id) return;
    const list = childrenByParent.get(c.parent_id) || [];
    list.push({ id: c.id, name: c.name, slug: c.slug });
    childrenByParent.set(c.parent_id, list);
  });

  // 4) Build MegaMenuCategory[] with subcategories populated
  const megaMenuCategories: MegaMenuCategory[] = parents.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    subcategories: childrenByParent.get(p.id) || [],
  }));

  return megaMenuCategories;
}
