import { Resend } from 'resend';
import { env } from '../config/env.js';
import { contactSubmissionSchema, type ContactSubmission } from '../schemas/siteSchemas.js';
import { formatContactSubmissionEmail, formatContactSubmissionText } from '../templates/contactEmailTemplate.js';
import { HttpError } from '../utils/http.js';

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
    html: formatContactSubmissionEmail(payload),
    text: formatContactSubmissionText(payload),
  });

  if (error) throw new HttpError(502, 'Unable to send contact email');
  return { id: data?.id };
}
