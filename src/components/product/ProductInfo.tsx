
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductInfoProps {
  name: string;
  price: number;
  description: string | null;
  category: string;
  onAddToCart: (e: React.MouseEvent) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ 
  name, 
  price, 
  description, 
  category, 
  onAddToCart 
}) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 line-clamp-1">
        {name}
      </h3>
      <p className="text-godhadya-500 font-bold mb-2">
        ${price.toFixed(2)}
      </p>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
        {description || 'No description available'}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {category}
        </span>
        <Button
          className="bg-godhadya-500 hover:bg-godhadya-600"
          size="sm"
          onClick={onAddToCart}
        >
          <ShoppingCart size={16} className="mr-1" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
