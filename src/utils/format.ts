export function formatPrice(price: number, currency = 'USD'): string {
  if (currency === 'USD') return `$${price}`;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function padNumber(num: number, size = 2): string {
  return String(num).padStart(size, '0');
}

export function getCurrentDay(): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export function getMinBookingDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

export function getMaxBookingDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 60);
  return d.toISOString().split('T')[0];
}
