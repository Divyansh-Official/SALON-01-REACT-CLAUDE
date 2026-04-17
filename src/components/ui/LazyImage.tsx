import React, { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fallback?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
}

const FALLBACK =
  'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27400%27 height=%27500%27 viewBox=%270 0 400 500%27%3E%3Crect width=%27400%27 height=%27500%27 fill=%27%231e1a12%27/%3E%3Ctext x=%2750%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23b8965a%22 font-size=%2224%22%3ELumière%3C/text%3E%3C/svg%3E';

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  style,
  fallback = FALLBACK,
  objectFit = 'cover',
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: 'var(--color-surface)' }}
        />
      )}
      <img
        src={error ? fallback : src}
        alt={alt}
        loading="lazy"
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        className="w-full h-full transition-opacity duration-500"
        style={{
          objectFit,
          opacity: loaded ? 1 : 0,
        }}
      />
    </div>
  );
};

export default LazyImage;
