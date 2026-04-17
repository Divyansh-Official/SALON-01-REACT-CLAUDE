import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium tracking-widest uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizes = {
    sm: 'px-5 py-2 text-[10px]',
    md: 'px-8 py-3.5 text-[11px]',
    lg: 'px-10 py-4 text-[12px]',
  };

  const variants = {
    primary:
      'bg-[var(--color-buttonPrimary)] text-[var(--color-buttonPrimaryText)] hover:bg-[var(--color-accentSecondary)] border border-[var(--color-accentPrimary)]',
    secondary:
      'bg-transparent text-[var(--color-accentPrimary)] border border-[var(--color-accentPrimary)] hover:bg-[var(--color-accentPrimary)] hover:text-[var(--color-buttonPrimaryText)]',
    ghost:
      'bg-transparent text-[var(--color-textSecondary)] border border-[var(--color-border)] hover:border-[var(--color-accentPrimary)] hover:text-[var(--color-accentPrimary)]',
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
