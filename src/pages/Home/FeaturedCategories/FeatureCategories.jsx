import React, { useState } from 'react';

const FeatureCategories = ({ onSelectCategory }) => {
  const categories = ["All", "Fiction", "Non-Fiction", "Fantasy"];
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onSelectCategory(category);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => handleCategoryClick(category)}
          className={`px-4 py-2 rounded-xl btn text-sm font-semibold transition-all duration-200 shadow-md border 
            ${
              activeCategory === category
                ? 'bg-primary text-white border-primary scale-105'
                : 'bg-white text-primary border-primary hover:bg-primary hover:text-white hover:scale-105'
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FeatureCategories;
