"use server";

export async function submitContactForm(data: { email: string; message: string }) {
  console.log("Server received:", data);

  return { success: true, message: "Form submitted successfully" };
}
