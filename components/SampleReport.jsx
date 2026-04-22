/* Sample report — Copper Pot phases as tabs */

const REPORT_PHASES = [
  {
    key: '1a',
    tab: 'Phase 1a',
    tabSub: 'POS data',
    when: 'Week 1',
    title: 'Owner estimates + POS data',
    intro: 'What becomes visible with just a Toast export and a 30-minute conversation about what things cost to make.',
    inputs: ['Toast Sales Summary', 'Payroll export', '30-min owner call'],
    running: 60000,
    findings: [
      { dollar: 34800, title: 'Third-party delivery commissions', desc: '24% of revenue through DoorDash / UberEats / GrubHub at ~25% fees. Shifting 30% of that volume to direct ordering recovers this.' },
      { dollar: 11600, title: 'Void rate at 1.6% (vs. 1% target)', desc: 'Excess voids add up quickly at this revenue level. Usually a quick fix — often related to POS entry patterns.' },
      { dollar: 8000, title: 'Weekend revenue concentration', desc: 'Fri–Sun drives 58% of revenue but staffing is flat across the week. Trim slow days, reinvest in peak shifts.' },
      { dollar: 5600, title: 'Discounting above benchmark', desc: 'Running at 2.4% of gross vs. the 2% target. Audit which discounts actually drive repeat visits vs. give away margin.' },
    ],
  },
  {
    key: '1b',
    tab: 'Phase 1b',
    tabSub: 'Recipe costs',
    when: 'Weeks 2–3',
    title: 'Real recipe costing from invoices',
    intro: 'With 6+ months of vendor invoices and a kitchen walkthrough, the food-cost picture sharpens from estimate to exact.',
    inputs: ['6 mo vendor invoices', 'Recipe walkthrough', 'Menu mix from POS'],
    running: 197500,
    findings: [
      { dollar: 114000, title: 'Blended food cost is actually 35.9%', desc: 'With exact recipe costs across the menu, the gap from the 30% target comes into focus — 5.9 points on $1.9M is the single biggest finding.' },
      { dollar: 15000, title: 'Top sellers are above 35% food cost', desc: 'Burgers, wings, salmon — highest volume, thinnest margins. Small per-item adjustments have outsized impact.' },
      { dollar: 8500, title: 'Vendor prices crept up on 7 items', desc: 'Chicken breast up 11%, heavy cream up 8%. Easy to miss when you\u2019re running the floor — now visible and negotiable.' },
    ],
  },
  {
    key: '2',
    tab: 'Phase 2',
    tabSub: 'The gap',
    when: 'Months 2–3',
    title: 'Theoretical vs. actual — the gap',
    intro: 'With monthly inventory counts, we can finally compare what food should have cost with what you actually spent.',
    inputs: ['Monthly inventory counts', 'Continued invoice tracking'],
    running: 253000,
    compare: {
      theoretical: 53200,
      actual: 57800,
      gap: 4600,
    },
    findings: [
      { dollar: 23000, title: 'Portion drift', desc: 'A few high-volume items coming out slightly heavier than spec. Natural over time — a quick recalibration fixes it.' },
      { dollar: 15400, title: 'Untracked spoilage', desc: 'Produce and dairy waste higher than the log reflects. Common when the team is busy; tightening the process closes the gap.' },
      { dollar: 10000, title: 'Comps and employee meals', desc: 'Part of doing business — but tracking them keeps the numbers honest and the budget predictable.' },
      { dollar: 6800, title: 'Inventory inefficiency', desc: 'Over-ordering on slow-moving items. Cash sitting on shelves turning less than 2× / month.' },
    ],
  },
  {
    key: 'ongoing',
    tab: 'Ongoing',
    tabSub: 'Monthly drift',
    when: 'Month 3+',
    title: 'Monitoring catches drift as it happens',
    intro: 'Once the baseline is set, a monthly refresh catches new drift in the same week it appears — not six months later.',
    inputs: ['Monthly POS refresh', 'Invoice feed', 'Inventory counts'],
    running: null,
    timeline: [
      { month: 'Month 4', event: 'Chicken breast price jumps 6% on a new invoice. Flagged the same week. Owner calls vendor, gets a price hold.', saved: 1800 },
      { month: 'Month 5', event: 'Theoretical-actual gap widens by $400/mo. A new cook running portions heavy on steak. Quick coaching, back on track.', saved: 4800 },
      { month: 'Month 6', event: 'Seasonal menu review using margin data. Two low-margin items replaced with higher-margin alternatives. Average check +$1.20.', saved: 9500 },
      { month: 'Month 8', event: 'Year-over-year now possible. Food cost down 2.8 pts. Labor tightened 1.2 pts. Owner working 8 fewer hours / week.', saved: null },
    ],
  },
];

function SampleReport() {
  const [active, setActive] = React.useState(0);
  const phase = REPORT_PHASES[active];

  return (
    <section id="sample">
      <div className="container">
        <div className="section-head">
          <div className="section-kicker" data-num="02 —">Sample diagnostic</div>
          <h2>A walk-through, phase by phase — <em>The Copper Pot.</em></h2>
          <p>A fictional $1.9M casual-dining restaurant built from industry benchmarks — structured exactly like a real engagement. Each phase builds on the last, and you see the value compound.</p>
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
              {phase.running != null && (
                <div className="rb-banner-right">
                  <div className="running">Cumulative value identified</div>
                  <div className="running-val">{fmt$full(phase.running)} <span style={{ fontSize: 14, color: 'var(--ink-mute)' }}>/ yr</span></div>
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
                  <div className="k">Unaccounted gap</div>
                  <div className="v">{fmt$full(phase.compare.gap)}<span style={{ fontSize: 13, color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}> / mo</span></div>
                </div>
              </div>
            )}

            {phase.findings && (
              <div className="finding-list">
                {phase.findings.map((f, i) => (
                  <div key={i} className="finding-item">
                    <div className="f-dollar">
                      ~{fmt$full(f.dollar)}
                      <small>per year</small>
                    </div>
                    <div className="f-body">
                      <div className="f-title">{f.title}</div>
                      <div className="f-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
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
