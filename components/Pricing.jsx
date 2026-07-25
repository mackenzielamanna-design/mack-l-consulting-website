/* Pricing — flat engagement + live ROI */

const REV_BANDS = [
  { key: 's', name: '$500K — $1M',  sub: 'Small independents', avgRev: 750_000 },
  { key: 'm', name: '$1M — $2M',    sub: 'Established operators', avgRev: 1_500_000 },
  { key: 'l', name: '$2M +',        sub: 'Multi-unit / high-volume', avgRev: 2_500_000 },
];

function Pricing() {
  const [band, setBand] = React.useState('m');
  const b = REV_BANDS.find(x => x.key === band);

  const fee = CP.fee.total; // flat $10,800
  const conservative = Math.round(b.avgRev * 0.02);
  const typical = Math.round(b.avgRev * 0.04);
  const strong = Math.round(b.avgRev * 0.06);
  const maxShown = strong;

  return (
    <section id="pricing">
      <div className="container">
        <div className="section-head">
          <div className="section-kicker" data-num="04 —">Pricing</div>
          <h2>One price. <em>No surprises.</em></h2>
          <p>A single six-month engagement — diagnostic, implementation, and monitoring included. The ROI below scales with your revenue; the fee doesn't.</p>
        </div>

        <div className="pricing-shell">
          <div className="pricing-detail" style={{ gridColumn: '1 / -1' }}>
            <div className="pd-head">
              <div className="pd-head-left">
                <h3>The engagement</h3>
                <p>One flat price for the full six months — diagnostic, implementation, and monitoring. Limited to three active clients at a time, so every engagement gets real attention.</p>
              </div>
              <div className="pd-summary">
                <div className="ps-k">{CP.fee.months}-month total</div>
                <div className="ps-v">{fmt$full(fee)}</div>
              </div>
            </div>

            <div className="pd-phases">
              <div className="pd-phase">
                <div className="pp-num">Month 01</div>
                <div className="pp-title">Diagnostic</div>
                <div className="pp-desc">Full analysis of POS, invoices, and inventory. A report you can act on in a week.</div>
                <div className="pp-price">Included <span>no separate fee</span></div>
              </div>
              <div className="pd-phase">
                <div className="pp-num">Months 02–03</div>
                <div className="pp-title">Implementation</div>
                <div className="pp-desc">Recipe costing, vendor renegotiation support, menu repricing — each finding worked to a target.</div>
                <div className="pp-price">Included <span>bi-weekly check-ins</span></div>
              </div>
              <div className="pd-phase">
                <div className="pp-num">Months 04–06</div>
                <div className="pp-title">Monitoring</div>
                <div className="pp-desc">Monthly drift detection on margin, vendor prices, and labor — caught the week it appears.</div>
                <div className="pp-price">Included <span>monthly reports</span></div>
              </div>
            </div>

            <div className="pd-roi">
              <div className="pd-roi-head">
                What the engagement returns — at
                <span className="pricing-bands">
                  {REV_BANDS.map(x => (
                    <button
                      key={x.key}
                      className={`band-btn ${x.key === band ? 'active' : ''}`}
                      onClick={() => setBand(x.key)}
                    >{x.name}</button>
                  ))}
                </span>
              </div>
              <div className="pd-roi-row cost">
                <div className="r-label">{CP.fee.months}-month fee</div>
                <div className="r-bar"><div className="fill" style={{ '--w': `${(fee / maxShown) * 100}%` }} /></div>
                <div className="r-val">{fmt$full(fee)}</div>
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
              {fmt$full(CP.fee.monthly)} / month · {CP.fee.months}-month minimum · no upfront diagnostic fee. Recovery shown as 2–6% of {fmt$full(b.avgRev)} revenue (industry benchmark range); your diagnostic puts an exact low–high figure on it.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Pricing = Pricing;
