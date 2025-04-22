
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import CategoryBanner from '@/components/CategoryBanner';
import CategoryFilters from '@/components/category/CategoryFilters';
import { useProducts } from '@/hooks/useProducts';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedSize, setSelectedSize] = useState<string>('all');
  
  const { products, isLoading, filterProducts } = useProducts(category);
  const filteredProducts = filterProducts(products, priceRange);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <CategoryBanner category={category as 'men' | 'women'} />
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters */}
            <CategoryFilters 
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />

            {/* Product Grid */}
            <div className="lg:col-span-3">
              <ProductGrid 
                products={filteredProducts}
                loading={isLoading && products.length === 0}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
