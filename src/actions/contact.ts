"use server";

export async function submitContactForm(data: {
  email: string;
  message: string;
  website?: string;
}) {
  if (data.website && data.website.trim() !== "") {
    // Honeypot field filled, likely a bot submission
    return { success: false, message: "Honeypot field filled, likely a bot submission" };
  }
  return { success: true, message: "Form submitted successfully", data };
}
