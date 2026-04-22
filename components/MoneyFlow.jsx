/* Where the money goes — animated P&L breakdown with drill-in */

const MF_CATS = [
  { key: 'food', label: 'Food cost', pct: 35.9, amt: 682100, recoverable: 112100, target: 30.0,
    headline: 'Food cost is 35.9% — 5.9 points above target',
    body: 'On $1.9M revenue, each percentage point of food cost is $19K / year. The gap comes from a mix of recipe-level margin bleeders, portion drift, vendor price creep, and untracked waste.',
    stats: [{ k: 'Target', v: '30.0%', g: false }, { k: 'Recoverable', v: '$112K', g: true }] },
  { key: 'labor', label: 'Labor', pct: 32.0, amt: 608000, recoverable: 23000, target: 30.0,
    headline: 'Labor is 2 points above where it could be',
    body: 'Weekend drives 58% of sales but staffing is flat. Trimming slow-day hours and reinvesting in peak shifts recovers margin without hurting service.',
    stats: [{ k: 'Target', v: '30.0%', g: false }, { k: 'Recoverable', v: '$23K', g: true }] },
  { key: 'delivery', label: 'Third-party delivery', pct: 6.1, amt: 116000, recoverable: 34800, target: 3.5,
    headline: 'Delivery apps take ~25% of every order',
    body: '24% of revenue flows through DoorDash / UberEats / GrubHub. Shifting 30% of that volume to direct ordering keeps the margin on every recovered sale.',
    stats: [{ k: 'Fee rate', v: '~25%', g: false }, { k: 'Recoverable', v: '$35K', g: true }] },
  { key: 'occupancy', label: 'Rent + occupancy', pct: 8.5, amt: 161500, recoverable: 0, target: 8.5,
    headline: 'Rent is fixed — but it sets the math',
    body: 'Occupancy costs are the one line that almost never moves. Everything else has to flex around it. Which is why the variable costs above deserve the scrutiny.',
    stats: [{ k: 'Monthly', v: '$13.5K', g: false }, { k: 'Recoverable', v: '—', g: false }] },
  { key: 'other', label: 'Other operating', pct: 9.5, amt: 180500, recoverable: 13000, target: 8.0,
    headline: 'Utilities, supplies, marketing, repairs',
    body: 'The miscellaneous line. Individually small, collectively meaningful. Most of the savings here come from vendor consolidation and untangling auto-renewing subscriptions.',
    stats: [{ k: 'Target', v: '8.0%', g: false }, { k: 'Recoverable', v: '$13K', g: true }] },
  { key: 'profit', label: 'Net profit', pct: 8.0, amt: 152000, recoverable: null, target: 12.0,
    headline: 'What\u2019s left — and what it could be',
    body: 'At 8% net, The Copper Pot is in line with independent-restaurant norms. Close the recoverable gaps and net profit moves toward 15% — roughly doubling take-home.',
    stats: [{ k: 'Current', v: '8.0%', g: false }, { k: 'Potential', v: '~15%', g: true }] },
];

function MoneyFlow() {
  const [active, setActive] = React.useState('food');
  const [reveal, setReveal] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setReveal(true); });
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const activeCat = MF_CATS.find(c => c.key === active);
  const maxPct = Math.max(...MF_CATS.map(c => c.pct));

  return (
    <section id="money" ref={ref}>
      <div className="container">
        <div className="section-head">
          <div className="section-kicker" data-num="03 —">Where the money goes</div>
          <h2>Every dollar a restaurant earns <em>has a job.</em></h2>
          <p>On The Copper Pot's $1.9M of revenue, here is where each dollar lands — and which of those lines have slack. Click any line to see the story behind it.</p>
        </div>

        <div className="mf-wrap">
          <div className="mf-chart">
            <div className="mf-chart-head">
              <span>Revenue allocation</span>
              <span className="mf-rev">$1,900,000</span>
            </div>
            {MF_CATS.map(cat => {
              const width = reveal ? (cat.pct / maxPct) * 100 : 0;
              const recoverableWidth = reveal && cat.recoverable ? (cat.recoverable / cat.amt) * width : 0;
              const isActive = active === cat.key;
              return (
                <div
                  key={cat.key}
                  className={`mf-bar-row ${isActive ? 'active' : active ? 'dim' : ''}`}
                  onClick={() => setActive(cat.key)}
                  onMouseEnter={() => setActive(cat.key)}
                >
                  <div className="mf-bar-label">
                    <span>{cat.label} · {cat.pct.toFixed(1)}%</span>
                    <span className="amt">{fmt$full(cat.amt)}</span>
                  </div>
                  <div className="mf-bar-track">
                    <div className="mf-bar" style={{ width: `${width}%` }} />
                    {cat.recoverable > 0 && (
                      <div
                        className="mf-bar recoverable"
                        style={{
                          width: `${recoverableWidth}%`,
                          position: 'absolute', top: 0, left: 0,
                          transitionDelay: '0.4s',
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
            <div style={{
              display: 'flex', gap: 16, paddingTop: 14, marginTop: 10,
              borderTop: '1px solid var(--rule)',
              fontFamily: 'var(--mono)', fontSize: 10.5,
              color: 'var(--ink-mute)', letterSpacing: '0.05em',
            }}>
              <span><i style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--ink)', marginRight: 6, verticalAlign: 'middle' }} />Total</span>
              <span><i style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--ember)', marginRight: 6, verticalAlign: 'middle' }} />Recoverable</span>
            </div>
          </div>

          <div className="mf-detail">
            <div className="mf-detail-kicker">{activeCat.label} · {activeCat.pct.toFixed(1)}% of revenue</div>
            <h3>{activeCat.headline}</h3>
            <p>{activeCat.body}</p>
            <div className="mf-stats">
              {activeCat.stats.map((s, i) => (
                <div key={i} className={`mf-stat ${s.g ? 'good' : ''}`}>
                  <div className="k">{s.k}</div>
                  <div className="v">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.MoneyFlow = MoneyFlow;
