"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createBrowserClient } from "@supabase/ssr";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

import { addComment } from "@/actions/comment";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useAuth } from "@/providers/auth-provider";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

const formSchema = z.object({
  comment: z.string().min(1, "Comment cannot be empty"),
  startTime: z.number(),
  website: z.string().optional(), // honeypot
  name: z.string(),
  avatar_url: z.string(),
  user_id: z.string(),
});

export default function CommentForm({ slug }: { slug: string }) {
  const router = useRouter();

  const { isAuthenticated, user, setUser } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { comment: "", startTime: Date.now(), website: "", name: "", avatar_url: "" },
  });

  const { reset } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await addComment({
        comment: values.comment,
        postSlug: slug,
        startTime: values.startTime,
        website: values.website,
        name: user?.name || "Anonymous",
        avatar_url: user?.avatar_url || "/avatar.webp",
        user_id: user ? user.user_id : "guest",
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

  const handleLogin = async () => {
    const currentUrl = window.location.href;

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(currentUrl)}`,
      },
    });
  };

  const handleLogout = async () => {
    const currentUrl = window.location.pathname + window.location.search;
    await fetch(`/auth/logout?next=${encodeURIComponent(currentUrl)}`);
    setUser(null);
    router.refresh();
  };

  return (
    <div className="flex w-full gap-5">
      <button
        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden cursor-pointer"
        onClick={handleLogout}
      >
        <Image
          src={user?.avatar_url || "/avatar.webp"}
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      </button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4 transition-all duration-300"
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <textarea
                    placeholder="Your comment here..."
                    className="flex min-h-[80px]  w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    onClick={() => {
                      if (!isAuthenticated) handleLogin();
                    }}
                    rows={isAuthenticated ? 7 : 3}
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
            className={`px-6 py-2  text-sm lg:text-base rounded-full font-semibold ${isAuthenticated ? "visible mb-12" : "invisible"} cursor-pointer`}
          >
            {form.formState.isSubmitting ? "Sending..." : "Send Comment"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
