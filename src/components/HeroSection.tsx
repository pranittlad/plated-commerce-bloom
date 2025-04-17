
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071"
          alt="Godhadya Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white p-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Welcome to <span className="text-godhadya-300">Godhadya</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Discover the latest trends in fashion for men and women
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              asChild
              className="bg-godhadya-500 hover:bg-godhadya-600 text-lg px-8 py-6"
            >
              <Link to="/men">Shop Men</Link>
            </Button>
            <Button 
              asChild
              className="bg-white text-godhadya-500 hover:bg-gray-100 text-lg px-8 py-6"
            >
              <Link to="/women">Shop Women</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
