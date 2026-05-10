"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";

import { logError } from "@/lib/logger";
import { contactRateLimiter } from "@/lib/rate-limit";
import { sanitizeInput } from "@/lib/sanitize";

export async function submitContactForm(data: {
  email: string;
  message: string;
  website?: string;
  startTime: number;
}) {
  const now = Date.now();

  // Honeypot check
  if (data.website && data.website.trim() !== "") {
    return { success: false, message: "Honeypot field filled, likely a bot submission" };
  }

  // Check if message is empty or whitespace only
  if (!data.message.trim()) {
    return { success: false, message: "Comment cannot be empty or whitespace only" };
  }

  // Check if form was submitted too quickly (less than 3 seconds)
  const elapsedTime = now - data.startTime;
  if (elapsedTime < 3000) {
    return { success: false, message: "Form submitted too quickly" };
  }

  // Check message length
  if (data.message.length > 2000) {
    return { success: false, message: "Message is too long (max 2000 characters)" };
  }

  // Get client IP
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  // Rate limiting
  const { success, reset } = await contactRateLimiter.limit(ip);
  if (!success) {
    const minutes = Math.ceil((reset - now) / 1000 / 60);
    return {
      success: false,
      message: `Too many requests. Please try again in ${minutes} minute${minutes > 1 ? "s" : ""}.`,
    };
  }

  // Validate email format
  const isValidEmail = z.string().email().safeParse(data.email).success;
  if (!isValidEmail) return { success: false, message: "Invalid email" };

  // Sanitize message to prevent XSS
  const sanitizedMessage = sanitizeInput(data.message);

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.TO_EMAIL!,
      subject: `New message from ${data.email}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #0d0d0d;">📩 New Contact Form Submission</h2>
          <p><strong>From:</strong> ${data.email}</p>
          <p><strong>Message:</strong></p>
          <p style="padding: 10px; background-color: #f9f9f9; border-left: 4px solid #0070f3;">
            ${sanitizedMessage.replace(/\n/g, "<br>")}
          </p>
          <hr style="margin: 20px 0;" />
          <small style="color: #777;">Sent via zkrstic.dev contact form</small>
        </div>
      `,
    });

    if (error) {
      logError("Resend error:", error);
      return { success: false, message: "Failed to send email" };
    }

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send email";
    return { success: false, message };
  }
}
