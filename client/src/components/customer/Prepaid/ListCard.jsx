import React from "react";
import "./list-card.css";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ListCard = ({ lounge }) => {
  const navigate = useNavigate(); 

  const handleLearnMoreClick = () => {
    navigate("/customer/prepaid/register"); 
  };
  return (
    <div className="prepaid-lounge-card">
      <div className="prepaid-lounge-image">
        <img
          src={lounge.image || "https://placehold.co/200x150"}
          alt={lounge.name}
        />
      </div>
      <div className="prepaid-lounge-content">
        <h3 className="prepaid-lounge-title">{lounge.name}</h3>
        <div className="prepaid-lounge-rating">
          <span className="rating-value">{lounge.rating}</span>
          <span className="rating-max">/5</span>
        </div>
        <p className="prepaid-lounge-description">{lounge.description}</p>
        {lounge.discountPercentage !== null ? (
          <span className="prepaid-lounge-discount">
            <CheckCircle className="discount-icon" size={16} />
            <span>
              {parseFloat(lounge.discountPercentage) % 1 === 0
                ? `${parseInt(lounge.discountPercentage)}% discount available`
                : `${parseFloat(lounge.discountPercentage).toFixed(
                    2
                  )}% discount available`}
            </span>
          </span>
        ) : (
          <span className="prepaid-lounge-no-discount">
            No discount available
          </span>
        )}

        <button
          className="prepaid-lounge-button"
          onClick={handleLearnMoreClick} 
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default ListCard;
