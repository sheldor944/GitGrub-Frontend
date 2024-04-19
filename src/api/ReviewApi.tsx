import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
import { Review } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetReviewsByRestaurantId = (restaurantId:  string) => {
  const { getAccessTokenSilently } = useAuth0();

  const getReviewsByRestaurantIdRequest = async (restaurantId: string): Promise<Review[]> => {
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await fetch(`${API_BASE_URL}/api/reviews?restaurantId=${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      return response.json();
    } catch (error) {
      throw new Error('Failed to fetch reviews');
    }
  };

  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery(['fetchReviewsByRestaurantId', restaurantId], () => getReviewsByRestaurantIdRequest(restaurantId));

  if (error) {
    toast.error(error.toString());
  }

  return { reviews, isLoading };
};

export const useCreateReview = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createReviewRequest = async (reviewData: Review) => {
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await fetch(`${API_BASE_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error('Failed to create review');
      }

      return response.json();
    } catch (error) {
      throw new Error('Failed to create review');
    }
  };

  const {
    mutateAsync: createReview,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createReviewRequest);

  return {
    createReview,
    isLoading,
    isError,
    isSuccess,
  };
};
