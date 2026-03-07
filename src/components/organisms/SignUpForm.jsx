import { useState } from 'react';
import { motion } from 'framer-motion';
import { Typography, Button, Input, Select, Textarea } from '../atoms';
import { FormField } from '../molecules';

const interestOptions = [
  { value: 'plant-klub', label: 'Plant Klub' },
  { value: 'plant-klub-tickets', label: 'Plant Klub Tickets' },
  { value: 'wellness', label: 'Wellness Consultation' },
  { value: 'home-garden', label: 'Home Garden Installation' },
  { value: 'sage-defense', label: 'SAGE Defense Systems' },
  { value: 'general', label: 'General Inquiry' },
];

const contactMethods = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'text', label: 'Text Message' },
];

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    contactMethod: '',
    message: '',
    bestTime: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-galaxy-1 galaxy-stars" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Typography variant="eyebrow" animate className="text-brand-gold mb-3 text-center">
            Get Connected
          </Typography>
          <Typography variant="h2" animate delay={0.1} className="text-white mb-4">
            Start Your Journey
          </Typography>
          <Typography variant="body" animate delay={0.2} className="text-white/70 max-w-xl mx-auto">
            Whether you want to join Plant Klub, book a consultation, explore self-defense training, or ask a question, start here.
          </Typography>
        </div>

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
              <Typography variant="h3" className="text-white mb-4">
                Thank You!
              </Typography>
              <Typography variant="body" className="text-white/70">
                Your interest has been submitted. Charli will be in touch soon.
              </Typography>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-10 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField label="Full Name" required>
                  <Input
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:ring-brand-gold/50 focus:border-brand-gold"
                  />
                </FormField>
                <FormField label="Email" required>
                  <Input
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:ring-brand-gold/50 focus:border-brand-gold"
                  />
                </FormField>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <FormField label="Phone Number">
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="(904) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:ring-brand-gold/50 focus:border-brand-gold"
                  />
                </FormField>
                <FormField label="Area of Interest" required>
                  <Select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    placeholder="Select your interest"
                    options={interestOptions}
                    required
                    className="bg-white/10 border-white/20 text-white focus:ring-brand-gold/50 focus:border-brand-gold [&_option]:text-ink"
                  />
                </FormField>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <FormField label="Preferred Contact Method">
                  <Select
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleChange}
                    placeholder="How should we reach you?"
                    options={contactMethods}
                    className="bg-white/10 border-white/20 text-white focus:ring-brand-gold/50 focus:border-brand-gold [&_option]:text-ink"
                  />
                </FormField>
                <FormField label="Best Time to Reach You">
                  <Input
                    name="bestTime"
                    placeholder="e.g. Weekday mornings"
                    value={formData.bestTime}
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:ring-brand-gold/50 focus:border-brand-gold"
                  />
                </FormField>
              </div>

              <FormField label="What are you looking for support with?">
                <Textarea
                  name="message"
                  placeholder="Tell us a little about what you're looking for..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:ring-brand-gold/50 focus:border-brand-gold"
                />
              </FormField>

              <div className="text-center pt-4">
                <Button variant="cta" type="submit">
                  Submit Your Interest
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
