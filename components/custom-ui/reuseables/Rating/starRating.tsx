import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";


export const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-500" />);
    }
  }
  return <div className="flex">{stars}</div>;
};


