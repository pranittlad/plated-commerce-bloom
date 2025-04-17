
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, CreditCard, AlertTriangle } from 'lucide-react';

interface CheckoutFormProps {
  onCheckoutComplete: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onCheckoutComplete }) => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [shippingDetails, setShippingDetails] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast({
        variant: "destructive",
        title: "Empty Cart",
        description: "Your cart is empty. Add some products before checkout.",
      });
      return;
    }

    // Validate form
    for (const [key, value] of Object.entries(shippingDetails)) {
      if (!value) {
        toast({
          variant: "destructive",
          title: "Missing Information",
          description: `Please enter your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
        });
        return;
      }
    }

    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      // This would normally be a call to your Stripe API
      // For demo purposes, we're simulating a payment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      setPaymentStatus('success');
      toast({
        title: "Payment Successful",
        description: "Your order has been placed successfully!",
      });
      
      // In a real app, you would save the order in your database here
      
      // Clear the cart after successful payment
      clearCart();
      
      // Notify parent component that checkout is complete
      setTimeout(() => {
        onCheckoutComplete();
      }, 2000);
      
    } catch (error) {
      setPaymentStatus('error');
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentStatus === 'success') {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center py-10">
          <CheckCircle2 className="text-green-500 w-20 h-20 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6 text-center">
            Your order has been placed successfully. You will receive a confirmation email shortly.
          </p>
          <Button 
            className="bg-godhadya-500 hover:bg-godhadya-600"
            onClick={onCheckoutComplete}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Payment Failed</AlertTitle>
          <AlertDescription>
            There was an error processing your payment. Please try again.
          </AlertDescription>
        </Alert>
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={() => setPaymentStatus('idle')}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h2>
      
      {/* Order Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
        <div className="space-y-2 mb-3">
          {cart.map((item) => (
            <div key={item.product.id} className="flex justify-between">
              <span>{item.quantity} x {item.product.name}</span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Shipping Information */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Shipping Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={shippingDetails.fullName}
                onChange={handleInputChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={shippingDetails.email}
                onChange={handleInputChange}
                className="mt-1"
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={shippingDetails.address}
                onChange={handleInputChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={shippingDetails.city}
                onChange={handleInputChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                name="state"
                value={shippingDetails.state}
                onChange={handleInputChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP/Postal Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={shippingDetails.zipCode}
                onChange={handleInputChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={shippingDetails.country}
                onChange={handleInputChange}
                className="mt-1"
                required
              />
            </div>
          </div>
        </div>
        
        {/* Payment Method */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Payment Method</h3>
          <div className="bg-gray-50 p-4 rounded-md flex items-center">
            <CreditCard className="text-godhadya-500 mr-2" />
            <span>Credit Card (Stripe)</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            This is a demo application. No actual payment will be processed.
          </p>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-godhadya-500 hover:bg-godhadya-600"
          disabled={isProcessing || cart.length === 0}
        >
          {isProcessing ? "Processing..." : `Pay $${cartTotal.toFixed(2)}`}
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
