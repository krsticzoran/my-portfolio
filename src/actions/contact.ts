"use server";

export async function submitContactForm(data: { email: string; message: string }) {
  return { success: true, message: "Form submitted successfully", data };
}
