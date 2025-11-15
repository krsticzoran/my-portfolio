"use server"; 

import { headers } from "next/headers";

import { commentsRateLimiter } from "@/lib/rate-limit";
import { sanitizeInput } from "@/lib/sanitize";
import { supabaseServer } from "@/lib/supabaseServer";
import { createClient } from "@/utils/supabase/server";

export async function addComment( data: {
    comment:string;
    postSlug:string;
    website?: string;
    startTime: number;
} 
) {

  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const now = Date.now();

   // it indicates a bot submission since real users won't see or fill this field.
   if (data.website && data.website.trim() !== "") {
    return { success: false, message: "Honeypot field filled, likely a bot submission" };
  }

  // Check if comment is empty or whitespace only
  if (!data.comment.trim()) {
    return { success: false, message: "Comment cannot be empty or whitespace only" };
  }

  // Check is comment length too long
  if (data.comment.length > 2000) {
    return { success: false, message: "Comment is too long (max 2000 characters)" };
  }

   // Check if form was submitted too quickly (less than 3 seconds)
   const elapsedTime = now - data.startTime;
   if (elapsedTime < 3000) {
     return { success: false, message: "Form submitted too quickly" };
   }

  // Get client IP
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  // UPSTASH RATE LIMITING
  const { success, reset } = await commentsRateLimiter.limit(ip);

  if (!success) {
    const minutes = Math.ceil((reset - now) / 1000 / 60);
    return {
      success: false,
      message: `Too many requests. Please try again in ${minutes} minute${minutes > 1 ? "s" : ""}.`,
    };
  }

  // Sanitize comment to prevent XSS
  const sanitizeComment = sanitizeInput(data.comment);

    try {
        const supabase = supabaseServer();
        const { error } = await supabase.from("comments").insert({
            post_slug: data.postSlug,             
            comment: sanitizeComment, 
            avatar_url: session?.user.user_metadata.avatar_url || null,
        name: session?.user.user_metadata.full_name || null,
        user_id: session?.user.id || null,
        });
    
        if (error) {
          console.error("Supabase insert error:", error);
          return { success: false, message: "Database error" };
        }
    
        return { success: true };
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to add comment";
        return { success: false, message };
      }
  
}
