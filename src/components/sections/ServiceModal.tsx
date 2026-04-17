import React, { useEffect } from 'react';
import type { Service } from '../../types';
import SvgIcon from '../ui/SvgIcon';
import Button from '../ui/Button';
import { formatPrice, formatDuration } from '../../utils/format';

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
  onAddToBooking?: (subServiceId: string, serviceId: string) => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onAddToBooking }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const handleBook = (subId: string) => {
    if (onAddToBooking) {
      onAddToBooking(subId, service.id);
    }
    onClose();
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${service.title} details`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'var(--color-overlayDark)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-borderLight)',
        }}
      >
        {/* Header image */}
        <div className="relative h-56 md:h-72 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, var(--color-surface) 0%, transparent 60%)',
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200"
            style={{
              background: 'rgba(13,12,10,0.7)',
              color: 'var(--color-textPrimary)',
              border: '1px solid var(--color-border)',
            }}
            aria-label="Close modal"
          >
            <SvgIcon name="close" size={18} />
          </button>
          <div className="absolute bottom-4 left-6">
            <p
              className="text-[10px] tracking-[0.2em] uppercase font-medium mb-1"
              style={{ color: 'var(--color-accentSecondary)' }}
            >
              {service.category}
            </p>
            <h2
              className="font-display text-3xl md:text-4xl font-light"
              style={{ color: 'var(--color-textPrimary)' }}
            >
              {service.title}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          <p
            className="text-sm font-light leading-relaxed mb-8"
            style={{ color: 'var(--color-textSecondary)' }}
          >
            {service.description}
          </p>

          <h3
            className="text-[10px] tracking-[0.25em] uppercase font-medium mb-5"
            style={{ color: 'var(--color-accentPrimary)' }}
          >
            Available Services
          </h3>

          <div className="grid gap-3">
            {service.subServices.map((sub) => (
              <div
                key={sub.id}
                className="flex items-center gap-4 p-4 transition-all duration-200 group"
                style={{
                  background: 'var(--color-surfaceAlt)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {sub.image && (
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="w-16 h-16 object-cover shrink-0 hidden sm:block"
                    loading="lazy"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <p
                        className="font-medium text-sm"
                        style={{ color: 'var(--color-textPrimary)' }}
                      >
                        {sub.name}
                      </p>
                      <p
                        className="text-xs font-light mt-0.5 leading-relaxed"
                        style={{ color: 'var(--color-textMuted)' }}
                      >
                        {sub.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        {sub.originalPrice && (
                          <p
                            className="text-[10px] line-through"
                            style={{ color: 'var(--color-textMuted)' }}
                          >
                            {formatPrice(sub.originalPrice)}
                          </p>
                        )}
                        <p
                          className="font-display text-lg font-semibold"
                          style={{ color: 'var(--color-accentPrimary)' }}
                        >
                          {formatPrice(sub.price)}
                        </p>
                        <p
                          className="text-[10px]"
                          style={{ color: 'var(--color-textMuted)' }}
                        >
                          {formatDuration(sub.duration)}
                        </p>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleBook(sub.id)}
                        aria-label={`Add ${sub.name} to booking`}
                      >
                        <SvgIcon name="plus" size={12} />
                        Book
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            <Button variant="ghost" size="md" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              onClick={() => {
                onClose();
                setTimeout(() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }), 300);
              }}
            >
              Go to Booking
              <SvgIcon name="arrowRight" size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
