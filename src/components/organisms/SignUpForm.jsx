import { useState } from 'react';
import { motion } from 'framer-motion';
import { FormField, SectionHeader, CTAGroup } from '../molecules';
import AdminEditButton from '../admin/AdminEditButton';

const interestOptions = [
  { value: 'plant-klub', label: 'Plant Klub' },
  { value: 'plant-klub-tickets', label: 'Plant Klub Tickets' },
  { value: 'wellness', label: 'Wellness Consultation' },
  { value: 'home-garden', label: 'Home Garden Installation' },
  { value: 'financial-literacy', label: 'Financial Literacy' },
  { value: 'sage-defense', label: 'SAGE Defense Systems' },
  { value: 'general', label: 'General Inquiry' },
];

const contactMethods = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'text', label: 'Text Message' },
];

export default function SignUpForm({ content = {} }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    contactMethod: '',
    message: '',
    bestTime: '',
    company: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Unable to submit your interest right now.');
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden">
      <AdminEditButton target={{ group: 'sign-up' }} />
      <div className="absolute inset-0 bg-galaxy-1 galaxy-stars" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={content.eyebrow || 'Get Connected'}
          heading={content.heading || 'Start Your Journey'}
          lead={content.lead || 'Whether you want to join Plant Klub, book a consultation, explore financial literacy or self-defense training, or ask a question, start here.'}
          align="center"
          animate
          onDark
          eyebrowColor="text-brand-gold"
          leadColor="text-white/70 max-w-xl mx-auto"
          headingClassName="mb-4"
          className="mb-12"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {submitted ? (
            <motion.div
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-brand-green text-3xl">✓</span>
              </div>
              <SectionHeader
                heading={content.successHeading || 'Thank You!'}
                headingVariant="h3"
                lead={content.successLead || 'Your interest has been submitted. Charli will be in touch soon.'}
                align="center"
                onDark
                leadColor="text-white/70"
                headingClassName="mb-4"
                className="mb-0"
              />
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-10 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField label="Full Name" required onDark type="text" name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} />
                <FormField label="Email" required onDark type="email" name="email" placeholder="you@email.com" value={formData.email} onChange={handleChange} />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <FormField label="Phone Number" onDark type="tel" name="phone" placeholder="(904) 000-0000" value={formData.phone} onChange={handleChange} />
                <FormField label="Area of Interest" required onDark type="select" name="interest" placeholder="Select your interest" value={formData.interest} onChange={handleChange} options={interestOptions} />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <FormField label="Preferred Contact Method" onDark type="select" name="contactMethod" placeholder="How should we reach you?" value={formData.contactMethod} onChange={handleChange} options={contactMethods} />
                <FormField label="Best Time to Reach You" onDark type="text" name="bestTime" placeholder="e.g. Weekday mornings" value={formData.bestTime} onChange={handleChange} />
              </div>

              <FormField label="What are you looking for support with?" onDark type="textarea" name="message" placeholder="Tell us a little about what you're looking for..." value={formData.message} onChange={handleChange} rows={4} />
              <input type="text" name="company" value={formData.company} onChange={handleChange} className="hidden" tabIndex="-1" autoComplete="off" />
              {error && <p className="text-center text-sm text-red-200">{error}</p>}

              <div className="text-center pt-4">
                <CTAGroup primary={{ label: 'Submit Your Interest', variant: 'cta', type: 'submit' }} align="center" />
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
