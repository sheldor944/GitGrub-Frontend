import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "name is required"),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  usertype: z.string(),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  currentUser: User;
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  title?: string;
  buttonText?: string;
  isDelivery: boolean; // New prop for indicating whether it's for delivery or dine-in
};

const UserProfileForm = ({
  onSave,
  isLoading,
  currentUser,
  title = "User Profile",
  buttonText = "Submit",
  isDelivery, // Default to false
}: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-4 bg-gray-50 rounded-lg md:p-10"
      >
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <FormDescription>
            View and change your profile information here
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="p-2">Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="p-2">Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isDelivery && (
          <FormField
            control={form.control}
            name="usertype"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="p-2">User Type</FormLabel>
                <FormControl className="flex gap-4">
                  <select
                    {...field}
                    className="p-2 bg-white rounded-full shadow-md"
                  >
                    <option value="" disabled selected>
                      Select user type
                    </option>
                    <option value="user">User</option>
                    <option value="entrepreneur">Entrepreneur</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="p-2">Address Line 1</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="p-2">City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="p-2">Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          // Conditionally render based on the value of isDelivery prop
          <Button type="submit" className="bg-orange-500">
            {isDelivery ? "Continue to Payment" : buttonText}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import LoadingButton from "@/components/LoadingButton";
// import { Button } from "@/components/ui/button";
// import { User } from "@/types";
// import { useEffect } from "react";

// const formSchema = z.object({
//   email: z.string().optional(),
//   name: z.string().min(1, "name is required"),
//   addressLine1: z.string().min(1, "Address Line 1 is required"),
//   city: z.string().min(1, "City is required"),
//   country: z.string().min(1, "Country is required"),
// });

// export type UserFormData = z.infer<typeof formSchema>;

// type Props = {
//   currentUser: User;
//   onSave: (userProfileData: UserFormData) => void;
//   isLoading: boolean;
//   title?: string;
//   buttonText?: string;
// };

// const UserProfileForm = ({
//   onSave,
//   isLoading,
//   currentUser,
//   title = "User Profile",
//   buttonText = "Submit",
// }: Props) => {
//   const form = useForm<UserFormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: currentUser,
//   });

//   useEffect(() => {
//     form.reset(currentUser);
//   }, [currentUser, form]);

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSave)}
//         className="space-y-4 bg-gray-50 rounded-lg md:p-10"
//       >
//         <div>
//           <h2 className="text-2xl font-bold">{title}</h2>
//           <FormDescription>
//             View and change your profile information here
//           </FormDescription>
//         </div>
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input {...field} disabled className="bg-white" />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Name</FormLabel>
//               <FormControl>
//                 <Input {...field} className="bg-white" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="flex flex-col md:flex-row gap-4">
//           <FormField
//             control={form.control}
//             name="addressLine1"
//             render={({ field }) => (
//               <FormItem className="flex-1">
//                 <FormLabel>Address Line 1</FormLabel>
//                 <FormControl>
//                   <Input {...field} className="bg-white" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="city"
//             render={({ field }) => (
//               <FormItem className="flex-1">
//                 <FormLabel>City</FormLabel>
//                 <FormControl>
//                   <Input {...field} className="bg-white" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="country"
//             render={({ field }) => (
//               <FormItem className="flex-1">
//                 <FormLabel>Country</FormLabel>
//                 <FormControl>
//                   <Input {...field} className="bg-white" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         {isLoading ? (
//           <LoadingButton />
//         ) : (
//           <Button type="submit" className="bg-orange-500">
//             {buttonText}
//           </Button>
//         )}
//       </form>
//     </Form>
//   );
// };

// export default UserProfileForm;