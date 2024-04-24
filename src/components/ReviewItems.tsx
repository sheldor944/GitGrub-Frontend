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

  // Calculate the average rating
  const averageRating = reviews.length > 0 ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length : 0;

  return (
    <div className='p-3 mb-3'>
      <p className='font-semibold pb-3 pl-1'>Average Rating: {averageRating.toFixed(1)}</p>
    <div className="grid-container  gap-3 ">
      {/* Display average rating */}
      

      {/* Display individual reviews */}
      {reviews.map((review, index) => (
        <div key={index} className="review rounded-lg bg-gray-200 shadow-lg p-2">
          <h6>{review.user}</h6>
          <div className="rating flex ">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} filled={i < review.rating} />
            ))}
            <p className="p-2 font-semibold">({review.rating})</p>
          </div>
          <p className="text-sm font-semibold pb-2">{review.message}</p>
          <p className="text-xs">
            {review.ratingTime
              ? new Date(review.ratingTime).toDateString()
              : "Unknown"}
          </p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ReviewItems;
