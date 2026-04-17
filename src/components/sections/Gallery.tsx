import React, { useState } from 'react';
import type { SalonData, GalleryImage } from '../../types';
import Container from '../ui/Container';
import SectionLabel from '../ui/SectionLabel';
import SvgIcon from '../ui/SvgIcon';
import AnimatedReveal from '../ui/AnimatedReveal';

interface GalleryProps {
  salon: SalonData;
}

const Gallery: React.FC<GalleryProps> = ({ salon }) => {
  const { gallery } = salon;
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const filtered =
    activeCategory === 'All'
      ? gallery.images
      : gallery.images.filter((img) => img.category === activeCategory);

  const openLightbox = (img: GalleryImage) => {
    const idx = filtered.findIndex((i) => i.id === img.id);
    setLightboxIdx(idx);
    setLightboxImage(img);
  };

  const navigate = (dir: 1 | -1) => {
    const newIdx = (lightboxIdx + dir + filtered.length) % filtered.length;
    setLightboxIdx(newIdx);
    setLightboxImage(filtered[newIdx]);
  };

  return (
    <section
      id="gallery"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'var(--color-backgroundAlt)' }}
      aria-label="Gallery"
    >
      {/* Watermark */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 font-display font-bold pointer-events-none select-none text-[200px] leading-none hidden lg:block"
        style={{ color: 'rgba(184,150,90,0.025)' }}
        aria-hidden="true"
      >
        Beauty
      </div>

      {/* Section label top right */}
      <div className="absolute top-0 right-0">
        <SectionLabel align="right">Gallery</SectionLabel>
      </div>

      <Container className="pt-10">
        <AnimatedReveal direction="up">
          <div className="text-center mb-10">
            <h2
              className="font-display text-5xl md:text-6xl font-light"
              style={{ color: 'var(--color-textPrimary)' }}
            >
              {gallery.title}
            </h2>
            <p
              className="mt-4 text-sm tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-textMuted)' }}
            >
              {gallery.subtitle}
            </p>
          </div>
        </AnimatedReveal>

        {/* Category filters */}
        <AnimatedReveal direction="up" delay={50}>
          <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Gallery filter">
            {gallery.categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-200"
                style={{
                  background: activeCategory === cat ? 'var(--color-accentPrimary)' : 'var(--color-surface)',
                  color: activeCategory === cat ? 'var(--color-buttonPrimaryText)' : 'var(--color-textSecondary)',
                  border: `1px solid ${activeCategory === cat ? 'var(--color-accentPrimary)' : 'var(--color-border)'}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedReveal>

        {/* Gallery grid — editorial layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-3">
          {filtered.map((img, i) => {
            // Create varied column spans for visual interest
            const colSpan =
              i === 0 ? 'lg:col-span-5'
              : i === 1 ? 'lg:col-span-4'
              : i === 2 ? 'lg:col-span-3'
              : i === 3 ? 'lg:col-span-3'
              : i === 4 ? 'lg:col-span-5'
              : i === 5 ? 'lg:col-span-4'
              : i === 6 ? 'lg:col-span-4'
              : i === 7 ? 'lg:col-span-4'
              : i === 8 ? 'lg:col-span-4'
              : 'lg:col-span-4';

            const tall = i === 0 || i === 4;

            return (
              <AnimatedReveal key={img.id} direction="up" delay={i * 50} className={`col-span-1 ${colSpan}`}>
                <div
                  className="relative overflow-hidden cursor-pointer group"
                  style={{
                    aspectRatio: tall ? '3/4' : '4/3',
                    border: '1px solid var(--color-border)',
                  }}
                  onClick={() => openLightbox(img)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${img.caption}`}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(img)}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-all duration-300"
                    style={{
                      background: 'var(--color-overlayDark)',
                      opacity: 0,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.opacity = '0';
                    }}
                  >
                    <SvgIcon name="eye" size={24} style={{ color: 'var(--color-accentPrimary)' }} />
                    <p
                      className="text-[10px] tracking-[0.15em] uppercase font-medium text-center px-4"
                      style={{ color: 'var(--color-textSecondary)' }}
                    >
                      {img.caption}
                    </p>
                  </div>
                  {/* Always-visible overlay on mobile */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-3 md:hidden"
                    style={{
                      background: 'linear-gradient(to top, rgba(13,12,10,0.9), transparent)',
                    }}
                  >
                    <p
                      className="text-[10px] font-light"
                      style={{ color: 'var(--color-textSecondary)' }}
                    >
                      {img.caption}
                    </p>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-2 left-2">
                    <span
                      className="text-[9px] px-2 py-1 tracking-[0.1em] uppercase font-medium"
                      style={{
                        background: 'rgba(13,12,10,0.7)',
                        color: 'var(--color-accentSecondary)',
                        border: '1px solid rgba(184,150,90,0.2)',
                      }}
                    >
                      {img.category}
                    </span>
                  </div>
                </div>
              </AnimatedReveal>
            );
          })}
        </div>
      </Container>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImage.caption}
        >
          <div
            className="absolute inset-0"
            style={{ background: 'var(--color-overlayDark)' }}
            onClick={() => setLightboxImage(null)}
          />
          <div className="relative z-10 max-w-4xl w-full flex flex-col items-center gap-4">
            <img
              src={lightboxImage.url}
              alt={lightboxImage.alt}
              className="max-h-[80vh] object-contain"
              style={{ border: '1px solid var(--color-borderLight)' }}
            />
            <p
              className="text-sm font-light tracking-wide"
              style={{ color: 'var(--color-textSecondary)' }}
            >
              {lightboxImage.caption}
            </p>
          </div>
          {/* Close */}
          <button
            className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full transition-colors duration-200 z-10"
            style={{
              background: 'var(--color-surface)',
              color: 'var(--color-textPrimary)',
              border: '1px solid var(--color-border)',
            }}
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
          >
            <SvgIcon name="close" size={18} />
          </button>
          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full transition-colors duration-200 z-10"
            style={{
              background: 'var(--color-surface)',
              color: 'var(--color-textPrimary)',
              border: '1px solid var(--color-border)',
            }}
            onClick={() => navigate(-1)}
            aria-label="Previous image"
          >
            <SvgIcon name="chevronLeft" size={18} />
          </button>
          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full transition-colors duration-200 z-10"
            style={{
              background: 'var(--color-surface)',
              color: 'var(--color-textPrimary)',
              border: '1px solid var(--color-border)',
            }}
            onClick={() => navigate(1)}
            aria-label="Next image"
          >
            <SvgIcon name="chevronRight" size={18} />
          </button>
          {/* Counter */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-[0.15em] px-3 py-1.5 z-10"
            style={{
              background: 'var(--color-surface)',
              color: 'var(--color-textMuted)',
              border: '1px solid var(--color-border)',
            }}
          >
            {lightboxIdx + 1} / {filtered.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
