
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// These environment variables will need to be set in your deployment environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sample data for demo purposes
export const sampleProducts = [
  {
    id: 1,
    name: "Men's Classic T-Shirt",
    price: 24.99,
    category: "Men",
    description: "A comfortable and versatile t-shirt that's perfect for everyday wear. Made from 100% cotton with a classic fit.",
    image_url: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "Men's Slim-Fit Jeans",
    price: 49.99,
    category: "Men",
    description: "Modern slim-fit jeans with a comfortable stretch. Perfect for both casual and semi-formal occasions.",
    image_url: "https://images.unsplash.com/photo-1604176424472-45cd9f9dda69?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "Women's Summer Dress",
    price: 39.99,
    category: "Women",
    description: "A lightweight, flowy summer dress with a floral pattern. Perfect for warm days and casual outings.",
    image_url: "https://images.unsplash.com/photo-1569315729857-219941162c57?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 4,
    name: "Women's Casual Blouse",
    price: 29.99,
    category: "Women",
    description: "A versatile blouse that can be dressed up or down. Features a comfortable fit and elegant design.",
    image_url: "https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

// Fetch products from Supabase
export const fetchProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) {
      console.error('Error fetching products:', error);
      // Fall back to sample data if there's an error
      return sampleProducts;
    }
    
    return data.length > 0 ? data : sampleProducts;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    // Fall back to sample data if there's an error
    return sampleProducts;
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
      // Filter sample data by category
      return sampleProducts.filter(product => product.category === category);
    }
    
    return data.length > 0 
      ? data 
      : sampleProducts.filter(product => product.category === category);
  } catch (error) {
    console.error(`Failed to fetch ${category} products:`, error);
    // Filter sample data by category
    return sampleProducts.filter(product => product.category === category);
  }
};

// Fetch a single product by ID
export const fetchProductById = async (productId: number) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();
    
    if (error) {
      console.error(`Error fetching product ${productId}:`, error);
      // Find product in sample data
      return sampleProducts.find(product => product.id === productId);
    }
    
    return data || sampleProducts.find(product => product.id === productId);
  } catch (error) {
    console.error(`Failed to fetch product ${productId}:`, error);
    // Find product in sample data
    return sampleProducts.find(product => product.id === productId);
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
      // Search in sample data
      return sampleProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    return data.length > 0 
      ? data 
      : sampleProducts.filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase())
        );
  } catch (error) {
    console.error('Failed to search products:', error);
    // Search in sample data
    return sampleProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }
};

// Fetch user profile
export const fetchUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }
};

// SQL for table creation:
/*
-- Create products table
CREATE TABLE public.products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  email TEXT,
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create cart table
CREATE TABLE public.cart (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sample data insertion
INSERT INTO public.products (name, price, category, description, image_url) VALUES
('Men''s Classic T-Shirt', 24.99, 'Men', 'A comfortable and versatile t-shirt that''s perfect for everyday wear. Made from 100% cotton with a classic fit.', 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'),
('Men''s Slim-Fit Jeans', 49.99, 'Men', 'Modern slim-fit jeans with a comfortable stretch. Perfect for both casual and semi-formal occasions.', 'https://images.unsplash.com/photo-1604176424472-45cd9f9dda69?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'),
('Women''s Summer Dress', 39.99, 'Women', 'A lightweight, flowy summer dress with a floral pattern. Perfect for warm days and casual outings.', 'https://images.unsplash.com/photo-1569315729857-219941162c57?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'),
('Women''s Casual Blouse', 29.99, 'Women', 'A versatile blouse that can be dressed up or down. Features a comfortable fit and elegant design.', 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3');
*/
