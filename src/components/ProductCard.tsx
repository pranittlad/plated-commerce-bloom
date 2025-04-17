
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="product-card group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="product-img group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-sm font-medium">{product.name}</p>
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
          <p className="text-godhadya-500 font-bold mb-2">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 text-sm mb-4">
            {product.description ? 
              (product.description.length > 70 ? 
                `${product.description.substring(0, 70)}...` : 
                product.description) : 
              'No description available'}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">{product.category}</span>
            <Button
              className="bg-godhadya-500 hover:bg-godhadya-600"
              size="sm"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} className="mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
