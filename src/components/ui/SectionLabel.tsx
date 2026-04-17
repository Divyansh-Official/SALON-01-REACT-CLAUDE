import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ children, align = 'left', className = '' }) => {
  const isLeft = align === 'left';
  return (
    <div
      className={`inline-flex items-center py-2.5 px-5 ${className}`}
      style={{
        background: 'var(--color-accentPrimary)',
        clipPath: isLeft
          ? 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)'
          : 'polygon(14px 0, 100% 0, 100% 100%, 14px 100%, 0 50%)',
        paddingRight: isLeft ? '28px' : '20px',
        paddingLeft: isLeft ? '20px' : '28px',
      }}
    >
      <span
        className="font-display text-sm font-semibold tracking-widest uppercase"
        style={{ color: 'var(--color-buttonPrimaryText)' }}
      >
        {children}
      </span>
    </div>
  );
};

export default SectionLabel;
