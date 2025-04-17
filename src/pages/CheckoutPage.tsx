
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import AuthForm from '@/components/auth/AuthForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const { user } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  
  const handleCheckoutComplete = () => {
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <div className="godhadya-container py-8">
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">You need to add items to your cart before checking out.</p>
              <Button 
                className="bg-godhadya-500 hover:bg-godhadya-600"
                onClick={() => navigate('/')}
              >
                Back to Shopping
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="godhadya-container py-8">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate('/cart')}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Cart
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3">
              {user ? (
                <CheckoutForm onCheckoutComplete={handleCheckoutComplete} />
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In to Complete Your Purchase</h2>
                  <p className="text-gray-600 mb-6">
                    Please sign in or create an account to complete your checkout.
                  </p>
                  <AuthForm onSuccess={() => {}} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
