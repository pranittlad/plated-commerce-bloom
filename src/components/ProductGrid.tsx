
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/context/CartContext';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading = false, title }) => {
  // Create an array of numbers for skeleton loading
  const skeletons = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div className="my-8">
      {title && <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          // Skeleton loading state
          skeletons.map((index) => (
            <div key={index} className="product-card">
              <Skeleton className="h-64 w-full rounded-t-lg" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-8 w-1/3 rounded" />
                </div>
              </div>
            </div>
          ))
        ) : (
          // Actual product cards
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
