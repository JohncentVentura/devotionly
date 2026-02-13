"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!firstName || !email || !message) {
    throw new Error("Missing required fields");
  }

  await resend.emails.send({
    from: "Devotionly <onboarding@resend.dev>", // works on free plan
    to: [process.env.CONTACT_RECEIVER_EMAIL!],
    replyTo: email,
    subject: `New Contact Message from ${firstName} ${lastName}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `,
  });
}
