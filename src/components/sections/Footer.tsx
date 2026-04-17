import React from 'react';
import type { SalonData } from '../../types';
import Container from '../ui/Container';
import SvgIcon from '../ui/SvgIcon';

interface FooterProps {
  salon: SalonData;
}

const Footer: React.FC<FooterProps> = ({ salon }) => {
  const { footer, contact, hours, name, tagline } = salon;

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
      aria-label="Site footer"
    >
      {/* Main footer grid */}
      <Container>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14 md:py-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-display font-bold shrink-0"
                style={{ background: 'var(--color-accentPrimary)', color: 'var(--color-buttonPrimaryText)' }}
              >
                {salon.shortName.slice(0, 1)}
              </div>
              <span
                className="font-display text-xl tracking-widest"
                style={{ color: 'var(--color-textPrimary)' }}
              >
                {name}
              </span>
            </div>
            <p
              className="font-script text-xl"
              style={{ color: 'var(--color-accentSecondary)' }}
            >
              {tagline}
            </p>
            <p
              className="text-xs font-light leading-relaxed"
              style={{ color: 'var(--color-textMuted)' }}
            >
              {footer.tagline}
            </p>
            {/* Social icons */}
            <div className="flex gap-2 mt-2">
              {contact.socialLinks.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: 'var(--color-surfaceAlt)',
                    color: 'var(--color-textMuted)',
                    border: '1px solid var(--color-borderLight)',
                  }}
                >
                  <SvgIcon name={s.icon} size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-[10px] tracking-[0.25em] uppercase font-semibold mb-5"
              style={{ color: 'var(--color-accentPrimary)' }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-sm font-light tracking-wide transition-colors duration-200 flex items-center gap-2 group"
                    style={{ color: 'var(--color-textMuted)' }}
                  >
                    <span
                      className="w-4 h-px transition-all duration-200 group-hover:w-6"
                      style={{ background: 'var(--color-accentPrimary)' }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4
              className="text-[10px] tracking-[0.25em] uppercase font-semibold mb-5"
              style={{ color: 'var(--color-accentPrimary)' }}
            >
              Hours
            </h4>
            <div className="flex flex-col gap-2.5">
              {hours.schedule.map((day) => (
                <div key={day.day} className="flex justify-between gap-3">
                  <span className="text-xs font-light" style={{ color: 'var(--color-textMuted)' }}>{day.day.slice(0, 3)}</span>
                  <span
                    className="text-xs font-light"
                    style={{ color: day.isOpen ? 'var(--color-textSecondary)' : 'var(--color-textMuted)', fontStyle: day.isOpen ? 'normal' : 'italic' }}
                  >
                    {day.isOpen ? `${day.open} – ${day.close}` : 'Closed'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-[10px] tracking-[0.25em] uppercase font-semibold mb-5"
              style={{ color: 'var(--color-accentPrimary)' }}
            >
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { icon: 'mapPin', value: contact.fullAddress },
                { icon: 'phone', value: contact.phone, href: `tel:${contact.phone}` },
                { icon: 'mail', value: contact.email, href: `mailto:${contact.email}` },
              ].map((item) => (
                <div key={item.value} className="flex items-start gap-2">
                  <SvgIcon name={item.icon} size={13} style={{ color: 'var(--color-accentPrimary)', flexShrink: 0, marginTop: 2 }} />
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-xs font-light leading-relaxed transition-colors duration-200"
                      style={{ color: 'var(--color-textMuted)' }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--color-textMuted)' }}>
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div
        className="py-4"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[10px] tracking-wide font-light" style={{ color: 'var(--color-textMuted)' }}>
              {footer.copyright}
            </p>
            <div className="flex items-center gap-4">
              {footer.legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[10px] tracking-wide font-light transition-colors duration-200"
                  style={{ color: 'var(--color-textMuted)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
