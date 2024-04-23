import React, { useEffect, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { Form } from "@/components/ui/form";
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button'; 
import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import ReviewElement from './ReviewElement';
import { User } from '@/types';


const formSchema = z.object({
  user: z.string(),
  restaurant: z.string(),
  message: z.string().min(1, 'Message is required'),
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating must be between 1 and 5'),
  ratingTime: z.string(),
});

export type ReviewFormData = z.infer<typeof formSchema>;

type Props = {
  currentuser: User;
  onSave: (formData1: FormData) => void;
  isLoading: boolean;
  restaurantId: string; // New prop for restaurant ID
  buttonText?: string;
};

const ReviewForm = ({
  currentuser,
  onSave,
  isLoading,
  restaurantId,
  buttonText = 'Submit Review',
}:Props) => {
  const form = useForm<ReviewFormData>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      user: currentuser?._id || '',
      restaurant: restaurantId,
      ratingTime: new Date().toDateString(),
    }
  });
  useEffect(() => {
    if(!currentuser){
      return;
}
}),[currentuser];
  const [error, setError] = useState<string>(''); // Initialize error state
  
  const onSubmitHaapens = (formDataJson:ReviewFormData) => {
    const formData = new FormData();
    Object.entries(formDataJson).forEach(([key, value]) => {
    formData.append(key, String(value));
    });
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    onSave(formData);
    form.reset();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHaapens)} className="space-y-4 bg-gray-50 rounded-lg md:p-10">
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
