"use server";

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
  // If the form is submitted too quickly (less than 3 seconds here),
  // it is likely a bot, since humans usually take longer to fill out forms.
  const now = Date.now();
  const elapsedTime = now - data.startTime;

  if (elapsedTime < 3000) {
    return { success: false, message: "Form submitted too quickly, likely a bot" };
  }

  return { success: true, message: "Form submitted successfully", data };
}
