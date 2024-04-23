import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
import { Review } from '@/types';
import { ReviewFormData } from '@/forms/manage-restaurant-form/ReviewForm';
import { error } from 'console';
import { undefined } from 'zod';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetReviewsByRestaurantId = (restaurantId:  string) => {

  const getReviewsByRestaurantIdRequest = async (restaurantId: string): Promise<Review[]> => {
    console.log(restaurantId);
    try {
      const response = await fetch(`${API_BASE_URL}/api/review/${restaurantId}`, {
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

export const useCreateReview = (restaurantId?:string) => {
  const { getAccessTokenSilently } = useAuth0();

  const createReviewRequest = async (reviewData: FormData):Promise<Review>  => {
    const accessToken = await getAccessTokenSilently();

      for(let pair of reviewData){
        console.log('key',pair[0],  'value', pair[1]);
      }
      const response = await fetch(`${API_BASE_URL}/api/review/saveReview/${restaurantId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,  
        },
        body: reviewData,
      });

      if (!response.ok) {
        throw new Error('Failed to create review');
      }
      return response.json();
  };

  const {
    mutate: createReview,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createReviewRequest);
  if(isSuccess){
    toast.success("Review posted sucessfully"); 
  }
  if(isError){
    toast.error("Failed to create review");
  }

  return {
    createReview,
    isLoading,
    isError,
    isSuccess,
  };
};


