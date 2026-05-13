import { z } from "zod";

export const contactFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message cannot exceed 2000 characters"),
  startTime: z.number(),
  website: z.string().optional(), // honeypot
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
