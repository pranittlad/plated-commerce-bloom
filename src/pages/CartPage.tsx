
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuantitySelector from '@/components/QuantitySelector';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { Trash2, ShoppingCart, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="godhadya-container py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Shopping Cart</h1>
          
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    {cart.map((item) => (
                      <div key={item.product.id}>
                        <div className="flex flex-col md:flex-row md:items-center py-4">
                          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                            <img 
                              src={item.product.image_url} 
                              alt={item.product.name} 
                              className="w-24 h-24 object-cover rounded"
                            />
                          </div>
                          
                          <div className="flex-grow md:mr-4">
                            <Link 
                              to={`/product/${item.product.id}`}
                              className="text-lg font-semibold text-gray-800 hover:text-godhadya-500 transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-gray-600 text-sm">{item.product.category}</p>
                            <p className="text-godhadya-500 font-bold mt-1">${item.product.price.toFixed(2)}</p>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4 md:mt-0">
                            <QuantitySelector
                              quantity={item.quantity}
                              onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
                              onDecrease={() => updateQuantity(item.product.id, item.quantity - 1)}
                            />
                            
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeFromCart(item.product.id)}
                            >
                              <Trash2 size={18} />
                            </Button>
                          </div>
                        </div>
                        <Separator className="my-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">$0.00</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between mb-6">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold text-godhadya-500">${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-godhadya-500 hover:bg-godhadya-600 mb-3"
                    size="lg"
                    onClick={handleCheckout}
                  >
                    <CreditCard size={18} className="mr-2" />
                    Checkout
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <Link to="/">
                      <ShoppingCart size={18} className="mr-2" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Button 
                className="bg-godhadya-500 hover:bg-godhadya-600"
                size="lg"
                asChild
              >
                <Link to="/">
                  Start Shopping
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
