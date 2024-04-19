import React, { useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import StarGiving from '@/components/StarGiving'; 
import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import ReviewElement from './ReviewElement';


const formSchema = z.object({
  user: z.string(),
  restaurant: z.string(),
  message: z.string().min(1, 'Message is required'),
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating must be between 1 and 5'),
  ratingTime: z.date(),
});

export type ReviewFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (reviewData: FormData) => void;
  isLoading: boolean;
  restaurantId: string; // New prop for restaurant ID
  title?: string;
  buttonText?: string;
};

const ReviewForm = ({
  onSave,
  isLoading,
  restaurantId,
  title = 'Leave a Review',
  buttonText = 'Submit Review',
}:Props) => {
  const form = useForm<ReviewFormData>({
    resolver: zodResolver(formSchema),
  });
  const [rating, setRating] = useState<number>(0); // Initialize rating state
  const [message, setMessage] = useState<string>(''); // Initialize message state
  const [error, setError] = useState<string>(''); // Initialize error state
  

  
  const onSubmit = (formDataJson:ReviewFormData) => {
    console.log("buttonclick accpeted")
    const formData= new FormData();
    const { currentUser, isLoading: isGetLoading } = useGetMyUser();
    const uname = currentUser?.name;
    formData.append("user", uname?.toString() ?? "");    
    formData.append("restaurant",restaurantId);
    formData.append("message",formDataJson.message);
    formData.append("rating",String(formDataJson.rating));
    const currentDate = new Date().toDateString();
    formData.append("ratingTime", currentDate);

    
    onSave(formData);
  }
  function faltu() {
    console.log("buttonclick accpeted");
    
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-gray-50 rounded-lg md:p-10">
       <ReviewElement/>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-orange-500">
            {buttonText}
          </Button>
        )}
      {error && <div className="text-red-500">{error}</div>}
      </form>
    </Form>
  );
};

export default ReviewForm;
