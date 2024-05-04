import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
import { Review } from '@/types';
// import { reviewFormData } from '@/forms/manage-restaurant-form/ReviewForm';
import { error } from 'console';
import { undefined } from 'zod';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetReviewsByRestaurantId = (restaurantId:  string) => {

  const getReviewsByRestaurantIdRequest = async (restaurantId: string): Promise<Review[]> => {
    console.log("in the getReview "+ restaurantId);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/review/${restaurantId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      return response.json();
    } 
    catch (error) {
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
  
  // console.log("in the useCreateReview " + restaurantId);
  // console.log(reviewFormData)

  const createReviewRequest = async (
    reviewFormData : FormData
  ): Promise<Review> => {
    const accessToken = await getAccessTokenSilently();
    // console.log(requestData)
    const response = await fetch(`${API_BASE_URL}/api/review/saveReview/${restaurantId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewFormData),
    });
    // console.log("this is the response from useCreateReview ");
    // console.log(response);
    // console.log(response.body);

    if (!response.ok) {
      throw new Error("Failed to create review");
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
    window.location.reload();
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


