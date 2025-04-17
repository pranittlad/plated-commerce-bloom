
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { fetchProductsByCategory } from '@/lib/supabase';
import { Product } from '@/context/CartContext';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        if (category === 'men' || category === 'women') {
          const data = await fetchProductsByCategory(category === 'men' ? 'Men' : 'Women');
          setProducts(data);
        }
      } catch (error) {
        console.error(`Error fetching ${category} products:`, error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [category]);

  const categoryTitle = category === 'men' ? "Men's Collection" : "Women's Collection";
  const categoryDescription = category === 'men' 
    ? "Discover our latest styles for men. From casual to formal, we have everything you need to look your best."
    : "Explore our trendy collection for women. Find your perfect style from our range of elegant and casual wear.";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-gray-100 py-12">
          <div className="godhadya-container">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{categoryTitle}</h1>
            <p className="text-gray-600 max-w-2xl">{categoryDescription}</p>
          </div>
        </div>
        
        <div className="godhadya-container py-12">
          <ProductGrid 
            products={products}
            loading={loading}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
