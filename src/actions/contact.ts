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

  const now = Date.now();

  // Honeypot check: if the hidden 'website' field is filled,
  // it indicates a bot submission since real users won't see or fill this field.
  if (data.website && data.website.trim() !== "") {
    return { success: false, message: "Honeypot field filled, likely a bot submission" };
  }

  // Check if form was submitted too quickly (less than 3 seconds)
  const elapsedTime = now - data.startTime;
  if (elapsedTime < 3000) {
    return { success: false, message: "Form submitted too quickly" };
  }

  // Check is message length too long
  if (data.message.length > 2000) {
    return { success: false, message: "Message is too long (max 2000 characters)" };
  }

   // Get client IP
   const headersList = await headers();
   const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const { success, reset } = await contactRateLimiter.limit(ip);

if (!success) {
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
