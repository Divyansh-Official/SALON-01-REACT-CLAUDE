import React from 'react';
import iconsData from '../../data/icons.json';
import type { Icons } from '../../types';

const icons = iconsData as Icons;

interface SvgIconProps {
  name: string;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
  'aria-hidden'?: boolean;
  'aria-label'?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  className = '',
  size,
  style,
  'aria-hidden': ariaHidden = true,
  'aria-label': ariaLabel,
}) => {
  const svgString = icons[name];
  if (!svgString) {
    console.warn(`Icon "${name}" not found in icons.json`);
    return null;
  }

  // Parse and render svg string safely
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  const svgEl = doc.querySelector('svg');
  if (!svgEl) return null;

  const sizeStyle: React.CSSProperties = size
    ? { width: size, height: size, flexShrink: 0 }
    : { flexShrink: 0 };

  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      style={{ ...sizeStyle, ...style }}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
};

export default SvgIcon;
