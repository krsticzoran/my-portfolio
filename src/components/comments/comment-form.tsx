"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { addComment } from "@/actions/comment";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "../ui/input";

const formSchema = z.object({
  comment: z.string().min(1, "Comment cannot be empty"),
  startTime: z.number(),
  website: z.string().optional(), // honeypot
});

export default function CommentForm({ slug }: { slug: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { comment: "", startTime: Date.now(), website: "" },
  });

  const { reset } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await addComment({
        comment: values.comment,
        postSlug: slug,
        startTime: values.startTime,
        website: values.website,
      });
      if (result.success) {
        toast.success("Comment added successfully!");
        reset();
      } else {
        toast.error(result.message || "Error adding comment", {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <textarea
                  placeholder="Your comment here..."
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
          className="px-6 py-2 text-sm lg:text-base rounded-full font-semibold"
        >
          {form.formState.isSubmitting ? "Sending..." : "Send Comment"}
        </Button>
      </form>
    </Form>
  );
}
