"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PageBanner } from "@/components/page-banner"
import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

type ContactFormValues = z.infer<typeof formSchema>

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: ContactFormValues) {
    try {
      setIsLoading(true)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      toast.success("Message sent successfully! We'll get back to you soon.")
      form.reset()
    } catch (error: any) {
      toast.error(error.message || "Failed to send message")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <PageBanner 
        title="Contact Us" 
        description="Get in touch with us to discuss your next project"
        backgroundImage="/images/banners/contact-banner.jpg"
        className="min-h-[200px] sm:min-h-[300px]"
      />
      
      <div className="container py-8 sm:py-16">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          <Card>
            <CardHeader className="p-4 sm:p-6 text-lg font-semibold">
              Send us a Message
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            {...field} 
                            disabled={isLoading}
                          />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Your email" 
                            {...field} 
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message" 
                            rows={5} 
                            {...field} 
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 sm:p-6 text-lg font-semibold">
              Contact Information
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-2">Address</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  4th street, Graceville Estate<br />
                  Makana 9mile<br />
                  Port Moresby, Papua New Guinea
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-2">Phone</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  +675 71570096<br />
                  +675 82970802
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-2">Email</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  apsiitese@gmail.com
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-2">Business Hours</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Monday - Friday: 8:00 AM - 6:00 PM<br />
                  Saturday - Sunday: Closed
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 