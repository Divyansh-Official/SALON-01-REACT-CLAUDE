import React from 'react';
import type { SalonData } from '../../types';
import Container from '../ui/Container';
import AnimatedReveal from '../ui/AnimatedReveal';

interface PartnersProps {
  salon: SalonData;
}

const Partners: React.FC<PartnersProps> = ({ salon }) => {
  const { partners } = salon;

  return (
    <section
      className="py-14 md:py-16"
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
      aria-label="Brand partners"
    >
      <Container>
        <AnimatedReveal direction="up">
          <div className="flex flex-col items-center gap-8">
            <p
              className="text-[9px] tracking-[0.35em] uppercase font-medium"
              style={{ color: 'var(--color-textMuted)' }}
            >
              Trusted Partner Brands
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="transition-opacity duration-300 hover:opacity-100"
                  style={{ opacity: 0.45 }}
                >
                  <span
                    className="font-display text-base md:text-xl font-light tracking-widest uppercase"
                    style={{ color: 'var(--color-textSecondary)' }}
                  >
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedReveal>
      </Container>
    </section>
  );
};

export default Partners;
