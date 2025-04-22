
import React from 'react';

interface CategoryBannerProps {
  category: 'men' | 'women';
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({ category }) => {
  const bannerImage = category === 'men'
    ? "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800"
    : "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800";
  
  const title = category === 'men' ? "Men's Collection" : "Women's Collection";
  const subtitle = category === 'men'
    ? "Discover premium menswear that combines style and comfort"
    : "Explore our curated collection of women's fashion";

  return (
    <div className="relative h-[40vh] overflow-hidden">
      <img
        src={bannerImage}
        alt={`${category} fashion`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl max-w-2xl text-center px-4">{subtitle}</p>
      </div>
    </div>
  );
};

export default CategoryBanner;
