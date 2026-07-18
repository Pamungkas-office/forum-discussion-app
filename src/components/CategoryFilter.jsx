import React from 'react';

function CategoryFilter({ categories, activeCategory, onSelectCategory }) {
  return (
    <div className="category-filter">
      <button
        type="button"
        className={`category-btn ${activeCategory === '' ? 'active' : ''}`}
        onClick={() => onSelectCategory('')}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`category-btn ${activeCategory === category ? 'active' : ''}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
