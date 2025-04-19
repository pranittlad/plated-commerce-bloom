
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ProductGrid from '@/components/ProductGrid';
import { fetchProducts } from '@/lib/supabase';
import { Product } from '@/types/product';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        <div className="godhadya-container py-12">
          <ProductGrid 
            products={products}
            loading={loading}
            title="Featured Products"
          />
          
          <section className="my-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-godhadya-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-godhadya-600">Men's Collection</h2>
                <p className="text-gray-700 mb-6">
                  Discover our latest collection for men. From casual wear to formal attire, we have everything you need to stay stylish.
                </p>
                <a 
                  href="/men" 
                  className="inline-block bg-godhadya-500 hover:bg-godhadya-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                >
                  Explore Men's Collection
                </a>
              </div>
              
              <div className="bg-godhadya-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-godhadya-600">Women's Collection</h2>
                <p className="text-gray-700 mb-6">
                  Explore our trendy collection for women. From elegant dresses to casual tops, find your perfect style.
                </p>
                <a 
                  href="/women" 
                  className="inline-block bg-godhadya-500 hover:bg-godhadya-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                >
                  Explore Women's Collection
                </a>
              </div>
            </div>
          </section>
          
          <section className="my-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Godhadya?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-godhadya-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-godhadya-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
                <p className="text-gray-600">We source our products from the best manufacturers to ensure high quality.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-godhadya-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-godhadya-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
                <p className="text-gray-600">Get the best value for your money with our competitive pricing.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-godhadya-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-godhadya-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-4.9-6.8M13 8V4m0 4h4m-4 0h-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
                <p className="text-gray-600">We deliver your orders quickly and efficiently to your doorstep.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
