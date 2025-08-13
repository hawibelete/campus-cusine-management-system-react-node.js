
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRating } from '@/redux/slices/customer/feedbackSlice';

const StarRating = () => {
  const dispatch = useDispatch();
  const rating = useSelector((state) => state.feedback.currentFeedback.rating);

  const handleStarClick = (starValue) => {
    dispatch(setRating(starValue));
  };

  const handleStarHover = (e, starValue) => {
    const stars = e.currentTarget.parentElement.querySelectorAll('.star');
    stars.forEach((star, index) => {
      if (index < starValue) {
        star.classList.add('text-warning');
        star.classList.remove('text-muted');
      } else {
        star.classList.add('text-muted');
        star.classList.remove('text-warning');
      }
    });
  };

  const handleMouseLeave = (e) => {
    const stars = e.currentTarget.querySelectorAll('.star');
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('text-warning');
        star.classList.remove('text-muted');
      } else {
        star.classList.add('text-muted');
        star.classList.remove('text-warning');
      }
    });
  };

  return (
    <div className="star-rating mb-1">
      <span className="me-3 fw-medium text-light">Rate your experience:</span>
      <div 
        className="stars d-flex"
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`bi bi-star-fill star fs-4 me-1 cursor-pointer ${
              star <= rating ? 'text-warning' : 'text-muted'
            }`}
            style={{ cursor: 'pointer', transition: 'color 0.2s ease', textShadow: '0 0 2px white' }}
            onClick={() => handleStarClick(star)}
            onMouseEnter={(e) => handleStarHover(e, star)}
          ></i>
        ))}
      </div>
      <span className="ms-3 text-light">
        {rating > 0 && (
          <small>
            {rating === 1 && "Poor"}
            {rating === 2 && "Fair"}
            {rating === 3 && "Good"}
            {rating === 4 && "Very Good"}
            {rating === 5 && "Excellent"}
          </small>
        )}
      </span>
    </div>
  );
};

export default StarRating;
