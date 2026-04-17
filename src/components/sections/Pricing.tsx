import React from 'react';
import type { SalonData } from '../../types';
import Container from '../ui/Container';
import SectionLabel from '../ui/SectionLabel';
import SvgIcon from '../ui/SvgIcon';
import AnimatedReveal from '../ui/AnimatedReveal';
import { formatPrice } from '../../utils/format';

interface PricingProps {
  salon: SalonData;
}

const Pricing: React.FC<PricingProps> = ({ salon }) => {
  const { pricing } = salon;

  return (
    <section
      id="pricing"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'var(--color-background)' }}
      aria-label="Pricing"
    >
      {/* Section label */}
      <div className="absolute top-0 left-0">
        <SectionLabel align="left">{pricing.sectionLabel}</SectionLabel>
      </div>

      {/* Watermark */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 font-display font-bold pointer-events-none select-none text-[200px] leading-none hidden lg:block"
        style={{ color: 'rgba(184,150,90,0.025)' }}
        aria-hidden="true"
      >
        Pri
      </div>

      <Container className="pt-16">
        <AnimatedReveal direction="up">
          <div className="text-center mb-14">
            <h2
              className="font-display text-5xl md:text-6xl font-light"
              style={{ color: 'var(--color-textPrimary)' }}
            >
              {pricing.title}
            </h2>
            <p
              className="mt-4 text-sm tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-textMuted)' }}
            >
              {pricing.subtitle}
            </p>
          </div>
        </AnimatedReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: product/tools image */}
          <AnimatedReveal direction="right">
            <div
              className="relative overflow-hidden"
              style={{
                border: `1px solid var(--color-accentPrimary)`,
                padding: '6px',
              }}
            >
              <img
                src={pricing.image}
                alt="Premium salon products"
                className="w-full object-cover"
                style={{ maxHeight: '460px', display: 'block' }}
                loading="lazy"
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{
                  background: 'linear-gradient(to top, var(--color-overlayDark), transparent)',
                }}
              >
                <p
                  className="font-script text-2xl"
                  style={{ color: 'var(--color-accentSecondary)' }}
                >
                  Premium products, exceptional results
                </p>
              </div>
            </div>
          </AnimatedReveal>

          {/* Right: price categories */}
          <AnimatedReveal direction="left" delay={100}>
            <div className="flex flex-col gap-8">
              {pricing.categories.map((cat) => (
                <div key={cat.title}>
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-8 h-8 flex items-center justify-center"
                      style={{ color: 'var(--color-accentPrimary)' }}
                    >
                      <SvgIcon name={cat.icon} size={20} />
                    </div>
                    <h3
                      className="font-script text-2xl"
                      style={{ color: 'var(--color-accentSecondary)' }}
                    >
                      {cat.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex flex-col items-center gap-3 p-5 text-center group transition-all duration-300 hover:-translate-y-0.5"
                        style={{
                          background: 'var(--color-surface)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <div
                          className="w-11 h-11 flex items-center justify-center transition-colors duration-300"
                          style={{
                            color: 'var(--color-accentPrimary)',
                            border: '1px solid rgba(184,150,90,0.25)',
                            background: 'rgba(184,150,90,0.07)',
                          }}
                        >
                          <SvgIcon name={item.icon} size={20} />
                        </div>
                        <p
                          className="text-xs font-medium leading-snug"
                          style={{ color: 'var(--color-textSecondary)' }}
                        >
                          {item.name}
                        </p>
                        <div>
                          <p
                            className="font-display text-2xl font-light"
                            style={{ color: 'var(--color-accentPrimary)' }}
                          >
                            {formatPrice(item.price)}
                          </p>
                          <p
                            className="text-[10px] tracking-wide uppercase mt-0.5"
                            style={{ color: 'var(--color-textMuted)' }}
                          >
                            {item.duration}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedReveal>
        </div>

        {/* All services pricing table */}
        <AnimatedReveal direction="up" delay={100} className="mt-16">
          <div
            className="p-8"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h3
              className="font-display text-2xl font-light mb-6 text-center"
              style={{ color: 'var(--color-textPrimary)' }}
            >
              Complete Service Menu
            </h3>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
              {salon.services.flatMap((s) =>
                s.subServices.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between py-3.5 border-b"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <div>
                      <p
                        className="text-sm font-light"
                        style={{ color: 'var(--color-textSecondary)' }}
                      >
                        {sub.name}
                      </p>
                      <p
                        className="text-[10px] uppercase tracking-wide"
                        style={{ color: 'var(--color-textMuted)' }}
                      >
                        {s.category} · {Math.floor(sub.duration / 60) > 0 ? `${Math.floor(sub.duration / 60)}h ` : ''}{sub.duration % 60 > 0 ? `${sub.duration % 60}m` : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {sub.originalPrice && (
                        <span
                          className="text-xs line-through"
                          style={{ color: 'var(--color-textMuted)' }}
                        >
                          {formatPrice(sub.originalPrice)}
                        </span>
                      )}
                      <span
                        className="font-display text-lg font-medium"
                        style={{ color: 'var(--color-accentPrimary)' }}
                      >
                        {formatPrice(sub.price)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </AnimatedReveal>
      </Container>
    </section>
  );
};

export default Pricing;
