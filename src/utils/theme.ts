import type { Colors } from '../types';

export function injectThemeVariables(colors: Colors): void {
  const root = document.documentElement;
  const entries = Object.entries(colors) as [keyof Colors, string][];
  entries.forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
}

export function getThemeStyle(colors: Colors): React.CSSProperties {
  const style: Record<string, string> = {};
  const entries = Object.entries(colors) as [keyof Colors, string][];
  entries.forEach(([key, value]) => {
    style[`--color-${key}`] = value;
  });
  return style as React.CSSProperties;
}
