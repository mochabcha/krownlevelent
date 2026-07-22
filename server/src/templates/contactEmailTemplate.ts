import { env } from '../config/env.js';
import type { ContactSubmission } from '../schemas/siteSchemas.js';

const BRAND = {
  name: 'Krown Level Enterprises',
  website: (env.APP_ORIGIN || 'https://www.krownlevel.com').replace(/\/$/, ''),
  colors: {
    ink: '#0D0A14',
    surface: '#1A1525',
    gold: '#D4A843',
    cream: '#FBF5E6',
    muted: '#6F6877',
    border: '#E9E2D5',
  },
};

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function display(value: string) {
  return value.trim() || 'Not provided';
}

function logoUrl() {
  const baseUrl = env.S3_PUBLIC_BASE_URL?.replace(/\/$/, '');
  const prefix = env.S3_PREFIX?.replace(/^\/+|\/+$/g, '');
  if (!baseUrl) return '';
  return `${baseUrl}/${prefix ? `${prefix}/` : ''}media/default/krownWordMark/original-krown_wordmark.png`;
}

function detailRow(label: string, value: string, href?: string) {
  const content = href ? `<a href="${escapeHtml(href)}" style="color: #1A7D45; text-decoration: none;">${escapeHtml(value)}</a>` : escapeHtml(value);
  return `
    <tr>
      <td style="padding: 10px 0; color: ${BRAND.colors.muted}; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; vertical-align: top; width: 38%;">${label}</td>
      <td style="padding: 10px 0; color: #201B27; font-size: 15px; line-height: 1.5;">${content}</td>
    </tr>`;
}

export function formatContactSubmissionEmail(input: ContactSubmission) {
  const logo = logoUrl();
  const name = display(input.name);
  const email = display(input.email);
  const phone = display(input.phone);
  const interest = display(input.interest);
  const contactMethod = display(input.contactMethod);
  const bestTime = display(input.bestTime);
  const message = display(input.message);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New Krown Level inquiry</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: ${BRAND.colors.cream}; color: #201B27; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: ${BRAND.colors.cream};">
      <tr>
        <td align="center" style="padding: 32px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 640px; overflow: hidden; border-radius: 20px; background-color: #FFFFFF; box-shadow: 0 12px 36px rgba(13, 10, 20, 0.14);">
            <tr>
              <td align="center" style="padding: 32px 32px 28px; background: linear-gradient(145deg, ${BRAND.colors.ink} 0%, ${BRAND.colors.surface} 72%, #2D1B69 100%);">
                ${logo ? `<img src="${escapeHtml(logo)}" alt="${BRAND.name}" width="164" style="display: block; width: 164px; max-width: 100%; height: auto; margin: 0 auto 24px;" />` : `<p style="margin: 0 0 24px; color: ${BRAND.colors.gold}; font-size: 20px; font-weight: 700;">${BRAND.name}</p>`}
                <p style="margin: 0 0 8px; color: ${BRAND.colors.gold}; font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;">New website inquiry</p>
                <h1 style="margin: 0; color: #FFFFFF; font-family: Georgia, 'Times New Roman', serif; font-size: 30px; font-weight: 500; line-height: 1.2;">${escapeHtml(name)} reached out.</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px;">
                <p style="margin: 0 0 24px; color: #4B4552; font-size: 16px; line-height: 1.65;">A new inquiry was submitted through the Krown Level Enterprises website. Reply directly to this email to respond to ${escapeHtml(name)}.</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top: 1px solid ${BRAND.colors.border}; border-bottom: 1px solid ${BRAND.colors.border};">
                  ${detailRow('Email', email, `mailto:${input.email}`)}
                  ${detailRow('Phone', phone, input.phone ? `tel:${input.phone.replace(/[^+\d]/g, '')}` : undefined)}
                  ${detailRow('Interested in', interest)}
                  ${detailRow('Preferred contact', contactMethod)}
                  ${detailRow('Best time', bestTime)}
                </table>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 28px;">
                  <tr>
                    <td style="padding: 20px 22px; border-left: 4px solid ${BRAND.colors.gold}; border-radius: 0 10px 10px 0; background-color: #FBF8F1;">
                      <p style="margin: 0 0 8px; color: ${BRAND.colors.muted}; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">Their message</p>
                      <p style="margin: 0; color: #302A36; font-size: 16px; line-height: 1.65; white-space: pre-line;">${escapeHtml(message)}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 22px 32px; background-color: ${BRAND.colors.ink};">
                <p style="margin: 0; color: #D9D2E0; font-size: 13px; line-height: 1.5;">Krown Level Enterprises &middot; <a href="${escapeHtml(BRAND.website)}" style="color: ${BRAND.colors.gold}; text-decoration: none;">Visit website</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function formatContactSubmissionText(input: ContactSubmission) {
  return [
    'New Krown Level Enterprises website inquiry',
    '',
    `Name: ${display(input.name)}`,
    `Email: ${display(input.email)}`,
    `Phone: ${display(input.phone)}`,
    `Interest: ${display(input.interest)}`,
    `Preferred contact: ${display(input.contactMethod)}`,
    `Best time: ${display(input.bestTime)}`,
    '',
    'Message:',
    display(input.message),
  ].join('\n');
}
