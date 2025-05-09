
import { supabase } from '@/integrations/supabase/client';
import type { Product } from '@/types/product';
import type { Profile } from '@/types/profile';

// Fetch products from Supabase
export const fetchProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    
    return data as Product[];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (category: string) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category);
    
    if (error) {
      console.error(`Error fetching ${category} products:`, error);
      return [];
    }
    
    return data as Product[];
  } catch (error) {
    console.error(`Failed to fetch ${category} products:`, error);
    return [];
  }
};

// Fetch a single product by ID
export const fetchProductById = async (productId: string) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();
    
    if (error) {
      console.error(`Error fetching product ${productId}:`, error);
      return null;
    }
    
    return data as Product | null;
  } catch (error) {
    console.error(`Failed to fetch product ${productId}:`, error);
    return null;
  }
};

// Search products by name
export const searchProducts = async (query: string) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .ilike('name', `%${query}%`);
    
    if (error) {
      console.error('Error searching products:', error);
      return [];
    }
    
    return data as Product[];
  } catch (error) {
    console.error('Failed to search products:', error);
    return [];
  }
};

// Fetch user profile
export const fetchUserProfile = async (userId: string) => {
  try {
    // Use rpc call to fetch profile
    const { data, error } = await supabase.rpc('get_profile', {
      user_id: userId
    });
    
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    // Cast data as a record first to ensure safe type access
    const profileData = data as Record<string, unknown>;
    
    // Create a properly typed Profile object
    const profile: Profile = {
      id: profileData.id as string,
      full_name: profileData.full_name as string | null,
      avatar_url: profileData.avatar_url as string | null,
      email: profileData.email as string | null,
      updated_at: profileData.updated_at as string
    };
    
    return profile;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }
};

