import React from 'react';

const Rating = ({ rating }) => {
  return (
    <div className="rating">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rating ? 'filled' : ''}>
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default Rating;

