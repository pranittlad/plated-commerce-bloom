
import React from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface CategoryFiltersProps {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  selectedSize: string;
  setSelectedSize: (value: string) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  priceRange,
  setPriceRange,
  selectedSize,
  setSelectedSize,
}) => {
  return (
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
  );
};

export default CategoryFilters;
