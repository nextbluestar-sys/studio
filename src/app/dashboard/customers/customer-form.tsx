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
import { toast } from "@/hooks/use-toast"
import type { Customer } from "@/lib/types"
import { MultiSelect, type MultiSelectOption } from "@/components/ui/multi-select"
import { products } from "@/lib/data"


const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number seems too short."),
  siteAddress: z.string().min(5, "Site address seems too short."),
  productIds: z.array(z.string()).optional(),
})

type CustomerFormValues = z.infer<typeof formSchema>

interface CustomerFormProps {
  onSave: (data: any) => void;
  initialData?: Customer | null;
}

const productOptions: MultiSelectOption[] = products.map(p => ({ value: p.id, label: p.name }));

export default function CustomerForm({ onSave, initialData }: CustomerFormProps) {
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      siteAddress: initialData?.siteAddress || "",
      productIds: initialData?.purchaseHistory.map(p => p.id) || [],
    },
  })

  useEffect(() => {
    form.reset({
      name: initialData?.name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      siteAddress: initialData?.siteAddress || "",
      productIds: initialData?.purchaseHistory.map(p => p.id) || [],
    });
  }, [initialData, form]);

  function onSubmit(values: CustomerFormValues) {
    const purchaseHistory = values.productIds 
      ? values.productIds.map(id => products.find(p => p.id === id)).filter(Boolean)
      : [];
      
    const customerData = { 
      ...(initialData || {}), 
      ...values,
      purchaseHistory,
    };
    
    onSave(customerData)
    toast({
      title: initialData ? "Customer Updated" : "Customer Added",
      description: `${values.name} has been successfully ${initialData ? 'updated' : 'added'}.`,
    })
    form.reset({ name: "", email: "", phone: "", siteAddress: "", productIds: [] });
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
                <Input placeholder="John Doe" {...field} />
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
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="555-123-4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="siteAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Business Rd, Commerce City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Products Purchased</FormLabel>
              <FormControl>
                <MultiSelect
                    options={productOptions}
                    selected={field.value || []}
                    onChange={field.onChange}
                    placeholder="Select products..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {initialData ? "Save Changes" : "Add Customer"}
        </Button>
      </form>
    </Form>
  )
}
