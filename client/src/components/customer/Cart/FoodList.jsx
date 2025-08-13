
import React, { useState } from 'react';
import FoodCard from './FoodCard';
import foodData, { categories } from '@/assets/data/cart/foodData';

const FoodList = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFoods = activeCategory === 'all'
    ? foodData
    : foodData.filter(food => food.category === activeCategory);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="display-6 fw-bold mb-3">Our Menu</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
          Explore our wide range of delicious meals prepared with the finest ingredients
        </p>
      </div>

      <div className="row g-4">
        <div className="col-lg-3">
          <div className="card p-3 sticky-top" style={{ top: "80px" }}>
            <h5 className="mb-3">Categories</h5>
            <div className="d-flex flex-column gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`btn btn-outline-secondary text-start ${activeCategory === category.id ? 'active' : ''
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          {filteredFoods.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {filteredFoods.map(food => (
                <div className="col" key={food.id}>
                  <FoodCard food={food} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted">No items found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodList;
