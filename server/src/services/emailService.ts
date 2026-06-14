import { Resend } from 'resend';
import { env } from '../config/env.js';
import { contactSubmissionSchema, type ContactSubmission } from '../schemas/siteSchemas.js';
import { HttpError, sanitizeText } from '../utils/http.js';

function formatSubmission(input: ContactSubmission) {
  return `
    <h2>New Krown Level Enterprises inquiry</h2>
    <p><strong>Name:</strong> ${sanitizeText(input.name)}</p>
    <p><strong>Email:</strong> ${sanitizeText(input.email)}</p>
    <p><strong>Phone:</strong> ${sanitizeText(input.phone)}</p>
    <p><strong>Interest:</strong> ${sanitizeText(input.interest)}</p>
    <p><strong>Preferred contact:</strong> ${sanitizeText(input.contactMethod)}</p>
    <p><strong>Best time:</strong> ${sanitizeText(input.bestTime)}</p>
    <p><strong>Message:</strong></p>
    <p>${sanitizeText(input.message).replace(/\n/g, '<br />')}</p>
  `;
}

export async function sendContactEmail(input: unknown) {
  const payload = contactSubmissionSchema.parse(input);
  if (payload.company) return { skipped: true };

  if (!env.RESEND_API_KEY) {
    if (env.NODE_ENV === 'production') throw new HttpError(503, 'Email service is not configured');
    console.warn('RESEND_API_KEY is not configured. Contact submission accepted without sending.');
    return { skipped: true };
  }

  const resend = new Resend(env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: env.CONTACT_TO_EMAIL,
    replyTo: payload.email,
    subject: `New KLE inquiry: ${payload.interest}`,
    html: formatSubmission(payload),
  });

  if (error) throw new HttpError(502, 'Unable to send contact email');
  return { id: data?.id };
}
