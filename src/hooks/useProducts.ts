
import { useQuery } from '@tanstack/react-query';
import { fetchProductsByCategory } from '@/lib/supabase';
import { menSampleProducts, womenSampleProducts } from '@/data/sampleProducts';
import { Product } from '@/types/product';

export const useProducts = (category: string | undefined) => {
  const { data: supabaseProducts = [], isLoading } = useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProductsByCategory(category === 'men' ? 'Men' : 'Women'),
    enabled: category === 'men' || category === 'women'
  });

  const products = supabaseProducts.length > 0 
    ? supabaseProducts 
    : (category === 'men' ? menSampleProducts : womenSampleProducts);

  const filterProducts = (products: Product[], priceRange: number[]) => {
    return products.filter(product => 
      product.price >= priceRange[0] && 
      product.price <= priceRange[1]
    );
  };

  return {
    products,
    isLoading,
    filterProducts
  };
};
