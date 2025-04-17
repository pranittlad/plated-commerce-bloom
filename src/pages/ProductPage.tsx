
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuantitySelector from '@/components/QuantitySelector';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchProductById } from '@/lib/supabase';
import { Product, useCart } from '@/context/CartContext';
import { ShoppingCart, ArrowLeft, Check } from 'lucide-react';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        if (productId) {
          const data = await fetchProductById(parseInt(productId));
          setProduct(data || null);
        }
      } catch (error) {
        console.error(`Error fetching product ${productId}:`, error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="godhadya-container py-8">
          <Link 
            to={product?.category === 'Men' ? '/men' : '/women'} 
            className="inline-flex items-center text-godhadya-500 hover:text-godhadya-600 mb-6"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to {product?.category || 'products'}
          </Link>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="w-full h-[500px] rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="pt-6">
                  <Skeleton className="h-10 w-1/3" />
                </div>
                <div className="pt-4">
                  <Skeleton className="h-12 w-full rounded" />
                </div>
              </div>
            </div>
          ) : product ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="w-full h-[500px] object-cover object-center"
                />
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                <p className="text-2xl font-bold text-godhadya-500 mb-4">${product.price.toFixed(2)}</p>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Description</h2>
                  <p className="text-gray-600">{product.description || 'No description available.'}</p>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Category</h2>
                  <Link 
                    to={product.category === 'Men' ? '/men' : '/women'}
                    className="inline-block bg-gray-100 px-3 py-1 rounded-full text-gray-800 hover:bg-gray-200 transition-colors"
                  >
                    {product.category}
                  </Link>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Quantity</h2>
                  <QuantitySelector
                    quantity={quantity}
                    onIncrease={() => setQuantity(prev => prev + 1)}
                    onDecrease={() => setQuantity(prev => Math.max(1, prev - 1))}
                  />
                </div>
                
                <Button 
                  onClick={handleAddToCart} 
                  className={`w-full ${addedToCart ? 'bg-green-500 hover:bg-green-600' : 'bg-godhadya-500 hover:bg-godhadya-600'}`}
                  size="lg"
                >
                  {addedToCart ? (
                    <>
                      <Check size={20} className="mr-2" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} className="mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
              <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
              <Link 
                to="/"
                className="inline-block bg-godhadya-500 hover:bg-godhadya-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
              >
                Back to Homepage
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
