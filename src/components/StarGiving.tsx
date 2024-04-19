import React from 'react';

interface StarProps {
  filled: boolean;
  onClick: () => void;
}

const StarGiving: React.FC<StarProps> = ({ filled, onClick }) => {
  return (
    <span
      className={`star ${filled ? 'filled' : ''}`}
      onClick={onClick}
      style={{ cursor: 'pointer' }} // Set cursor style
    >
      {filled ? '★' : '☆'}
    </span>
  );
};

export default StarGiving;
