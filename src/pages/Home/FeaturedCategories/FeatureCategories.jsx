import React from 'react';

const FeatureCategories = ({onSelectCategory}) => {
    const categories = [
        "All", "Fiction", "Non-Fiction", "Fantasy"
    ]
    return (
         <div className="flex flex-wrap gap-2">
      {categories.map((category,index) => (
        <button
          key={index}
          className="btn bg-primary btn-sm btn-outline"
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
    );
};

export default FeatureCategories;