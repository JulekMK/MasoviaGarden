import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, img, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/service/${index}`);
  };

  return (
    <div 
      className="card" 
      onClick={handleClick} 
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div className="card-image-container">
        <img src={img} alt={title} loading="lazy" />
      </div>
      <div className="card-content">
        <p>{title}</p>
      </div>
    </div>
  );
};

export default Card;
