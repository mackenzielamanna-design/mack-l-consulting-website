/* Sample report — Copper Pot phases as tabs.
   Numbers are the canonical CP set (see Primitives.jsx) — non-overlapping,
   ranged, and consistent with the rendered diagnostic. The running total
   TIGHTENS as data deepens; it never double-counts food-cost drivers. */

const REPORT_PHASES = [
  {
    key: '1a',
    tab: 'Phase 1a',
    tabSub: 'POS data',
    when: 'Week 1',
    title: 'POS data + owner conversation',
    intro: 'What becomes visible with just a Toast export and a 30-minute conversation. Real ranges from day one — wide, because they are estimates until the data deepens.',
    inputs: ['Toast Sales Summary', 'Payroll export', '30-min owner call'],
    range: { low: 43500, high: 87000 },
    rangeNote: 'estimates — three channel & revenue-leak findings',
    findings: [
      { low: 23200, high: 46400, conf: 'Medium', title: 'Third-party delivery commissions', desc: '24% of revenue through DoorDash / UberEats / GrubHub at ~25% fees. Shifting 20–40% of that volume to direct ordering recovers this — the range is the shift rate.' },
      { low: 14500, high: 29000, conf: 'Medium', title: 'Discounting above benchmark', desc: 'Running at 2.4% of gross vs. the 2% target. 30–60% is typically recoverable without hurting traffic.' },
      { low: 5800, high: 11600, conf: 'High', title: 'Void rate at 1.6% (vs. 1% target)', desc: 'Excess voids add up quickly at this revenue level. Usually a quick fix — often POS entry patterns.' },
    ],
  },
  {
    key: '1b',
    tab: 'Phase 1b',
    tabSub: 'Recipe costs',
    when: 'Weeks 2–3',
    title: 'Recipe costing sharpens the big one',
    intro: 'With 6+ months of vendor invoices and a kitchen walkthrough, the food-cost gap resolves from guess to measured. The total range tightens to a real number — it does not balloon.',
    inputs: ['6 mo vendor invoices', 'Recipe walkthrough', 'Menu mix from POS'],
    range: { low: 100500, high: 201500, str: CP.oppStr },
    rangeNote: 'the diagnostic’s headline range — adds the food gap, nothing double-counted',
    findings: [
      {
        low: 57200, high: 114500, conf: 'High',
        title: 'Blended food cost is 35.9% — 5.9 pts above target',
        desc: 'Recipe-weighted across the menu. On $1.9M, the low end assumes half the gap closes in year one; the high end is the full measured gap.',
        drivers: [
          'Top sellers above 35% food cost — burgers, wings, salmon',
          'Vendor prices crept up on 24 line items (chicken +11%, cream +8%)',
          'Untracked waste and portion drift',
        ],
      },
    ],
  },
  {
    key: '2',
    tab: 'Phase 2',
    tabSub: 'The gap',
    when: 'Months 2–3',
    title: 'Theoretical vs. actual — locating the gap',
    intro: 'Monthly inventory counts let us compare what food should have cost with what was actually spent. This does not add a new number — it shows exactly where the food-cost gap above is hiding, which is what makes it fixable.',
    inputs: ['Monthly inventory counts', 'Continued invoice tracking'],
    range: { low: 100500, high: 201500, str: CP.oppStr },
    rangeNote: 'same range, now located and confirmed — confidence rises, the number does not',
    compare: { theoretical: 53200, actual: 57800, gap: 4600 },
    drivers: [
      'Portion drift — a few high-volume items coming out heavier than spec',
      'Untracked spoilage — produce and dairy waste above what the log reflects',
      'Comps and employee meals running untracked',
    ],
    capital: 22000,
  },
  {
    key: 'ongoing',
    tab: 'Ongoing',
    tabSub: 'Monthly drift',
    when: 'Month 3+',
    title: 'Monitoring catches drift as it happens',
    intro: 'Once the baseline is set, a monthly refresh catches new drift in the same week it appears — not six months later. Each catch is incremental, on top of the recovery already booked.',
    inputs: ['Monthly POS refresh', 'Invoice feed', 'Inventory counts'],
    range: null,
    timeline: [
      { month: 'Month 4', event: 'Chicken breast price jumps 6% on a new invoice. Flagged the same week. Owner calls vendor, gets a price hold.', saved: 1800 },
      { month: 'Month 5', event: 'Theoretical-actual gap widens by $400/mo. A new cook running portions heavy on steak. Quick coaching, back on track.', saved: 4800 },
      { month: 'Month 6', event: 'Seasonal menu review using margin data. Two low-margin items replaced with higher-margin alternatives. Average check +$1.20.', saved: 9500 },
      { month: 'Month 8', event: 'Year-over-year now possible. Food cost down 2.8 pts. Owner working 8 fewer hours / week.', saved: null },
    ],
  },
];

const CONF_COLOR = { High: '#4a7c59', Medium: '#b8862e', Low: 'var(--ink-mute)' };

function ConfBadge({ level }) {
  return (
    <span style={{
      fontFamily: 'var(--mono)', fontSize: 9.5, letterSpacing: '0.08em',
      textTransform: 'uppercase', padding: '2px 7px', borderRadius: 3,
      border: `1px solid ${CONF_COLOR[level]}`, color: CONF_COLOR[level],
      whiteSpace: 'nowrap', marginLeft: 8,
    }}>{level} conf</span>
  );
}

function SampleReport() {
  const [active, setActive] = React.useState(0);
  const phase = REPORT_PHASES[active];

  return (
    <section id="sample">
      <div className="container">
        <div className="section-head">
          <div className="section-kicker" data-num="02 —">Sample diagnostic</div>
          <h2>A walk-through, phase by phase — <em>The Copper Pot.</em></h2>
          <p>A fictional $1.9M casual-dining restaurant built from industry benchmarks — structured exactly like a real engagement. Watch the opportunity range <em>tighten</em> as the data deepens, not inflate.</p>
        </div>

        <div className="report-shell">
          <div className="report-topbar">
            <div className="rt-left">
              <span className="dot3"><i /><i /><i /></span>
              <span>mack-in-black / copper-pot / diagnostic.pdf</span>
            </div>
            <div>48 menu items · $1.9M ARR · casual dining</div>
          </div>

          <div className="report-tabs" role="tablist">
            {REPORT_PHASES.map((p, i) => (
              <button
                key={p.key}
                className={`report-tab ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
                role="tab"
                aria-selected={i === active}
              >
                <span className="tab-num">0{i + 1}</span>
                <span>{p.tab}</span>
                <span style={{ color: 'var(--ink-mute)' }}>· {p.tabSub}</span>
              </button>
            ))}
          </div>

          <div className="report-body" role="tabpanel">
            <div className="rb-banner">
              <div className="rb-banner-left">
                <div className="phase-label">{phase.when}</div>
                <h3>{phase.title}</h3>
              </div>
              {phase.range && (
                <div className="rb-banner-right">
                  <div className="running">Cumulative opportunity identified</div>
                  <div className="running-val">{phase.range.str || fmt$range(phase.range.low, phase.range.high)} <span style={{ fontSize: 14, color: 'var(--ink-mute)' }}>/ yr</span></div>
                  {phase.rangeNote && (
                    <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', marginTop: 4, maxWidth: 260 }}>{phase.rangeNote}</div>
                  )}
                </div>
              )}
            </div>

            <div className="rb-intro">
              {phase.intro}
              {phase.inputs && (
                <div className="inputs">
                  {phase.inputs.map((inp, i) => (
                    <span key={i} className="input-chip">{inp}</span>
                  ))}
                </div>
              )}
            </div>

            {phase.compare && (
              <div className="gap-compare">
                <div className="gc-col">
                  <div className="k">Theoretical — what food should cost</div>
                  <div className="v">{fmt$full(phase.compare.theoretical)}<span style={{ fontSize: 13, color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}> / mo</span></div>
                </div>
                <div className="gc-op">vs.</div>
                <div className="gc-col bad">
                  <div className="k">Actual — what you spent</div>
                  <div className="v">{fmt$full(phase.compare.actual)}<span style={{ fontSize: 13, color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}> / mo</span></div>
                </div>
                <div className="gc-op">=</div>
                <div className="gc-col result">
                  <div className="k">Monthly gap to close</div>
                  <div className="v">{fmt$full(phase.compare.gap)}<span style={{ fontSize: 13, color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}> / mo</span></div>
                </div>
              </div>
            )}

            {phase.findings && (
              <div className="finding-list">
                {phase.findings.map((f, i) => (
                  <div key={i} className="finding-item">
                    <div className="f-dollar">
                      {fmt$range(f.low, f.high)}
                      <small>per year</small>
                    </div>
                    <div className="f-body">
                      <div className="f-title">
                        {f.title}
                        {f.conf && <ConfBadge level={f.conf} />}
                      </div>
                      <div className="f-desc">{f.desc}</div>
                      {f.drivers && (
                        <div style={{
                          marginTop: 10, paddingLeft: 14,
                          borderLeft: '2px solid var(--rule)',
                        }}>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 6 }}>
                            Drivers inside this number — not added on top
                          </div>
                          {f.drivers.map((d, j) => (
                            <div key={j} style={{ fontSize: 13.5, color: 'var(--ink-mute)', marginBottom: 3 }}>· {d}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {phase.drivers && !phase.findings && (
              <div style={{ marginTop: 4 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 8 }}>
                  Where the food-cost gap lives
                </div>
                {phase.drivers.map((d, i) => (
                  <div key={i} style={{ fontSize: 14, color: 'var(--ink)', marginBottom: 6 }}>· {d}</div>
                ))}
                {phase.capital && (
                  <div className="finding-item" style={{ marginTop: 16 }}>
                    <div className="f-dollar" style={{ color: 'var(--ink)' }}>
                      {fmt$full(phase.capital)}
                      <small>one-time cash</small>
                    </div>
                    <div className="f-body">
                      <div className="f-title">Trapped working capital freed</div>
                      <div className="f-desc">Separate from the annual range above — over-ordering on slow movers means cash sitting on shelves. Tightening pars turns it back into cash flow once.</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {phase.timeline && (
              <div className="finding-list">
                {phase.timeline.map((t, i) => (
                  <div key={i} className="finding-item">
                    <div className="f-dollar" style={{ fontStyle: 'normal', color: 'var(--ink)', fontSize: 18 }}>
                      {t.month}
                      <small>{t.saved ? `+${fmt$full(t.saved)} / yr` : 'compounding'}</small>
                    </div>
                    <div className="f-body">
                      <div className="f-desc" style={{ fontSize: 15, color: 'var(--ink)' }}>{t.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="report-nav">
            <button onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0}>
              <ArrowLeft /> Previous phase
            </button>
            <button onClick={() => setActive(Math.min(REPORT_PHASES.length - 1, active + 1))} disabled={active === REPORT_PHASES.length - 1}>
              Next phase <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

window.SampleReport = SampleReport;
