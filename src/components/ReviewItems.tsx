import React, { useEffect, useState } from 'react';
import { Review } from '@/types';
import { useGetReviewsByRestaurantId } from '@/api/ReviewApi'; // Assuming you have an API function to fetch reviews
import Star from './Star';

interface ReviewItemsProps {
  restaurantId: string;
}

const ReviewItems: React.FC<ReviewItemsProps> = ({ restaurantId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { reviews: fetchedReviews, isLoading } = useGetReviewsByRestaurantId(restaurantId);

  useEffect(() => {
    if (!isLoading && fetchedReviews) {
      setReviews(fetchedReviews);
    }
  }, [isLoading, fetchedReviews]);

  return (
    <div className="review-items">
      <h2>Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index} className="review">
          <div className="rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} filled={i < review.rating} />
            ))}
          </div>
          <h3>User: {review.user}</h3>
          <p>Message: {review.message}</p>
          <p>Rating: {review.rating}</p>
          <p>Rating Time: {review.ratingTime ? new Date(review.ratingTime).toDateString() : 'Unknown'}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewItems;
