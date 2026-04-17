import React from 'react';
import type { SalonData } from '../../types';
import Container from '../ui/Container';
import SectionLabel from '../ui/SectionLabel';
import SectionHeading from '../ui/SectionHeading';
import AnimatedReveal from '../ui/AnimatedReveal';
import SvgIcon from '../ui/SvgIcon';

interface AboutProps {
  salon: SalonData;
}

const About: React.FC<AboutProps> = ({ salon }) => {
  const { about, owner } = salon;

  return (
    <section
      id="about"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'var(--color-background)' }}
      aria-label="About"
    >
      {/* Decorative text watermark */}
      <div
        className="absolute right-0 top-1/4 text-[180px] font-display font-bold leading-none select-none pointer-events-none hidden lg:block"
        style={{ color: 'rgba(184,150,90,0.03)' }}
        aria-hidden="true"
      >
        Plus
      </div>

      {/* Section ribbon — top right */}
      <div className="absolute top-0 right-0 z-10">
        <SectionLabel align="right">{about.sectionLabel}</SectionLabel>
      </div>

      <Container>
        {/* Row 1: History + Owner Image */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 mt-12">
          {/* Text */}
          <AnimatedReveal direction="right" className="flex flex-col gap-6">
            <SectionHeading title={about.title} align="left" accentWord="Story" />
            <div
              className="w-16 h-px"
              style={{ background: 'var(--color-accentPrimary)' }}
            />
            <p
              className="text-sm leading-[1.9] font-light tracking-wide"
              style={{ color: 'var(--color-textSecondary)' }}
            >
              {about.history}
            </p>
            <p
              className="text-sm leading-[1.9] font-light tracking-wide"
              style={{ color: 'var(--color-textSecondary)' }}
            >
              {about.philosophy}
            </p>
            <blockquote
              className="pl-4 border-l-2 italic font-display text-base"
              style={{
                borderColor: 'var(--color-accentPrimary)',
                color: 'var(--color-accentSecondary)',
              }}
            >
              "{about.mission}"
            </blockquote>
            {/* Certifications */}
            <div className="flex flex-wrap gap-2 mt-2">
              {about.certifications.map((cert) => (
                <span
                  key={cert}
                  className="text-[10px] tracking-[0.12em] uppercase px-3 py-1.5 border font-medium"
                  style={{
                    color: 'var(--color-textMuted)',
                    borderColor: 'var(--color-border)',
                    background: 'var(--color-surface)',
                  }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </AnimatedReveal>

          {/* Owner Image Card */}
          <AnimatedReveal direction="left" delay={100}>
            <div className="relative">
              <div
                className="absolute -top-4 -left-4 w-full h-full border hidden md:block"
                style={{ borderColor: 'var(--color-accentPrimary)', opacity: 0.3 }}
              />
              <div
                className="relative overflow-hidden"
                style={{
                  border: `1px solid var(--color-accentPrimary)`,
                  padding: '4px',
                  background: 'var(--color-surface)',
                }}
              >
                <img
                  src={owner.image}
                  alt={owner.name}
                  className="w-full object-cover"
                  style={{ maxHeight: '500px', display: 'block' }}
                  loading="lazy"
                />
                {/* Owner info overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  style={{
                    background:
                      'linear-gradient(to top, var(--color-overlayDark), transparent)',
                  }}
                >
                  <p
                    className="font-display text-xl font-medium"
                    style={{ color: 'var(--color-textPrimary)' }}
                  >
                    {owner.name}
                  </p>
                  <p
                    className="text-xs tracking-[0.15em] uppercase mt-1"
                    style={{ color: 'var(--color-accentSecondary)' }}
                  >
                    {owner.title}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedReveal>
        </div>

        {/* Stats */}
        <AnimatedReveal direction="up" delay={50}>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px mb-20"
            style={{ background: 'var(--color-border)' }}
          >
            {about.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center py-10 px-6 text-center"
                style={{ background: 'var(--color-surface)' }}
              >
                <span
                  className="font-display text-4xl md:text-5xl font-light"
                  style={{ color: 'var(--color-accentPrimary)' }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-[10px] tracking-[0.2em] uppercase mt-2 font-medium"
                  style={{ color: 'var(--color-textMuted)' }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </AnimatedReveal>

        {/* Values */}
        <AnimatedReveal direction="up" delay={100}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {about.values.map((val) => (
              <div
                key={val.title}
                className="p-6 flex flex-col gap-4 group transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div
                  className="w-11 h-11 flex items-center justify-center rounded-full"
                  style={{
                    background: 'rgba(184,150,90,0.12)',
                    color: 'var(--color-accentPrimary)',
                  }}
                >
                  <SvgIcon name={val.icon} size={20} />
                </div>
                <h3
                  className="font-display text-lg font-medium"
                  style={{ color: 'var(--color-textPrimary)' }}
                >
                  {val.title}
                </h3>
                <p
                  className="text-xs leading-relaxed font-light"
                  style={{ color: 'var(--color-textMuted)' }}
                >
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </AnimatedReveal>

        {/* Owner bio extended */}
        <AnimatedReveal direction="up" delay={80} className="mt-16">
          <div
            className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center"
            style={{
              background: 'var(--color-surfaceAlt)',
              border: '1px solid var(--color-borderLight)',
            }}
          >
            <div>
              <p
                className="text-[10px] tracking-[0.25em] uppercase mb-3 font-medium"
                style={{ color: 'var(--color-accentPrimary)' }}
              >
                Meet the Founder
              </p>
              <h3
                className="font-display text-3xl font-light mb-4"
                style={{ color: 'var(--color-textPrimary)' }}
              >
                {owner.name}
              </h3>
              <p
                className="text-sm leading-relaxed font-light mb-6"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                {owner.bio}
              </p>
              <div className="flex flex-wrap gap-2">
                {owner.credentials.map((c) => (
                  <span
                    key={c}
                    className="flex items-center gap-1.5 text-[10px] tracking-wide uppercase font-medium"
                    style={{ color: 'var(--color-accentSecondary)' }}
                  >
                    <span
                      className="w-1 h-1 rounded-full inline-block"
                      style={{ background: 'var(--color-accentPrimary)' }}
                    />
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-start md:justify-end">
              {about.certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-2 px-4 py-3"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <SvgIcon name="award" size={14} style={{ color: 'var(--color-accentPrimary)' }} />
                  <span
                    className="text-[10px] tracking-wide font-medium uppercase"
                    style={{ color: 'var(--color-textSecondary)' }}
                  >
                    {cert}
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

export default About;
