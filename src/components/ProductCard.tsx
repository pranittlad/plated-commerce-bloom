
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';
import ProductImage from './product/ProductImage';
import ProductInfo from './product/ProductInfo';

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
        <ProductImage 
          imageUrl={product.image_url}
          name={product.name}
          price={product.price}
        />
        <ProductInfo 
          name={product.name}
          price={product.price}
          description={product.description}
          category={product.category}
          onAddToCart={handleAddToCart}
        />
      </Link>
    </div>
  );
};

export default ProductCard;
