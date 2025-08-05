import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from './use-debounce';

export interface SearchResultItem {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  unit: string;
  image_url?: string | null;
}

// Function to search products in Supabase
async function searchProducts(query: string) {
  if (!query.trim()) return [];
  
  try {
    const supabase = createClient();
    if (!supabase) {
      console.error('Supabase client not initialized');
      return [];
    }
    
    console.log('Searching for:', query);
    
    // First, search in string fields
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, description, price, unit, product_images(url)')
      .or(`name.ilike.%${query}%`)
      .order('name', { ascending: true })
      .limit(10);

    if (error) {
      console.error('Supabase query error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return [];
    }

    console.log('Search results:', products);
    
    // Format the data to include the first image URL and handle JSONB description
    return (products || []).map(product => {
      // Handle JSONB description field
      let description = '';
      if (product.description) {
        try {
          // If it's a string that's actually JSON, parse it
          if (typeof product.description === 'string' && 
              (product.description.startsWith('{') || product.description.startsWith('['))) {
            const parsed = JSON.parse(product.description);
            // If it's an object, convert to string, otherwise use as is
            description = typeof parsed === 'object' ? JSON.stringify(parsed) : String(parsed);
          } else {
            // It's a regular string
            description = String(product.description);
          }
        } catch (e) {
          console.error('Error parsing description:', e);
          description = String(product.description);
        }
      }
      
      return {
        ...product,
        description,
        image_url: product.product_images?.[0]?.url || null
      };
    });
    
  } catch (error) {
    console.error('Error in searchProducts:', error);
    return [];
  }
}

export function useSearch(query: string) {
  const debouncedQuery = useDebounce(query.trim(), 300);
  const isSearching = debouncedQuery.length > 0;

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['search-products', debouncedQuery],
    queryFn: () => searchProducts(debouncedQuery),
    enabled: isSearching,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (error) {
    console.error('Search query error:', error);
  }

  return {
    products,
    isLoading,
    isSearching
  };
}
