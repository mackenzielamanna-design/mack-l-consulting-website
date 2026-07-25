/* Shared primitives — numbers formatter, icons, etc. */

const fmt$ = (n, digits = 0) => {
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(digits || 2).replace(/\.?0+$/, '') + 'M';
  if (n >= 1e3) return '$' + Math.round(n / 1e3) + 'K';
  return '$' + n.toLocaleString();
};

const fmt$full = (n) => '$' + Math.round(n).toLocaleString();

// Range helper, e.g. "$57K–$114K"
const fmt$range = (lo, hi) => fmt$(lo) + '–' + fmt$(hi);

// ── Canonical Copper Pot ─────────────────────────────────────────
// Single source of truth for every site section. These numbers MUST
// match the rendered diagnostic (MockData_IdealState/TheCopperPot).
// Opportunity is ONE range; findings are non-overlapping; food-cost
// drivers (bleeders, vendor creep, waste) fold UNDER the food finding.
const CP = {
  revenue: 1_933_428,
  oppLow: 100_500,
  oppHigh: 201_500,
  oppStr: '$100K–$201K', // canonical display (matches diagnostic $100,500–$201,500)
  // P&L shape (matches the diagnostic's Estimated P&L)
  pnl: {
    food:      { pct: 35.9, amt: 694_500 },
    labor:     { pct: 25.0, amt: 482_900 },   // incl. owner labor at market
    delivery:  { pct: 6.0,  amt: 116_000 },
    packaging: { pct: 1.5,  amt: 29_000 },
    occupancy: { pct: 10.0, amt: 193_300 },
    other:     { pct: 3.0,  amt: 58_000 },
    profit:    { pct: 18.6, amt: 359_700 },
  },
  // The four non-overlapping findings, each a low–high range
  findings: {
    food:      { low: 57_200, high: 114_500, conf: 'High',   pct: 35.9, target: 30 },
    delivery:  { low: 23_200, high: 46_400,  conf: 'Medium' },
    discounts: { low: 14_500, high: 29_000,  conf: 'Medium' },
    voids:     { low: 5_800,  high: 11_600,  conf: 'High' },
  },
  // The standard engagement
  fee: { monthly: 1_800, months: 6, total: 10_800 },
};

Object.assign(window, { fmt$range, CP });

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
