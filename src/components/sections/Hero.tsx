import React, { useEffect, useState } from 'react';
import type { SalonData } from '../../types';
import Button from '../ui/Button';
import SvgIcon from '../ui/SvgIcon';
import Container from '../ui/Container';

interface HeroProps {
  salon: SalonData;
}

const Hero: React.FC<HeroProps> = ({ salon }) => {
  const [loaded, setLoaded] = useState(false);
  const { hero, contact } = salon;

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleScroll = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.backgroundImage}
          alt="Salon ambiance"
          className="w-full h-full object-cover transition-transform duration-[12s] ease-linear"
          style={{ transform: loaded ? 'scale(1.06)' : 'scale(1)' }}
        />
        {/* Layered gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, var(--color-overlayDark) 0%, var(--color-overlay) 50%, var(--color-overlayLight) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, var(--color-background) 0%, transparent 40%)',
          }}
        />
      </div>

      {/* Decorative angled accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1 z-10"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-accentPrimary), transparent)' }}
      />

      {/* Section label — top-left ribbon */}
      {/* <div className="absolute top-20 left-0 z-10">
        <div
          className="py-2.5 px-6 pr-10 inline-flex items-center"
          style={{
            background: 'var(--color-accentPrimary)',
            clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)',
          }}
        >
          <span
            className="text-xs tracking-[0.25em] uppercase font-semibold font-display"
            style={{ color: 'var(--color-buttonPrimaryText)' }}
          >
            Main
          </span>
        </div>
      </div> */}

      {/* Hero Content */}
      <Container className="relative z-10 text-center pt-24 pb-16">
        {/* Badge */}
        {hero.badge && (
          <div
            className="inline-block mb-8 transition-all duration-700"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)' }}
          >
            <span
              className="text-[10px] tracking-[0.3em] uppercase font-medium px-5 py-2 border"
              style={{
                color: 'var(--color-accentSecondary)',
                borderColor: 'var(--color-accentPrimary)',
                background: 'rgba(184, 150, 90, 0.08)',
              }}
            >
              {hero.badge} · Luxury Beauty Studio
            </span>
          </div>
        )}

        {/* Main Headline */}
        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-4 transition-all duration-700"
          style={{
            color: 'var(--color-textPrimary)',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(30px)',
            transitionDelay: '100ms',
          }}
        >
          {hero.title}
        </h1>

        {/* Script subtitle */}
        <p
          className="font-script text-3xl md:text-4xl mb-6 transition-all duration-700"
          style={{
            color: 'var(--color-accentSecondary)',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(20px)',
            transitionDelay: '200ms',
          }}
        >
          {hero.subtitle}
        </p>

        {/* Description */}
        <p
          className="max-w-xl mx-auto text-sm font-light leading-relaxed tracking-wide mb-10 transition-all duration-700"
          style={{
            color: 'var(--color-textSecondary)',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(20px)',
            transitionDelay: '300ms',
          }}
        >
          {hero.description}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(20px)',
            transitionDelay: '400ms',
          }}
        >
          <Button variant="primary" size="lg" onClick={() => handleScroll('#booking')}>
            {hero.ctaPrimary}
          </Button>
          <Button variant="secondary" size="lg" onClick={() => handleScroll('#services')}>
            {hero.ctaSecondary}
          </Button>
        </div>

        {/* Trust signals */}
        <div
          className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transitionDelay: '600ms',
          }}
        >
          {/* Rating */}
          {hero.rating && (
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <SvgIcon
                    key={i}
                    name="star"
                    size={14}
                    style={{ color: 'var(--color-accentPrimary)' }}
                  />
                ))}
              </div>
              <span className="text-xs tracking-wide font-light" style={{ color: 'var(--color-textSecondary)' }}>
                {hero.rating} · {hero.reviewCount}
              </span>
            </div>
          )}

          {/* Divider */}
          <div className="w-px h-5 hidden sm:block" style={{ background: 'var(--color-border)' }} />

          {/* Location */}
          <div className="flex items-center gap-2">
            <SvgIcon name="mapPin" size={14} style={{ color: 'var(--color-accentPrimary)' }} />
            <span className="text-xs tracking-wide font-light" style={{ color: 'var(--color-textSecondary)' }}>
              {contact.city}, {contact.state}
            </span>
          </div>

          {/* Divider */}
          <div className="w-px h-5 hidden sm:block" style={{ background: 'var(--color-border)' }} />

          {/* Hours */}
          <div className="flex items-center gap-2">
            <SvgIcon name="clock" size={14} style={{ color: 'var(--color-accentPrimary)' }} />
            <span className="text-xs tracking-wide font-light" style={{ color: 'var(--color-textSecondary)' }}>
              Mon–Fri 10AM–8PM
            </span>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
        {/* <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-all duration-700"
          style={{ opacity: loaded ? 0.6 : 0, transitionDelay: '800ms' }}
          aria-hidden="true"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-textMuted)' }}>
            Scroll
          </span>
          <div
            className="w-px h-10 animate-pulse"
            style={{ background: 'linear-gradient(to bottom, var(--color-accentPrimary), transparent)' }}
          />
        </div> */}
    </section>
  );
};

export default Hero;
