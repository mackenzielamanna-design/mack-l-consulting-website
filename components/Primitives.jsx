/* Shared primitives — numbers formatter, icons, etc. */

const fmt$ = (n, digits = 0) => {
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(digits || 2).replace(/\.?0+$/, '') + 'M';
  if (n >= 1e3) return '$' + Math.round(n / 1e3) + 'K';
  return '$' + n.toLocaleString();
};

const fmt$full = (n) => '$' + Math.round(n).toLocaleString();

const ArrowRight = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowLeft = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M13 8H3M7 4L3 8l4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

Object.assign(window, { fmt$, fmt$full, ArrowRight, ArrowLeft });
