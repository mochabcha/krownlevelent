import { describe, expect, it } from 'vitest';
import { formatContactSubmissionEmail, formatContactSubmissionText } from '../src/templates/contactEmailTemplate.js';

const submission = {
  name: 'Avery & Co.',
  email: 'avery@example.com',
  phone: '904-555-0100',
  interest: 'Plant Klub',
  contactMethod: 'Email',
  bestTime: 'Weekday mornings',
  message: 'I would like to learn more.\nThank you!',
  company: '',
};

describe('contact email template', () => {
  it('renders the Krown Level brand, submission details, and an escaped message', () => {
    const email = formatContactSubmissionEmail(submission);

    expect(email).toContain('Krown Level Enterprises');
    expect(email).toContain('original-krown_wordmark.png');
    expect(email).toContain('Avery &amp; Co.');
    expect(email).toContain('mailto:avery@example.com');
    expect(email).toContain('I would like to learn more.\nThank you!');
  });

  it('provides a complete plain-text alternative', () => {
    expect(formatContactSubmissionText(submission)).toContain('Email: avery@example.com');
  });
});
