
import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  minQuantity?: number;
  maxQuantity?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  minQuantity = 1,
  maxQuantity = 99,
}) => {
  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        onClick={onDecrease}
        disabled={quantity <= minQuantity}
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </Button>
      <span className="mx-4 font-medium w-6 text-center">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        onClick={onIncrease}
        disabled={quantity >= maxQuantity}
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </Button>
    </div>
  );
};

export default QuantitySelector;
