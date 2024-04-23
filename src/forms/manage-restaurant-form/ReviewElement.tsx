import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { useFormContext } from "react-hook-form";
  import StarGiving from "@/components/StarGiving";
  import { useEffect } from "react";

  
  const ReviewElement =() => {
    const { control, watch, setValue } = useFormContext();
    const rating = watch("rating");
    const handleStarClick = (value) => {
      setValue("rating", value);
      console.log(control._formValues);
    };
    useEffect(() => {
      console.log("Rating updated:", rating);
    }, [rating]);
    return (
      <div><div>
      <h2 className="text-2xl font-bold pl-3 pt-2">Give a Review</h2>
      <FormDescription className='pl-3 font-mono'>Share your experience with others</FormDescription>
    </div>
    <div className='pl-3'>
    <FormField
      control={control}
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
    <div className="pl-3">
        <div className="p-3">Rating:</div>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <StarGiving
              key={value}
              filled={value <= rating}
              onClick={() => handleStarClick(value)}
            />
          ))}
        </div>
  </div></div>
    );
  };
  
  export default ReviewElement