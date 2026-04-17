import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  accentWord?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align = 'center',
  className = '',
  accentWord,
}) => {
  const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

  const renderTitle = () => {
    if (!accentWord) return title;
    const parts = title.split(accentWord);
    return (
      <>
        {parts[0]}
        <span style={{ color: 'var(--color-accentPrimary)', fontStyle: 'italic' }}>{accentWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={`${alignClass} ${className}`}>
      <h2
        className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight"
        style={{ color: 'var(--color-textPrimary)' }}
      >
        {renderTitle()}
      </h2>
      {subtitle && (
        <p
          className="mt-4 text-sm tracking-[0.2em] uppercase font-light"
          style={{ color: 'var(--color-textMuted)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
