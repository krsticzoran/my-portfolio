"use server"; 

import { headers } from "next/headers";

import { rateLimiter } from "@/lib/rate-limit";
import { supabaseServer } from "@/lib/supabaseServer";

export async function addComment( data: {
    comment:string;
    postSlug:string;
    website?: string;
} 
) {

   // it indicates a bot submission since real users won't see or fill this field.
   if (data.website && data.website.trim() !== "") {
    return { success: false, message: "Honeypot field filled, likely a bot submission" };
  }

  // Get client IP
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  // UPSTASH RATE LIMITING
  const { success, reset } = await rateLimiter.limit(ip);

  if (!success) {
    const now = Date.now();
    const minutes = Math.ceil((reset - now) / 1000 / 60);
    return {
      success: false,
      message: `Too many requests. Please try again in ${minutes} minute${minutes > 1 ? "s" : ""}.`,
    };
  }

    try {
        const supabase = supabaseServer();
        const { error } = await supabase.from("comments").insert({
            post_slug: data.postSlug,             
            comment: data.comment, 
            name: "Anonymous",
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
