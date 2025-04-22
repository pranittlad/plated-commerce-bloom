import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import CategoryBanner from '@/components/CategoryBanner';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { fetchProductsByCategory } from '@/lib/supabase';
import { Product } from '@/types/product';

// Sample products for Men's category
const menSampleProducts: Product[] = [
  {
    id: 'men-1',
    name: "Men's Classic Cotton T-Shirt",
    price: 29.99,
    category: 'Men',
    description: "Comfortable, breathable cotton t-shirt perfect for everyday wear.",
    image_url: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1lbnMlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
    created_at: new Date().toISOString()
  },
  {
    id: 'men-2',
    name: "Men's Slim Fit Jeans",
    price: 59.99,
    category: 'Men',
    description: "Modern slim fit jeans with stretch comfort technology.",
    image_url: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1lbnMlMjBqZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
    created_at: new Date().toISOString()
  },
  {
    id: 'men-3',
    name: "Men's Casual Button-Down Shirt",
    price: 45.99,
    category: 'Men',
    description: "Versatile button-down shirt that transitions from office to evening.",
    image_url: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVucyUyMHNoaXJ0fGVufDB8fDB8fHww",
    created_at: new Date().toISOString()
  },
  {
    id: 'men-4',
    name: "Men's Performance Running Shoes",
    price: 79.99,
    category: 'Men',
    description: "Lightweight running shoes with responsive cushioning.",
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    created_at: new Date().toISOString()
  },
  {
    id: 'men-5',
    name: "Men's Winter Parka Jacket",
    price: 129.99,
    category: 'Men',
    description: "Warm, waterproof parka with faux fur hood for winter protection.",
    image_url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFja2V0fGVufDB8fDB8fHww",
    created_at: new Date().toISOString()
  },
  {
    id: 'men-6',
    name: "Men's Business Suit",
    price: 199.99,
    category: 'Men',
    description: "Classic fit suit for professional settings and formal occasions.",
    image_url: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVucyUyMHN1aXR8ZW58MHx8MHx8fDA%3D",
    created_at: new Date().toISOString()
  }
];

// Sample products for Women's category
const womenSampleProducts: Product[] = [
  {
    id: 'women-1',
    name: "Floral Summer Maxi Dress",
    price: 89.99,
    category: 'Women',
    description: "Elegant floral maxi dress perfect for summer occasions.",
    image_url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
    created_at: new Date().toISOString()
  },
  {
    id: 'women-2',
    name: "Designer Leather Handbag",
    price: 129.99,
    category: 'Women',
    description: "Premium leather handbag with multiple compartments.",
    image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
    created_at: new Date().toISOString()
  },
  {
    id: 'women-3',
    name: "Athletic Performance Leggings",
    price: 54.99,
    category: 'Women',
    description: "High-performance leggings with moisture-wicking technology.",
    image_url: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800",
    created_at: new Date().toISOString()
  },
  {
    id: 'women-4',
    name: "Pearl Statement Necklace",
    price: 45.99,
    category: 'Women',
    description: "Elegant pearl necklace for special occasions.",
    image_url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
    created_at: new Date().toISOString()
  },
  {
    id: 'women-5',
    name: "Cashmere Blend Sweater",
    price: 119.99,
    category: 'Women',
    description: "Luxuriously soft cashmere blend sweater in classic cut.",
    image_url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800",
    created_at: new Date().toISOString()
  }
];

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedSize, setSelectedSize] = useState<string>('all');
  
  // Try to fetch products from Supabase first
  const { data: supabaseProducts = [], isLoading } = useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProductsByCategory(category === 'men' ? 'Men' : 'Women'),
    enabled: category === 'men' || category === 'women'
  });

  // Determine which products to display
  let products = supabaseProducts.length > 0 
    ? supabaseProducts 
    : (category === 'men' ? menSampleProducts : womenSampleProducts);

  // Apply filters
  products = products.filter(product => 
    product.price >= priceRange[0] && 
    product.price <= priceRange[1]
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <CategoryBanner category={category as 'men' | 'women'} />
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters */}
            <Card className="p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              
              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <Label>Price Range: ${priceRange[0]} - ${priceRange[1]}</Label>
                  <Slider
                    defaultValue={[0, 200]}
                    max={200}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-2"
                  />
                </div>

                {/* Size Filter */}
                <div>
                  <Label>Size</Label>
                  <RadioGroup
                    defaultValue="all"
                    onValueChange={setSelectedSize}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all">All</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="s" id="s" />
                      <Label htmlFor="s">Small</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="m" id="m" />
                      <Label htmlFor="m">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="l" id="l" />
                      <Label htmlFor="l">Large</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </Card>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              <ProductGrid 
                products={products}
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
