'use server';

import { createClient } from '@/utils/supabase/server';

export interface City {
  id: string;
  name: string;
  state: string | null;
  country: string;
  created_at: string;
}

export interface CityWithBusinessCount {
  id: string;
  name: string;
  businessCount: number;
}

export async function fetchCities(): Promise<City[]> {
  const supabase = await createClient();
  
  const { data: cities, error } = await supabase
    .from('cities')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching cities:', error);
    return [];
  }

  return cities || [];
}

export async function fetchCityWithBusinessCount(): Promise<CityWithBusinessCount[]> {
  const supabase = await createClient();
  
  const { data: cities, error } = await supabase
    .from('cities')
    .select('id, name, businesses(id)')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching cities:', error);
    return [];
  }

  return cities.map(city => ({
    id: city.id,
    name: city.name,
    businessCount: city.businesses.length
  })) || [];
}

