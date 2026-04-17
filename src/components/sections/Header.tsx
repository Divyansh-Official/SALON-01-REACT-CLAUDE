import React, { useState, useEffect } from 'react';
import type { SalonData } from '../../types';
import SvgIcon from '../ui/SvgIcon';
import Button from '../ui/Button';
import Container from '../ui/Container';

interface HeaderProps {
  salon: SalonData;
}

const Header: React.FC<HeaderProps> = ({ salon }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = salon.navigation.map((n) => n.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [salon.navigation]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'var(--color-background)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <Container>
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
  href="#home"
  className="flex items-center gap-3 group"
  onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
  aria-label={salon.name}
>
  {/* LOGO instead of shortName */}
  <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0 bg-white">
    <img
      src={salon.logo}
      alt={salon.name}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </div>

  <span
    className="font-display text-lg tracking-widest hidden sm:block transition-colors duration-200"
    style={{ color: 'var(--color-textPrimary)' }}
  >
    {salon.name}
  </span>
</a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {salon.navigation.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                    className="text-[11px] tracking-[0.18em] uppercase font-medium transition-colors duration-200 relative group pb-0.5"
                    style={{ color: isActive ? 'var(--color-accentPrimary)' : 'var(--color-textSecondary)' }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                    <span
                      className="absolute bottom-0 left-0 h-px transition-all duration-300"
                      style={{
                        background: 'var(--color-accentPrimary)',
                        width: isActive ? '100%' : '0%',
                      }}
                    />
                  </a>
                );
              })}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                className="hidden md:inline-flex"
                onClick={() => handleNavClick('#booking')}
              >
                Book Now
              </Button>
              <button
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded transition-colors duration-200"
                style={{ color: 'var(--color-textPrimary)' }}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <SvgIcon name={menuOpen ? 'close' : 'menu'} size={22} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 z-40 transition-all duration-500 lg:hidden"
        style={{
          background: 'var(--color-overlayDark)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col pt-20 pb-8 px-8 lg:hidden transition-transform duration-500 ease-out"
        style={{
          background: 'var(--color-surface)',
          borderLeft: '1px solid var(--color-border)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
          {salon.navigation.map((item, i) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className="py-3.5 px-4 text-sm tracking-[0.15em] uppercase font-medium transition-all duration-200 border-b"
                style={{
                  color: isActive ? 'var(--color-accentPrimary)' : 'var(--color-textSecondary)',
                  borderColor: 'var(--color-border)',
                  transitionDelay: menuOpen ? `${i * 40}ms` : '0ms',
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="mt-8">
          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={() => handleNavClick('#booking')}
          >
            Book Appointment
          </Button>
        </div>
        <div className="mt-auto flex gap-4">
          {salon.contact.socialLinks.slice(0, 3).map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.platform}
              className="w-9 h-9 flex items-center justify-center rounded-full border transition-colors duration-200"
              style={{
                borderColor: 'var(--color-borderLight)',
                color: 'var(--color-textMuted)',
              }}
            >
              <SvgIcon name={s.icon} size={16} />
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
