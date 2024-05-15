import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import DateInput from "@/components/DatePicker";
import React from 'react';
import { Employee } from "@/types";

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    gender: z.string().min(1, "Gender is required"),
    role: z.string().min(1, "Role is required"),
    phone: z.string().min(1, "Phone Number is required"),
    joiningDate: z.date(),
    resigningDate: z.date().optional(),
    shiftDuration: z.string().min(1, "Shift is required"),
});

type EmployeeFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (employeeProfileData: FormData) => void;
    isLoading: boolean;
    employee: Employee|undefined;
    addedText:string;
};

const EmployeeProfileForm = ({ onSave, isLoading, employee ,addedText="Submit Employee Info"}: Props) => {
    const form = useForm<EmployeeFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: employee?.email || "",
            name: employee?.name || "",
            gender: employee?.gender || "",
            role: employee?.role || "",
            phone: employee?.phone || "",
            joiningDate: employee?.joiningDate ? new Date(employee.joiningDate) : undefined,
            resigningDate: employee?.resigningDate ? new Date(employee.resigningDate) : undefined,
            shiftDuration: employee?.shiftDuration || "",
        },
    });

    const onSubmit = (formDataJson: EmployeeFormData) => {
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
        onSave(formData);
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-gray-50 rounded-lg md:p-10">
                <div>
                    <h1 className="text-4xl font-bold">Employee Profile Form</h1>
                    <FormDescription>Add/Update employee information here</FormDescription>
                </div>
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel className="p-2">Email</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>
                    </FormItem>
                )} />

                <div className="flex flex-col md:flex-row gap-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel className="p-2">Name</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <FormField control={form.control} name="gender" render={({ field }) => (
                        <FormItem>
                            <FormLabel className="p-2">Gender</FormLabel>
                            <FormControl className="flex gap-4">
                                <select {...field} className="p-2 bg-white rounded-full shadow-md">
                                    <option value="" disabled>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="role" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel className="p-2">Role</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel className="p-2">Phone Number</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <FormField control={form.control} name="joiningDate" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel className="p-2">Joining Date</FormLabel>
                            <FormControl>
                                <DateInput
                                    label=""
                                    selectedDate={field.value ? new Date(field.value) : null}
                                    onDateChange={(date) => field.onChange(date)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="resigningDate" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel className="p-2">Resigning Date</FormLabel>
                            <FormControl>
                                <DateInput
                                    label=""
                                    selectedDate={field.value ? new Date(field.value) : null}
                                    onDateChange={(date) => field.onChange(date)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="shiftDuration" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel className="p-2">Shift</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>

                {isLoading ? <LoadingButton /> : <Button type="submit" className="bg-dark_color">{addedText}</Button>}
            </form>
        </Form>
    );
};

export default EmployeeProfileForm;
