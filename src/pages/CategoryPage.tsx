
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { fetchProductsByCategory } from '@/lib/supabase';
import { Product } from '@/types/product';

// Sample products for Men's category
const menSampleProducts: Product[] = [
  {
    id: 'men-1',
    name: "Men's Classic Cotton T-Shirt",
    price: 29.99,
    category: 'Men',
    description: "Comfortable, breathable cotton t-shirt perfect for everyday wear.",
    image_url: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1lbnMlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
    created_at: new Date().toISOString()
  },
  {
    id: 'men-2',
    name: "Men's Slim Fit Jeans",
    price: 59.99,
    category: 'Men',
    description: "Modern slim fit jeans with stretch comfort technology.",
    image_url: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1lbnMlMjBqZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
    created_at: new Date().toISOString()
  },
  {
    id: 'men-3',
    name: "Men's Casual Button-Down Shirt",
    price: 45.99,
    category: 'Men',
    description: "Versatile button-down shirt that transitions from office to evening.",
    image_url: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVucyUyMHNoaXJ0fGVufDB8fDB8fHww",
    created_at: new Date().toISOString()
  },
  {
    id: 'men-4',
    name: "Men's Performance Running Shoes",
    price: 79.99,
    category: 'Men',
    description: "Lightweight running shoes with responsive cushioning.",
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    created_at: new Date().toISOString()
  },
  {
    id: 'men-5',
    name: "Men's Winter Parka Jacket",
    price: 129.99,
    category: 'Men',
    description: "Warm, waterproof parka with faux fur hood for winter protection.",
    image_url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFja2V0fGVufDB8fDB8fHww",
    created_at: new Date().toISOString()
  },
  {
    id: 'men-6',
    name: "Men's Business Suit",
    price: 199.99,
    category: 'Men',
    description: "Classic fit suit for professional settings and formal occasions.",
    image_url: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVucyUyMHN1aXR8ZW58MHx8MHx8fDA%3D",
    created_at: new Date().toISOString()
  }
];

// Sample products for Women's category
const womenSampleProducts: Product[] = [
  {
    id: 'women-1',
    name: "Women's Summer Floral Dress",
    price: 49.99,
    category: 'Women',
    description: "Lightweight floral dress, perfect for summer days.",
    image_url: "https://images.unsplash.com/photo-1623609163859-ca93c959b5b8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW5zJTIwZHJlc3N8ZW58MHx8MHx8fDA%3D",
    created_at: new Date().toISOString()
  },
  {
    id: 'women-2',
    name: "Women's High-Waisted Jeans",
    price: 65.99,
    category: 'Women',
    description: "Stretch high-waisted jeans with shaping technology.",
    image_url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amVhbnN8ZW58MHx8MHx8fDA%3D",
    created_at: new Date().toISOString()
  },
  {
    id: 'women-3',
    name: "Women's Knitted Sweater",
    price: 55.99,
    category: 'Women',
    description: "Soft knitted sweater for cozy autumn and winter days.",
    image_url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3dlYXRlcnxlbnwwfHwwfHx8MA%3D%3D",
    created_at: new Date().toISOString()
  },
  {
    id: 'women-4',
    name: "Women's Running Shoes",
    price: 89.99,
    category: 'Women',
    description: "Comfortable running shoes with enhanced arch support.",
    image_url: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tZW5zJTIwc2hvZXN8ZW58MHx8MHx8fDA%3D",
    created_at: new Date().toISOString()
  },
  {
    id: 'women-5',
    name: "Women's Leather Handbag",
    price: 79.99,
    category: 'Women',
    description: "Classic leather handbag with multiple compartments.",
    image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFuZGJhZ3xlbnwwfHwwfHx8MA%3D%3D",
    created_at: new Date().toISOString()
  },
  {
    id: 'women-6',
    name: "Women's Casual Blazer",
    price: 85.99,
    category: 'Women',
    description: "Versatile blazer that can be dressed up or down.",
    image_url: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tZW5zJTIwYmxhemVyfGVufDB8fDB8fHww",
    created_at: new Date().toISOString()
  }
];

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  
  // Try to fetch products from Supabase first
  const { data: supabaseProducts = [], isLoading } = useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProductsByCategory(category === 'men' ? 'Men' : 'Women'),
    enabled: category === 'men' || category === 'women'
  });

  // Determine which products to display - use sample products only if Supabase returns empty
  const products = supabaseProducts.length > 0 
    ? supabaseProducts 
    : (category === 'men' ? menSampleProducts : womenSampleProducts);

  const categoryTitle = category === 'men' ? "Men's Collection" : "Women's Collection";
  const categoryDescription = category === 'men' 
    ? "Discover our latest styles for men. From casual to formal, we have everything you need to look your best."
    : "Explore our trendy collection for women. Find your perfect style from our range of elegant and casual wear.";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-gray-100 dark:bg-gray-800 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {categoryTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              {categoryDescription}
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <ProductGrid 
            products={products}
            loading={isLoading && products.length === 0}
            title={`${categoryTitle} Products`}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
