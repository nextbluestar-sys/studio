
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

const formSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof formSchema>

interface ChangePasswordFormProps {
  onSave: () => void;
}

export default function ChangePasswordForm({ onSave }: ChangePasswordFormProps) {
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    },
  })

  function onSubmit(values: PasswordFormValues) {
    // In a real app, you would save the new password here.
    // For this demo, we'll just call the onSave callback.
    console.log("New password:", values.password);
    onSave();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Save New Password
        </Button>
      </form>
    </Form>
  )
}
