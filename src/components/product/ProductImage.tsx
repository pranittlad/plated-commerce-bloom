
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ProductImageProps {
  imageUrl: string;
  name: string;
  price: number;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, name, price }) => {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <img 
        src={imageUrl} 
        alt={name}
        loading="lazy"
        className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute top-2 right-2">
        <Badge variant="secondary" className="bg-white/80 text-black">
          New Arrival
        </Badge>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-sm font-medium line-clamp-2">{name}</p>
        <p className="text-lg font-bold">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductImage;
