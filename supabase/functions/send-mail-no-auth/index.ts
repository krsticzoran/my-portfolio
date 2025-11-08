import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@3.3.0";

serve(async ( req ) => {
  try {
    const payload = await req.json();
    const data = payload.record;
    const { email, message } = data;
    if (!email || !message) {
      return new Response("Invalid payload", {
        status: 400
      });
    }
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    const FROM_EMAIL = Deno.env.get("FROM_EMAIL");
    const TO_EMAIL = Deno.env.get("TO_EMAIL");
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `New message from ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #0d0d0d;">📩 New Contact Form Submission</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="padding: 10px; background-color: #f9f9f9; border-left: 4px solid #0070f3;">
            ${message.replace(/\n/g, "<br>")}
          </p>
          <hr style="margin: 20px 0;" />
          <small style="color: #777;">Sent via zkrstic.com contact form</small>
        </div>
      `
    });
    return new Response("Email sent successfully", {
      status: 200
    });
  } catch (error) {
    console.error("Edge Function error:", error);
    return new Response("Internal Server Error", {
      status: 500
    });
  }
});
