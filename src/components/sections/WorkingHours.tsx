import React, { useState, useEffect } from 'react';
import type { SalonData } from '../../types';
import Container from '../ui/Container';
import SectionLabel from '../ui/SectionLabel';
import SvgIcon from '../ui/SvgIcon';
import AnimatedReveal from '../ui/AnimatedReveal';
import { getCurrentDay } from '../../utils/format';

interface WorkingHoursProps {
  salon: SalonData;
}

const WorkingHours: React.FC<WorkingHoursProps> = ({ salon }) => {
  const { hours } = salon;
  const currentDay = getCurrentDay();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');
  const currentSchedule = hours.schedule.find((s) => s.day === currentDay);
  const isCurrentlyOpen = currentSchedule?.isOpen ?? false;

  return (
    <section
      id="hours"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'var(--color-background)' }}
      aria-label="Working hours"
    >
      {/* Watermark */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-bold pointer-events-none select-none text-[180px] leading-none hidden lg:block"
        style={{ color: 'rgba(184,150,90,0.025)' }}
        aria-hidden="true"
      >
        king
      </div>

      {/* Section label top left */}
      <div className="absolute top-0 left-0">
        <SectionLabel align="left">{hours.sectionLabel}</SectionLabel>
      </div>

      <Container className="pt-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Schedule */}
          <AnimatedReveal direction="right">
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-4 font-medium"
                style={{ color: 'var(--color-accentSecondary)' }}
              >
                Working Hours
              </p>
              <h2
                className="font-display text-4xl md:text-5xl font-light mb-10"
                style={{ color: 'var(--color-textPrimary)' }}
              >
                Our{' '}
                <em style={{ color: 'var(--color-accentPrimary)', fontStyle: 'italic' }}>
                  Schedule
                </em>
              </h2>

              <div className="flex flex-col">
                {hours.schedule.map((day) => {
                  const isToday = day.day === currentDay;
                  return (
                    <div
                      key={day.day}
                      className="flex items-center justify-between py-4 border-b transition-all duration-200"
                      style={{
                        borderColor: 'var(--color-border)',
                        background: isToday ? 'rgba(184,150,90,0.04)' : 'transparent',
                        paddingLeft: isToday ? '12px' : '0',
                        borderLeft: isToday ? '3px solid var(--color-accentPrimary)' : '3px solid transparent',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {isToday && (
                          <span
                            className="text-[9px] tracking-widest uppercase px-2 py-0.5 font-semibold"
                            style={{
                              background: 'var(--color-accentPrimary)',
                              color: 'var(--color-buttonPrimaryText)',
                            }}
                          >
                            Today
                          </span>
                        )}
                        <span
                          className="text-sm font-light tracking-wide"
                          style={{
                            color: isToday ? 'var(--color-textPrimary)' : 'var(--color-textSecondary)',
                            fontWeight: isToday ? '500' : '300',
                          }}
                        >
                          {day.day}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {day.isOpen ? (
                          <span
                            className="text-sm tracking-wider"
                            style={{ color: isToday ? 'var(--color-accentPrimary)' : 'var(--color-textSecondary)' }}
                          >
                            {day.open} — {day.close}
                          </span>
                        ) : (
                          <span
                            className="text-sm tracking-wider uppercase"
                            style={{ color: 'var(--color-textMuted)' }}
                          >
                            Closed
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Note */}
              <div className="mt-6 flex gap-3 items-start">
                <SvgIcon name="info" size={14} style={{ color: 'var(--color-textMuted)', marginTop: 1, flexShrink: 0 }} />
                <p
                  className="text-xs font-light leading-relaxed"
                  style={{ color: 'var(--color-textMuted)' }}
                >
                  {hours.note}
                </p>
              </div>
            </div>
          </AnimatedReveal>

          {/* Live clock card */}
          <AnimatedReveal direction="left" delay={100}>
            <div
              className="flex flex-col items-center justify-center gap-6 p-10 text-center"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-borderLight)',
              }}
            >
              {/* Status badge */}
              <div
                className="flex items-center gap-2 px-4 py-2"
                style={{
                  background: isCurrentlyOpen ? 'rgba(107,158,107,0.1)' : 'rgba(192,96,96,0.1)',
                  border: `1px solid ${isCurrentlyOpen ? 'var(--color-success)' : 'var(--color-error)'}`,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{
                    background: isCurrentlyOpen ? 'var(--color-success)' : 'var(--color-error)',
                  }}
                />
                <span
                  className="text-xs tracking-[0.15em] uppercase font-medium"
                  style={{ color: isCurrentlyOpen ? 'var(--color-success)' : 'var(--color-error)' }}
                >
                  {isCurrentlyOpen ? 'Open Now' : 'Closed'}
                </span>
              </div>

              {/* Date */}
              <div>
                <p
                  className="font-display text-2xl font-medium"
                  style={{ color: 'var(--color-textPrimary)' }}
                >
                  {time.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>

              {/* Live clock */}
              <div
                className="font-display text-5xl md:text-6xl font-light tracking-widest tabular-nums"
                style={{ color: 'var(--color-accentPrimary)' }}
                aria-live="polite"
                aria-atomic="true"
              >
                {pad(time.getHours())} : {pad(time.getMinutes())} : {pad(time.getSeconds())}
              </div>

              {/* Current day info */}
              <div>
                <p
                  className="text-sm font-light"
                  style={{ color: 'var(--color-textSecondary)' }}
                >
                  {currentDay}
                  {currentSchedule?.isOpen
                    ? ` · ${currentSchedule.open} – ${currentSchedule.close}`
                    : ' · Closed today'}
                </p>
              </div>

              {/* Book CTA */}
              <a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-200 flex items-center gap-2"
                style={{ color: 'var(--color-accentSecondary)' }}
              >
                Book an Appointment
                <SvgIcon name="arrowRight" size={13} />
              </a>
            </div>
          </AnimatedReveal>
        </div>
      </Container>
    </section>
  );
};

export default WorkingHours;
