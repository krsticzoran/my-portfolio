"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { submitContactForm } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define the schema for the contact form using Zod
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  startTime: z.number(),
  website: z.string().optional(), // honeypot
});

export default function ContactForm() {
  // Initialize the form with react-hook-form and Zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      message: "",
      startTime: Date.now(),
      website: "", // honeypot field
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { reset } = form;

  // Function to handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await submitContactForm(values);
      if (result.success) {
        toast.success("Message sent successfully!");
        reset();
      } else {
        toast.error(result.message || "Error sending message", {
          style: {
            background: "#F44336",
            color: "white",
            border: "none",
          },
          duration: 5000,
        });
      }
    } catch {
      toast.error("Server error", {
        style: {
          background: "#F44336",
          color: "white",
          border: "none",
        },
        duration: 5000,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} />
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
                <textarea
                  placeholder="Your message here..."
                  className="flex min-h-[80px]  w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  rows={7}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* honeypot field to prevent spam  */}
        <FormField
          control={form.control}
          name="website" // honeypot field
          render={({ field }) => (
            <FormItem className="hidden">
              {" "}
              {/* hide for users */}
              <FormLabel className="sr-only">Website</FormLabel>
              <FormControl>
                <Input type="text" autoComplete="off" tabIndex={-1} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="px-6 py-2 text-sm lg:text-base rounded-full font-semibold bg-foreground text-background hover:bg-zinc-700 transition-colors duration-300 capitalize cursor-pointer"
        >
          {form.formState.isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}
