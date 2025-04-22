
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

// Sample products for Men's category refined to only include men's items
const menSampleProducts: Product[] = [
  {
    id: 'men-1',
    name: "Men's Premium Cotton Polo",
    price: 49.99,
    category: 'Men',
    description: "Classic-fit polo shirt in breathable cotton pique",
    image_url: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800",
    created_at: new Date().toISOString()
  },
  {
    id: 'men-2',
    name: "Men's Athletic Joggers",
    price: 59.99,
    category: 'Men',
    description: "Comfortable joggers perfect for workouts or casual wear",
    image_url: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800",
    created_at: new Date().toISOString()
  },
  {
    id: 'men-3',
    name: "Men's Leather Chelsea Boots",
    price: 129.99,
    category: 'Men',
    description: "Premium leather boots with comfortable elastic sides",
    image_url: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800",
    created_at: new Date().toISOString()
  },
  {
    id: 'men-4',
    name: "Men's Chronograph Watch",
    price: 199.99,
    category: 'Men',
    description: "Stainless steel chronograph with premium movement",
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    created_at: new Date().toISOString()
  },
  {
    id: 'men-5',
    name: "Men's Wool Blend Blazer",
    price: 189.99,
    category: 'Men',
    description: "Tailored fit blazer perfect for formal occasions",
    image_url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
    created_at: new Date().toISOString()
  },
  {
    id: 'men-6',
    name: "Men's Leather Messenger Bag",
    price: 149.99,
    category: 'Men',
    description: "Professional leather bag with multiple compartments",
    image_url: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=800",
    created_at: new Date().toISOString()
  }
];

// Sample products for Women's category with women-specific items
const womenSampleProducts: Product[] = [
  {
    id: 'women-1',
    name: "Floral Maxi Dress",
    price: 89.99,
    category: 'Women',
    description: "Elegant floral print maxi dress perfect for summer occasions",
    image_url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
    created_at: new Date().toISOString()
  },
  {
    id: 'women-2',
    name: "Designer Tote Bag",
    price: 129.99,
    category: 'Women',
    description: "Spacious leather tote with premium hardware",
    image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
    created_at: new Date().toISOString()
  },
  {
    id: 'women-3',
    name: "High-Waisted Yoga Leggings",
    price: 54.99,
    category: 'Women',
    description: "Performance leggings with phone pocket",
    image_url: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800",
    created_at: new Date().toISOString()
  },
  {
    id: 'women-4',
    name: "Pearl Drop Earrings",
    price: 45.99,
    category: 'Women',
    description: "Elegant pearl earrings with sterling silver",
    image_url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
    created_at: new Date().toISOString()
  },
  {
    id: 'women-5',
    name: "Cashmere Sweater",
    price: 119.99,
    category: 'Women',
    description: "Luxuriously soft cashmere in a classic cut",
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
