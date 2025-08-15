"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import type { Staff } from "@/lib/types"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  role: z.string().min(1, "Please select a role."),
})

type StaffFormValues = z.infer<typeof formSchema>

interface StaffFormProps {
  onSave: (staff: Staff | Omit<Staff, "id">) => void;
  initialData?: Staff | null;
}

export default function StaffForm({ onSave, initialData }: StaffFormProps) {
  const form = useForm<StaffFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      role: "",
    },
  })

  useEffect(() => {
    form.reset(initialData || { name: "", email: "", role: "" });
  }, [initialData, form]);


  function onSubmit(values: StaffFormValues) {
    const staffData = initialData ? { ...initialData, ...values } : values;
    onSave(staffData);
    toast({
      title: initialData ? "Staff Member Updated" : "Staff Member Added",
      description: `${values.name} has been successfully ${initialData ? 'updated' : 'added'}.`,
    })
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="jane.smith@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Technician">Technician</SelectItem>
                    <SelectItem value="Support Specialist">Support Specialist</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button type="submit" className="w-full">
          {initialData ? 'Save Changes' : 'Add Staff Member'}
        </Button>
      </form>
    </Form>
  )
}
