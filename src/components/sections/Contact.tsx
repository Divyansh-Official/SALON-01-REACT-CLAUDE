import React, { useState } from 'react';
import type { SalonData } from '../../types';
import Container from '../ui/Container';
import SectionLabel from '../ui/SectionLabel';
import SvgIcon from '../ui/SvgIcon';
import Button from '../ui/Button';
import Input from '../ui/Input';
import AnimatedReveal from '../ui/AnimatedReveal';

interface ContactProps {
  salon: SalonData;
}

const Contact: React.FC<ContactProps> = ({ salon }) => {
  const { contact } = salon;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'var(--color-backgroundAlt)' }}
      aria-label="Contact"
    >
      {/* Section label top left */}
      <div className="absolute top-0 left-0">
        <SectionLabel align="left">{contact.sectionLabel}</SectionLabel>
      </div>

      {/* Watermark */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-bold pointer-events-none select-none text-[200px] leading-none hidden lg:block"
        style={{ color: 'rgba(184,150,90,0.025)' }}
        aria-hidden="true"
      >
        tact
      </div>

      <Container className="pt-10">
        <AnimatedReveal direction="up">
          <div className="text-center mb-14">
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: 'var(--color-textPrimary)' }}>
              {contact.title}
            </h2>
            <p className="mt-4 text-sm tracking-[0.18em] uppercase" style={{ color: 'var(--color-textMuted)' }}>
              {contact.subtitle}
            </p>
          </div>
        </AnimatedReveal>

        {/* Map + Form */}
        <div className="grid lg:grid-cols-2 gap-0 mb-14" style={{ border: '1px solid var(--color-border)' }}>
          {/* Map */}
          <AnimatedReveal direction="right" className="min-h-64 lg:min-h-96">
            <div className="relative h-full min-h-64">
              <iframe
                src={contact.mapEmbedUrl}
                title="Salon location map"
                className="w-full h-full"
                style={{
                  filter: 'grayscale(1) invert(0.85) contrast(0.9)',
                  minHeight: '300px',
                  display: 'block',
                  border: 'none',
                }}
                loading="lazy"
                aria-label={`Map showing salon location at ${contact.fullAddress}`}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'rgba(13,12,10,0.3)', mixBlendMode: 'multiply' }}
              />
            </div>
          </AnimatedReveal>

          {/* Contact form */}
          <AnimatedReveal direction="left" delay={100}>
            <div className="p-8 md:p-10 h-full flex flex-col" style={{ background: 'var(--color-surface)', borderLeft: '1px solid var(--color-border)' }}>
              <p className="font-script text-2xl mb-6" style={{ color: 'var(--color-accentSecondary)' }}>
                Get In Touch
              </p>
              {sent ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
                  <SvgIcon name="checkCircle" size={40} style={{ color: 'var(--color-success)' }} />
                  <p className="font-display text-xl font-light" style={{ color: 'var(--color-textPrimary)' }}>Message Sent</p>
                  <p className="text-sm font-light" style={{ color: 'var(--color-textSecondary)' }}>
                    We will be in touch with you shortly.
                  </p>
                  <button onClick={() => { setSent(false); setFormData({ name: '', email: '', message: '' }); }} className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-accentSecondary)' }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4 flex-1">
                  <Input
                    label="Your Name"
                    type="text"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: (e.target as HTMLInputElement).value }))}
                  />
                  <Input
                    label="Your Email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: (e.target as HTMLInputElement).value }))}
                  />
                  <Input
                    label="Your Message"
                    multiline
                    rows={4}
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: (e.target as HTMLTextAreaElement).value }))}
                  />
                  <Button variant="primary" size="md" onClick={handleSend} disabled={sending} className="mt-auto">
                    {sending ? 'Sending...' : 'Send Message'}
                    {!sending && <SvgIcon name="send" size={14} />}
                  </Button>
                </div>
              )}
            </div>
          </AnimatedReveal>
        </div>

        {/* Contact info cards */}
        <AnimatedReveal direction="up" delay={80}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: 'mapPin', label: 'Address', value: contact.fullAddress, href: `https://maps.google.com/?q=${encodeURIComponent(contact.fullAddress)}`, external: true },
              { icon: 'phone', label: 'Phone', value: contact.phone, href: `tel:${contact.phone}`, external: false },
              { icon: 'mail', label: 'Email', value: contact.email, href: `mailto:${contact.email}`, external: false },
              { icon: 'whatsapp', label: 'WhatsApp', value: 'Message us', href: `https://wa.me/${contact.whatsapp}`, external: true },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="flex flex-col gap-3 p-5 transition-all duration-200 group hover:-translate-y-0.5"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center transition-colors duration-200"
                  style={{ background: 'rgba(184,150,90,0.1)', color: 'var(--color-accentPrimary)', border: '1px solid rgba(184,150,90,0.2)' }}
                >
                  <SvgIcon name={item.icon} size={18} />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.15em] uppercase mb-1 font-medium" style={{ color: 'var(--color-textMuted)' }}>{item.label}</p>
                  <p className="text-sm font-light" style={{ color: 'var(--color-textSecondary)' }}>{item.value}</p>
                </div>
              </a>
            ))}
          </div>
        </AnimatedReveal>

        {/* Social links */}
        <AnimatedReveal direction="up" delay={100} className="mt-8">
          <div
            className="flex flex-wrap items-center justify-between gap-4 p-6"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >
            <p className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--color-textMuted)' }}>
              Follow Us
            </p>
            <div className="flex gap-3">
              {contact.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.platform} — ${social.handle}`}
                  className="flex items-center gap-2 px-4 py-2.5 transition-all duration-200 group hover:-translate-y-0.5"
                  style={{
                    background: 'var(--color-surfaceAlt)',
                    color: 'var(--color-textSecondary)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <SvgIcon name={social.icon} size={15} />
                  <span className="text-[11px] tracking-wide hidden sm:inline">{social.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </AnimatedReveal>

        {/* Amenities + info row */}
        <AnimatedReveal direction="up" delay={120} className="mt-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {salon.amenities.map((amenity) => (
              <div
                key={amenity.title}
                className="flex items-start gap-3 p-4"
                style={{ background: 'var(--color-surfaceAlt)', border: '1px solid var(--color-border)' }}
              >
                <SvgIcon name={amenity.icon} size={16} style={{ color: 'var(--color-accentPrimary)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-textSecondary)' }}>{amenity.title}</p>
                  <p className="text-[10px] font-light mt-0.5 leading-relaxed" style={{ color: 'var(--color-textMuted)' }}>{amenity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedReveal>
      </Container>
    </section>
  );
};

export default Contact;
