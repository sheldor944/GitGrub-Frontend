import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import StarGiving from '@/components/StarGiving'; 
import {Review} from '@/types'// Assuming you have a StarGiving component
import { useEffect } from "react";
import {User} from '@/types'

const formSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating must be between 1 and 5'),
});

export type ReviewFormData = z.infer<typeof formSchema>;

type Props = {
  currnetuser: User|undefined;
  onSave: (reviewData: ReviewFormData, restaurantId: string) => void;
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

  const handleFormSubmit = async (formData: ReviewFormData) => {
    try {
      console.log('Button clicked'); // Log "Button clicked"
      const reviewData: ReviewFormData = { ...formData, rating };
      await onSave(reviewData, restaurantId); // Pass restaurant ID along with review data
      setMessage('Review submitted successfully!');
      setError('');
    } catch  {
      console.log("Tmi paro na");
      setMessage('');
      setError('Error submitting review. Please try again.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 bg-gray-50 rounded-lg md:p-10">
        <div>
          <h2 className="text-2xl font-bold pl-3 pt-2">{title}</h2>
          <FormDescription className='pl-3 font-mono'>Share your experience with others</FormDescription>
        </div>
        <div className='pl-3'>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='p-1 text-1xl font-mono font-bold'>Message</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white pl-3" placeholder="Enter your text here" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="flex items-center">
          <FormLabel className="p-3">Rating:</FormLabel>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((value) => (
              <StarGiving
                key={value}
                filled={value <= rating}
                onClick={() => setRating(value)}
              />
            ))}
          </div>
        </div>
        <div className='pl-3 pb-3'>
        {
        isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-orange-500 ">
            {buttonText}
          </Button>
        )}
        </div>
        {message && <div className="text-green-500">{message}</div>}
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </Form>
  );
};

export default ReviewForm;
