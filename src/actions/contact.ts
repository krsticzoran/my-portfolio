"use server";

import { LRUCache } from "lru-cache"; //
import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimiter = new LRUCache<string, { count: number }>({
  max: 1000,
  ttl: 15 * 60 * 1000,
});

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
  const headersList = await headers();
  // Get client IP address from headers;
  // "x-forwarded-for" may contain multiple IPs, take the first (original client IP)
  // If not found, fallback to "unknown"
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  // Check if there is an existing entry for this IP in the cache
  const entry = rateLimiter.get(ip);

  // If entry exists and request count has reached or exceeded the limit (5 in this example),
  // block further requests and return a rate limit message
  if (entry && entry.count >= 5) {
    return { success: false, message: "Too many requests. Please try again later." };
  }

  // If limit not reached, increment the request count for this IP
  // Set or update the cache entry, which also resets the TTL
  rateLimiter.set(ip, { count: entry ? entry.count + 1 : 1 });

  // Honeypot check: if the hidden 'website' field is filled,
  // it indicates a bot submission since real users won't see or fill this field.
  if (data.website && data.website.trim() !== "") {
    return { success: false, message: "Honeypot field filled, likely a bot submission" };
  }
  // If the form is submitted too quickly (less than 3 seconds here),
  // it is likely a bot, since humans usually take longer to fill out forms.

  const elapsedTime = now - data.startTime;

  if (elapsedTime < 3000) {
    return { success: false, message: "Form submitted too quickly, likely a bot" };
  }

  const isValidEmail = z.string().email().safeParse(data.email).success;
  if (!isValidEmail) return { success: false, message: "Invalid email" };

  const sanitizedMessage = sanitizeMessage(data.message);

  try {
    await resend.emails.send({
      from: "website@zkrstic.dev",
      to: "zorankrstic81@gmail.com",
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
        <small style="color: #777;">Sent via zkrstic.com contact form</small>
      </div>
    `,
    });
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send email";
    return { success: false, message };
  }
}
