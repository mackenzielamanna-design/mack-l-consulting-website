/* Pricing ↔ ROI selector */

const TIERS = [
  {
    key: 's',
    name: '$500K — $1M',
    sub: 'Small independents',
    desc: 'Single unit, owner-operator. Getting the numbers visible for the first time.',
    diagnostic: 1500,
    impl: 1500,
    maint: 750,
    year1: 10500,
    avgRev: 750000,
  },
  {
    key: 'm',
    name: '$1M — $2M',
    sub: 'Established operators',
    desc: 'Doing well — looking for the 5 figures that would otherwise slip by.',
    diagnostic: 2500,
    impl: 2500,
    maint: 1250,
    year1: 17500,
    avgRev: 1500000,
  },
  {
    key: 'l',
    name: '$2M +',
    sub: 'Multi-unit / high-volume',
    desc: 'The stakes are bigger. So is the recoverable dollar amount. So is the reporting cadence.',
    diagnostic: 3500,
    impl: 3500,
    maint: 1800,
    year1: 24500,
    avgRev: 2500000,
  },
];

function Pricing() {
  const [tier, setTier] = React.useState('m');
  const t = TIERS.find(x => x.key === tier);

  const conservative = Math.round(t.avgRev * 0.02);
  const typical = Math.round(t.avgRev * 0.04);
  const strong = Math.round(t.avgRev * 0.06);
  const maxShown = strong;

  return (
    <section id="pricing">
      <div className="container">
        <div className="section-head">
          <div className="section-kicker" data-num="04 —">Pricing</div>
          <h2>Scaled to your revenue. <em>Not to your optimism.</em></h2>
          <p>Three phases, three sizes. Every phase stands on its own — you never commit to the next until the previous one has earned it.</p>
        </div>

        <div className="pricing-shell">
          <div className="pricing-tiers">
            {TIERS.map(x => (
              <button
                key={x.key}
                className={`tier-btn ${x.key === tier ? 'active' : ''}`}
                onClick={() => setTier(x.key)}
              >
                <div className="tb-kicker">{x.sub}</div>
                <div className="tb-name">{x.name}</div>
              </button>
            ))}
          </div>

          <div className="pricing-detail">
            <div className="pd-head">
              <div className="pd-head-left">
                <h3>{t.name} in revenue</h3>
                <p>{t.desc}</p>
              </div>
              <div className="pd-summary">
                <div className="ps-k">Year 1 total</div>
                <div className="ps-v">{fmt$full(t.year1)}</div>
              </div>
            </div>

            <div className="pd-phases">
              <div className="pd-phase">
                <div className="pp-num">Phase 01</div>
                <div className="pp-title">Diagnostic</div>
                <div className="pp-desc">One-time deep analysis. Report you can act on in a week.</div>
                <div className="pp-price">{fmt$full(t.diagnostic)} <span>one-time</span></div>
              </div>
              <div className="pd-phase">
                <div className="pp-num">Phase 02</div>
                <div className="pp-title">Implementation</div>
                <div className="pp-desc">6-month engagement — recipe costing, vendor tracking, monthly monitoring.</div>
                <div className="pp-price">{fmt$full(t.impl)}<span> / mo × 6</span></div>
              </div>
              <div className="pd-phase">
                <div className="pp-num">Phase 03</div>
                <div className="pp-title">Maintenance</div>
                <div className="pp-desc">Month-to-month monitoring & drift alerts after the system is built.</div>
                <div className="pp-price">{fmt$full(t.maint)}<span> / mo</span></div>
              </div>
            </div>

            <div className="pd-roi">
              <div className="pd-roi-head">What this engagement returns — based on industry benchmarks</div>
              <div className="pd-roi-row cost">
                <div className="r-label">Year 1 fees</div>
                <div className="r-bar"><div className="fill" style={{ '--w': `${(t.year1 / maxShown) * 100}%` }} /></div>
                <div className="r-val">{fmt$full(t.year1)}</div>
              </div>
              <div className="pd-roi-row">
                <div className="r-label">Conservative · 2%</div>
                <div className="r-bar"><div className="fill" style={{ '--w': `${(conservative / maxShown) * 100}%` }} /></div>
                <div className="r-val">{fmt$full(conservative)}</div>
              </div>
              <div className="pd-roi-row">
                <div className="r-label">Typical · 4%</div>
                <div className="r-bar"><div className="fill" style={{ '--w': `${(typical / maxShown) * 100}%` }} /></div>
                <div className="r-val">{fmt$full(typical)}</div>
              </div>
              <div className="pd-roi-row">
                <div className="r-label">Strong · 6%</div>
                <div className="r-bar"><div className="fill" style={{ '--w': `${(strong / maxShown) * 100}%` }} /></div>
                <div className="r-val">{fmt$full(strong)}</div>
              </div>
            </div>

            <div style={{
              marginTop: 20, fontFamily: 'var(--mono)', fontSize: 11.5,
              color: 'var(--ink-mute)', letterSpacing: '0.03em',
              paddingTop: 16, borderTop: '1px dashed var(--rule)',
            }}>
              Assumes revenue of {fmt$full(t.avgRev)} — midpoint of the tier. Year 2 costs drop roughly 40–50% as monitoring replaces implementation.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Pricing = Pricing;
