"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { contactRateLimiter } from "@/lib/rate-limit";
import { supabaseServer } from "@/lib/supabaseServer";

const sanitizeMessage = (input: string) => {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").substring(0, 2000);
};

export async function submitContactForm(data: {
  email: string;
  message: string;
  website?: string;
  startTime: number;
}) {

  // Honeypot check: if the hidden 'website' field is filled,
  // it indicates a bot submission since real users won't see or fill this field.
  if (data.website && data.website.trim() !== "") {
    return { success: false, message: "Honeypot field filled, likely a bot submission" };
  }

   // Get client IP
   const headersList = await headers();
   const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const { success, reset } = await contactRateLimiter.limit(ip);

if (!success) {
  const now = Date.now();
  const minutes = Math.ceil((reset - now) / 1000 / 60);
  return {
    success: false,
    message: `Too many requests. Please try again in ${minutes} minute${minutes > 1 ? "s" : ""}.`,
  };
}

  const isValidEmail = z.string().email().safeParse(data.email).success;
  if (!isValidEmail) return { success: false, message: "Invalid email" };

  const sanitizedMessage = sanitizeMessage(data.message);

  try {
    const supabase = supabaseServer();
    const { error } = await supabase.from("contact_messages").insert({
      email: data.email,
      message: sanitizedMessage,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, message: "Database error" };
    }

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send email";
    return { success: false, message };
  }
}
