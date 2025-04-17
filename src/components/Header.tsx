
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="godhadya-container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="font-bold text-2xl text-godhadya-500">
            Godhadya
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-godhadya-500 transition-colors duration-300">
              Home
            </Link>
            <Link to="/men" className="text-gray-700 hover:text-godhadya-500 transition-colors duration-300">
              Men
            </Link>
            <Link to="/women" className="text-gray-700 hover:text-godhadya-500 transition-colors duration-300">
              Women
            </Link>
          </nav>

          {/* Desktop Search Form */}
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="flex items-center">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 rounded-r-none focus:ring-godhadya-500"
              />
              <Button 
                type="submit" 
                variant="default" 
                className="bg-godhadya-500 hover:bg-godhadya-600 rounded-l-none"
              >
                <Search size={18} />
              </Button>
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/profile" className="text-gray-700 hover:text-godhadya-500 transition-colors duration-300">
              <User size={24} />
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-godhadya-500 transition-colors duration-300 relative">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-godhadya-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4 flex">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-r-none"
              />
              <Button 
                type="submit" 
                variant="default" 
                className="bg-godhadya-500 hover:bg-godhadya-600 rounded-l-none"
              >
                <Search size={18} />
              </Button>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-godhadya-500 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/men" 
                className="text-gray-700 hover:text-godhadya-500 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Men
              </Link>
              <Link 
                to="/women" 
                className="text-gray-700 hover:text-godhadya-500 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Women
              </Link>
              <Link 
                to="/profile" 
                className="text-gray-700 hover:text-godhadya-500 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <Link 
                to="/cart" 
                className="text-gray-700 hover:text-godhadya-500 transition-colors duration-300 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart
                {cartCount > 0 && (
                  <span className="ml-2 bg-godhadya-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </Link>
              {user && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
