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

  
  const ReviewElement =() => {
    const { control } = useFormContext();
    return (
      <div><div>
      <h2 className="text-2xl font-bold pl-3 pt-2">Review</h2>
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
    <div className="pl-3 pb-3">
    <FormField
      control={control}
      name="rating"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="p-3">Rating:</FormLabel>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((value) => (
              <StarGiving
                key={value}
                filled={value <= field.value}
                onClick={() => field.onChange(value)}
              />
            ))}
          </div>
        </FormItem>
      )}
    />
  </div></div>
    );
  };
  
  export default ReviewElement