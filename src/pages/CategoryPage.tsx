
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { fetchProductsByCategory } from '@/lib/supabase';
import { Product } from '@/types/product';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProductsByCategory(category === 'men' ? 'Men' : 'Women'),
    enabled: category === 'men' || category === 'women'
  });

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
            loading={isLoading}
            title={`${categoryTitle} Products`}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
