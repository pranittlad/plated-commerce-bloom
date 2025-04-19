
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { searchProducts } from '@/lib/supabase';
import { Product } from '@/types/product';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        setLoading(true);
        if (query) {
          const results = await searchProducts(query);
          setProducts(results);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setLoading(false);
      }
    };

    getSearchResults();
  }, [query]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-gray-100 py-8">
          <div className="godhadya-container">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {query ? `Search Results for "${query}"` : 'Search Products'}
            </h1>
            {query && (
              <p className="text-gray-600 mt-2">
                Found {products.length} result{products.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
        
        <div className="godhadya-container py-8">
          {query ? (
            <ProductGrid 
              products={products}
              loading={loading}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Enter a search term to find products.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
