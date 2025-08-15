"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Lightbulb, Loader2, Send } from "lucide-react"

import { prioritizeComplaints, type PrioritizeComplaintsOutput } from "@/ai/flows/prioritize-complaints"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { customers, products } from "@/lib/data"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const formSchema = z.object({
  customerId: z.string().min(1, "Please select a customer."),
  productId: z.string().min(1, "Please select a product."),
  complaintDescription: z.string().min(10, "Description must be at least 10 characters."),
})

export default function ComplaintForm() {
  const [loading, setLoading] = useState(false)
  const [aiResult, setAiResult] = useState<PrioritizeComplaintsOutput | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: "",
      productId: "",
      complaintDescription: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    setAiResult(null)

    const customer = customers.find(c => c.id === values.customerId);
    const product = products.find(p => p.id === values.productId);

    if (!customer || !product) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid customer or product selected.",
      })
      setLoading(false)
      return
    }

    try {
      const result = await prioritizeComplaints({
        complaintDescription: values.complaintDescription,
        customerValue: customer.value,
        products: product.name,
      })
      setAiResult(result)
      toast({
        title: "Complaint Prioritized",
        description: "AI analysis complete. Review the suggestion below.",
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "AI Analysis Failed",
        description: "Could not prioritize the complaint. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="customerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {customers.map(customer => (
                      <SelectItem key={customer.id} value={customer.id}>{customer.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {products.map(product => (
                      <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="complaintDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complaint Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the issue in detail..."
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Analyze & Prioritize
          </Button>
        </form>
      </Form>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center"><Lightbulb className="mr-2 text-yellow-400" />AI Suggestion</h3>
        <Card className={!aiResult && !loading ? "flex items-center justify-center min-h-[200px]" : ""}>
          <CardContent className="p-6">
            {loading && (
              <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>Analyzing complaint...</p>
              </div>
            )}
            {!aiResult && !loading && (
              <div className="text-center text-muted-foreground">
                <p>AI suggestions will appear here after analysis.</p>
              </div>
            )}
            {aiResult && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Priority</h4>
                  <Badge variant={aiResult.priority === "High" ? "destructive" : "secondary"}>{aiResult.priority}</Badge>
                </div>
                <div>
                  <h4 className="font-semibold">Suggested Staff Member</h4>
                  <p>{aiResult.suggestedStaffMember}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Reasoning</h4>
                  <p className="text-sm text-muted-foreground">{aiResult.reasoning}</p>
                </div>
                <Button className="w-full">Accept Suggestion & Create Ticket</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
