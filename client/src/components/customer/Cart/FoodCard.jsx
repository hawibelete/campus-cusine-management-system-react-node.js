
import React from 'react';
import { useCart } from '@/context/CartContext';
import { Plus } from 'lucide-react';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  return (
    <div className="card h-100 shadow-sm mb-4">
      <div className="position-relative" style={{ height: "200px" }}>
        <img
          src={food.image}
          alt={food.name}
          className="card-img-top h-100 w-100 object-fit-cover"
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{food.name}</h5>
        <p className="card-text text-muted small mb-2 text-truncate">{food.description}</p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="fs-5 fw-bold">${food.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(food)}
            className="btn btn-primary d-flex align-items-center gap-1"
          >
            <Plus size={16} />
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
