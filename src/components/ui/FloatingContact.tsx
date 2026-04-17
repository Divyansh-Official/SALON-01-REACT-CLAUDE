import React, { useState } from 'react';
import type { SalonData } from '../../types';
import SvgIcon from '../ui/SvgIcon';

interface FloatingContactProps {
  salon: SalonData;
}

const FloatingContact: React.FC<FloatingContactProps> = ({ salon }) => {
  const [open, setOpen] = useState(false);
  const { contact } = salon;

  const actions = [
    { icon: 'phone', label: 'Call Us', href: `tel:${contact.phone}`, color: 'var(--color-accentPrimary)' },
    { icon: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/${contact.whatsapp}`, color: '#25D366' },
    { icon: 'mail', label: 'Email', href: `mailto:${contact.email}`, color: 'var(--color-accentSecondary)' },
  ];

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3" aria-label="Contact shortcuts">
      {/* Action items */}
      <div
        className="flex flex-col items-end gap-2 transition-all duration-300"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(12px)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {actions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            target={action.icon !== 'phone' ? '_blank' : undefined}
            rel={action.icon !== 'phone' ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-2 px-3 py-2 rounded-full shadow-lg transition-transform duration-200 hover:scale-105"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-borderLight)',
              color: action.color,
            }}
            aria-label={action.label}
            onClick={() => setOpen(false)}
          >
            <span className="text-[11px] font-medium tracking-wide" style={{ color: 'var(--color-textSecondary)' }}>
              {action.label}
            </span>
            <SvgIcon name={action.icon} size={18} style={{ color: action.color }} />
          </a>
        ))}
      </div>

      {/* Toggle button */}
      <button
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300"
        style={{
          background: 'var(--color-accentPrimary)',
          color: 'var(--color-buttonPrimaryText)',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close contact options' : 'Open contact options'}
        aria-expanded={open}
      >
        <SvgIcon name={open ? 'close' : 'phone'} size={20} />
      </button>
    </div>
  );
};

export default FloatingContact;
