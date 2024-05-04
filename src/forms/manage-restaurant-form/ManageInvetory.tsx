import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from "@/components/ui/form";
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';

// Define form schema
const formSchema = z.object({
  itemName: z.string().min(1, 'Item name is required'),
  availabeQuantity: z.string().min(0, 'Amount must be a positive number'),
});

// Type for form data
export type InventoryFormData = z.infer<typeof formSchema>;

const ManageInventoryForm = ({ onAdd, isLoading, buttonText = 'Add Item' }: { onAdd: (formData: FormData) => void, isLoading: boolean, buttonText?: string }) => {
  // Form hook
  const form = useForm<InventoryFormData>({
    resolver: zodResolver(formSchema),
  });

  // State for error message
  const [error, setError] = useState<string>('');

  // Form submit handler
  const onSubmit = (formDataJson: InventoryFormData) => {
    const formData = new FormData();
    console.log(formDataJson)
    Object.entries(formDataJson).forEach(([key, value]) => {
      formData[key] = String(value)
    });
    // formData.ratingTime = time.now();
    console.log(" submit button is clicked ");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    // Call the onAdd function passed as prop, along with restaurantId
    onAdd(formData);
    // Reset the form after submission
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-gray-50 rounded-lg md:p-3">
        <div className='grid grid-cols-2 gap-3 min-w-20' style={{ minWidth: '200px' }}>
        <div className="flex flex-col">
          <label htmlFor="itemName" className="text-m font-medium px-1">Item Name</label>
          <input type="text" id="itemName" {...form.register('itemName')} placeholder="Your Item" className="input-field px-2 py-1 rounded-lg" style={{ minWidth: '100px' }}/>
          {form.formState.errors.itemName && <span className="text-red-500">{form.formState.errors.itemName.message}</span>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="availabeQuantity" className="text-m font-medium pl-1 ">Amount(Kg)</label>
          <input type="number" id="availabeQuantity" {...form.register('availabeQuantity')} placeholder="0.0" step="1.0" className="input-field px-2 py-1 rounded-lg" style={{ minWidth: '100px' }} />
          {form.formState.errors.availabeQuantity && <span className="text-red-500">{form.formState.errors.availabeQuantity.message}</span>}
        </div>
        
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" >
            {buttonText}
          </Button>
        )}
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </Form>
  );
};

export default ManageInventoryForm;
