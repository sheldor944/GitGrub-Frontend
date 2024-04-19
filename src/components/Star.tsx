import React from 'react';

interface StarProps {
  filled: boolean;
}

const Star: React.FC<StarProps> = ({ filled }) => {
  return (
    <span className={`star ${filled ? 'filled' : ''}`}>
      {filled ? '★' : '☆'}
    </span>
  );
};

export default Star;
