import React, { useState } from 'react';
import type { SalonData, Service } from '../../types';
import Container from '../ui/Container';
import SectionLabel from '../ui/SectionLabel';
import SvgIcon from '../ui/SvgIcon';
import AnimatedReveal from '../ui/AnimatedReveal';
import { formatPrice } from '../../utils/format';
import ServiceModal from './ServiceModal';

interface ServicesProps {
  salon: SalonData;
  onAddToBooking?: (subServiceId: string, serviceId: string) => void;
}

const ServiceCard: React.FC<{
  service: Service;
  index: number;
  onExplore: (service: Service) => void;
  onBook: (service: Service) => void;
}> = ({ service, index, onExplore, onBook }) => {
  const [hovered, setHovered] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div
      className="relative overflow-hidden cursor-pointer group"
      style={{
        border: `1px solid var(--color-border)`,
        aspectRatio: index % 2 === 0 ? '3/4' : '4/5',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onExplore(service)}
      tabIndex={0}
      role="button"
      aria-label={`Explore ${service.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onExplore(service)}
    >
      {/* Image */}
      <img
        src={service.image}
        alt={service.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
        style={{ transform: hovered ? 'scale(1.07)' : 'scale(1)' }}
      />

      {/* Always-on gradient for mobile readability */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(to top, rgba(13,12,10,0.92) 0%, rgba(13,12,10,0.3) 55%, transparent 100%)',
          opacity: hovered || isMobile ? 1 : 0.7,
        }}
      />

      {/* Top hover overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-400"
        style={{
          background: 'rgba(13,12,10,0.25)',
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Number badge */}
      <div
        className="absolute top-4 left-4 px-3 py-1.5 z-10"
        style={{
          background: 'var(--color-accentPrimary)',
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)',
        }}
      >
        <span
          className="font-display text-lg font-bold"
          style={{ color: 'var(--color-buttonPrimaryText)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Icon top-right */}
      <div
        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full z-10 transition-all duration-300"
        style={{
          background: 'rgba(184,150,90,0.2)',
          color: 'var(--color-accentSecondary)',
          border: '1px solid rgba(184,150,90,0.3)',
          opacity: hovered ? 1 : 0.7,
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        <SvgIcon name={service.icon} size={16} />
      </div>

      {/* Bottom content — always visible */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <div
          className="mb-3 transition-all duration-300"
          style={{
            transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
          }}
        >
          <p
            className="text-[10px] tracking-[0.2em] uppercase font-medium mb-1"
            style={{ color: 'var(--color-accentSecondary)' }}
          >
            {service.category}
          </p>
          <h3
            className="font-display text-2xl font-medium leading-tight"
            style={{ color: 'var(--color-textPrimary)' }}
          >
            {service.title}
          </h3>
        </div>

        {/* Description + price — only on hover (or always on mobile) */}
        <div
          className="transition-all duration-400 overflow-hidden"
          style={{
            maxHeight: hovered || isMobile ? '120px' : '0px',
            opacity: hovered || isMobile ? 1 : 0,
            transitionDuration: '400ms',
          }}
        >
          <p
            className="text-xs font-light leading-relaxed mb-4"
            style={{ color: 'var(--color-textSecondary)' }}
          >
            {service.shortDescription}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <span
                className="text-[9px] uppercase tracking-wider font-medium"
                style={{ color: 'var(--color-textMuted)' }}
              >
                From{' '}
              </span>
              <span
                className="font-display text-xl font-semibold"
                style={{ color: 'var(--color-accentPrimary)' }}
              >
                {formatPrice(service.startingPrice, service.currency)}
              </span>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-medium transition-all duration-200"
              style={{
                background: 'var(--color-accentPrimary)',
                color: 'var(--color-buttonPrimaryText)',
              }}
              onClick={(e) => { e.stopPropagation(); onBook(service); }}
              aria-label={`Explore ${service.title}`}
            >
              Explore
              <SvgIcon name="chevronRight" size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC<ServicesProps> = ({ salon, onAddToBooking }) => {
  const [modalService, setModalService] = useState<Service | null>(null);
  const { services, otherServices } = salon;

  return (
    <section
      id="services"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'var(--color-backgroundAlt)' }}
      aria-label="Services"
    >
      {/* Decorative watermark */}
      <div
        className="absolute left-0 top-0 text-[200px] font-display font-bold leading-none select-none pointer-events-none hidden lg:block"
        style={{ color: 'rgba(184,150,90,0.025)', lineHeight: 1 }}
        aria-hidden="true"
      >
        ces
      </div>

      {/* Section label — top left */}
      <div className="absolute top-0 left-0">
        <SectionLabel align="left">Services</SectionLabel>
      </div>

      <Container className="pt-16">
        {/* Heading */}
        <AnimatedReveal direction="up">
          <div className="text-center mb-14">
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-4 font-medium"
              style={{ color: 'var(--color-accentSecondary)' }}
            >
              Explore Our Services
            </p>
            <h2
              className="font-display text-5xl md:text-6xl font-light"
              style={{ color: 'var(--color-textPrimary)' }}
            >
              What We{' '}
              <em style={{ color: 'var(--color-accentPrimary)', fontStyle: 'italic' }}>Offer</em>
            </h2>
          </div>
        </AnimatedReveal>

        {/* Service Cards — editorial masonry-like grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-24">
          {services.map((service, i) => (
            <AnimatedReveal key={service.id} direction="up" delay={i * 80}>
              <ServiceCard
                service={service}
                index={i}
                onExplore={(s) => setModalService(s)}
                onBook={(s) => setModalService(s)}
              />
            </AnimatedReveal>
          ))}
        </div>

        {/* Other Services */}
        <AnimatedReveal direction="up">
          <div className="relative">
            <div className="absolute -top-px right-0">
              <div
                className="py-2.5 px-6 pl-10 inline-flex items-center"
                style={{
                  background: 'var(--color-accentPrimary)',
                  clipPath: 'polygon(14px 0, 100% 0, 100% 100%, 14px 100%, 0 50%)',
                }}
              >
                <span
                  className="text-xs tracking-[0.2em] uppercase font-semibold font-display"
                  style={{ color: 'var(--color-buttonPrimaryText)' }}
                >
                  Other Services
                </span>
              </div>
            </div>
          </div>
        </AnimatedReveal>

        {/* Other services grid */}
        <AnimatedReveal direction="up" delay={80}>
          <div
            className="relative overflow-hidden mt-12"
            style={{ border: '1px solid var(--color-border)' }}
          >
            {/* Background overlay image */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=60"
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'var(--color-overlayDark)' }}
              />
            </div>

            <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--color-border)' }}>
              {otherServices.map((os) => (
                <div
                  key={os.id}
                  className="flex flex-col items-center text-center p-8 gap-4 group transition-all duration-300 hover:bg-[rgba(184,150,90,0.05)]"
                  style={{ background: 'rgba(13,12,10,0.75)' }}
                >
                  <div
                    className="w-14 h-14 flex items-center justify-center rounded-full transition-colors duration-300 group-hover:bg-[rgba(184,150,90,0.2)]"
                    style={{
                      background: 'rgba(184,150,90,0.1)',
                      color: 'var(--color-accentPrimary)',
                      border: '1px solid rgba(184,150,90,0.2)',
                    }}
                  >
                    <SvgIcon name={os.icon} size={24} />
                  </div>
                  <h4
                    className="font-display text-lg font-medium"
                    style={{ color: 'var(--color-textPrimary)' }}
                  >
                    {os.title}
                  </h4>
                  <p
                    className="text-xs leading-relaxed font-light"
                    style={{ color: 'var(--color-textMuted)' }}
                  >
                    {os.description}
                  </p>
                  <button
                    className="text-[10px] tracking-[0.2em] uppercase font-medium mt-1 transition-colors duration-200"
                    style={{ color: 'var(--color-accentSecondary)' }}
                    onClick={() => {
                      const main = services.find(s => s.category === os.title);
                      if (main) setModalService(main);
                      else document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    aria-label={`Learn more about ${os.title}`}
                  >
                    More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </AnimatedReveal>
      </Container>

      {/* Service Modal */}
      {modalService && (
        <ServiceModal
          service={modalService}
          onClose={() => setModalService(null)}
          onAddToBooking={onAddToBooking}
        />
      )}
    </section>
  );
};

export default Services;
