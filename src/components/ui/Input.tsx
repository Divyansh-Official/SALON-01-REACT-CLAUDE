import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  multiline = false,
  rows = 4,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const baseStyle: React.CSSProperties = {
    background: 'var(--color-inputBackground)',
    border: `1px solid ${error ? 'var(--color-error)' : 'var(--color-inputBorder)'}`,
    color: 'var(--color-textPrimary)',
    outline: 'none',
  };

  const classes = `w-full px-4 py-3.5 text-sm font-light tracking-wide transition-all duration-200 focus:ring-1 focus:ring-[var(--color-accentPrimary)] focus:border-[var(--color-accentPrimary)] placeholder:text-[var(--color-textMuted)] ${className}`;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs tracking-[0.15em] uppercase font-medium"
          style={{ color: 'var(--color-textSecondary)' }}
        >
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          id={inputId}
          rows={rows}
          className={classes}
          style={{ ...baseStyle, resize: 'vertical' }}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={inputId}
          className={classes}
          style={baseStyle}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && (
        <span className="text-xs" style={{ color: 'var(--color-error)' }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
