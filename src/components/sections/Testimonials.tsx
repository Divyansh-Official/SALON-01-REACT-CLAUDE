import React, { useState } from 'react';
import type { SalonData, Testimonial } from '../../types';
import Container from '../ui/Container';
import SectionLabel from '../ui/SectionLabel';
import SvgIcon from '../ui/SvgIcon';
import AnimatedReveal from '../ui/AnimatedReveal';

interface TestimonialsProps {
  salon: SalonData;
}

const TestimonialCard: React.FC<{ testimonial: Testimonial; delay?: number }> = ({ testimonial, delay = 0 }) => (
  <AnimatedReveal direction="up" delay={delay}>
    <div
      className="p-6 md:p-8 flex flex-col gap-5 h-full transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* Quote icon */}
      <div style={{ color: 'var(--color-accentPrimary)', opacity: 0.5 }}>
        <SvgIcon name="quote" size={28} />
      </div>

      {/* Rating */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <SvgIcon
            key={i}
            name={i < testimonial.rating ? 'star' : 'starOutline'}
            size={14}
            style={{ color: 'var(--color-accentPrimary)' }}
          />
        ))}
      </div>

      {/* Review text */}
      <p
        className="text-sm leading-[1.85] font-light flex-1"
        style={{ color: 'var(--color-textSecondary)' }}
      >
        {testimonial.review}
      </p>

      {/* Divider */}
      <div className="h-px w-12" style={{ background: 'var(--color-accentPrimary)', opacity: 0.4 }} />

      {/* Reviewer */}
      <div className="flex items-center gap-3">
        {testimonial.avatar && (
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover"
            loading="lazy"
            style={{ border: '1px solid var(--color-borderLight)' }}
          />
        )}
        <div>
          <p
            className="text-sm font-medium"
            style={{ color: 'var(--color-textPrimary)', fontStyle: 'italic', fontFamily: 'Cormorant Garamond, serif' }}
          >
            — {testimonial.name}
          </p>
          <p className="text-[10px] tracking-[0.12em] uppercase" style={{ color: 'var(--color-textMuted)' }}>
            {testimonial.role} · {testimonial.service}
          </p>
        </div>
      </div>
    </div>
  </AnimatedReveal>
);

const Testimonials: React.FC<TestimonialsProps> = ({ salon }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const { testimonials } = salon;

  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'var(--color-backgroundAlt)' }}
      aria-label="Testimonials"
    >
      {/* Watermark */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-display font-bold pointer-events-none select-none text-[200px] leading-none opacity-100 hidden lg:block"
        style={{ color: 'rgba(184,150,90,0.025)' }}
        aria-hidden="true"
      >
        The
      </div>

      {/* Section label top right */}
      <div className="absolute top-0 right-0">
        <SectionLabel align="right">Testimonial</SectionLabel>
      </div>

      <Container className="pt-10">
        <AnimatedReveal direction="up">
          <div className="text-center mb-14">
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-4 font-medium"
              style={{ color: 'var(--color-accentSecondary)' }}
            >
              Testimonials
            </p>
            <h2
              className="font-display text-5xl md:text-6xl font-light"
              style={{ color: 'var(--color-textPrimary)' }}
            >
              What Our{' '}
              <em style={{ color: 'var(--color-accentPrimary)', fontStyle: 'italic' }}>Clients</em> Say
            </h2>
          </div>
        </AnimatedReveal>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} delay={i * 80} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIdx * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className="w-full shrink-0 px-1">
                  <TestimonialCard testimonial={t} />
                </div>
              ))}
            </div>
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className="transition-all duration-300"
                style={{
                  width: i === activeIdx ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === activeIdx ? 'var(--color-accentPrimary)' : 'var(--color-border)',
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
