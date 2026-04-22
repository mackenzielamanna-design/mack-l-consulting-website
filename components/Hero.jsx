/* Hero with live ROI calculator */

function Hero() {
  const [revenue, setRevenue] = React.useState(1500000);
  const [rate, setRate] = React.useState(4);

  const recoverable = Math.round(revenue * rate / 100);
  const engagementCost =
    revenue < 1_000_000 ? 10500 :
    revenue < 2_000_000 ? 17500 : 24500;
  const tierName =
    revenue < 1_000_000 ? '$500K – $1M tier' :
    revenue < 2_000_000 ? '$1M – $2M tier' : '$2M+ tier';
  const net = recoverable - engagementCost;
  const multiple = (recoverable / engagementCost).toFixed(1);

  return (
    <section className="hero">
      <div className="container hero-inner">
        <div>
          <div className="hero-eyebrow">Mack in Black</div>
          <h1>
            The money is <em>in the data.</em>
            <br />We help you pull it out.
          </h1>
          <p className="hero-lede">
            Applied data science for independent restaurants. We find the 2–6% of revenue hiding
            in your POS, invoices, and inventory — and put a dollar figure on every fix.
          </p>
          <div className="hero-ctas">
            <a href="#contact" className="btn-primary">
              Start with a Toast export <ArrowRight />
            </a>
            <a href="#sample" className="btn-ghost">See a sample report</a>
          </div>
          <div className="hero-meta">
            <span>Connecticut</span>
            <span>POS + invoice analysis</span>
            <span>6-month engagements</span>
          </div>
        </div>

        <div className="roi-card" aria-label="Live ROI estimator">
          <div className="roi-card-head">
            <div className="roi-card-title">Live estimator</div>
            <div className="roi-card-badge">NO SIGNUP</div>
          </div>

          <div className="roi-field">
            <label className="roi-label">Your annual revenue</label>
            <div className="roi-input-wrap">
              <input
                className="roi-input"
                type="text"
                value={revenue.toLocaleString()}
                onChange={(e) => {
                  const n = parseInt(e.target.value.replace(/[^\d]/g, ''), 10) || 0;
                  setRevenue(Math.min(Math.max(n, 100000), 10000000));
                }}
              />
            </div>
            <input
              className="roi-slider"
              type="range"
              min="500000" max="5000000" step="50000"
              value={revenue}
              onChange={(e) => setRevenue(parseInt(e.target.value, 10))}
            />
            <div className="roi-slider-scale">
              <span>$500K</span><span>$2.5M</span><span>$5M</span>
            </div>
          </div>

          <div className="roi-field">
            <label className="roi-label">
              Recoverable scenario — {rate}% {rate <= 2 ? '(conservative)' : rate <= 4 ? '(typical)' : '(strong)'}
            </label>
            <input
              className="roi-slider"
              type="range"
              min="2" max="6" step="1"
              value={rate}
              onChange={(e) => setRate(parseInt(e.target.value, 10))}
            />
            <div className="roi-slider-scale">
              <span>2%</span><span>3%</span><span>4%</span><span>5%</span><span>6%</span>
            </div>
          </div>

          <div className="roi-result">
            <div className="roi-result-row">
              <span className="k">{tierName}</span>
              <span className="v">{fmt$full(engagementCost)} / yr 1</span>
            </div>
            <div className="roi-result-row">
              <span className="k">Net after fees · {multiple}× ROI</span>
              <span className="v" style={{ color: 'var(--moss)' }}>
                +{fmt$full(net)}
              </span>
            </div>
            <div className="roi-result-big">
              <span className="k">Recoverable / yr</span>
              <span className="v">{fmt$full(recoverable)}</span>
            </div>
          </div>

          <div className="roi-foot">
            Benchmarks — National Restaurant Association, Restaurant365, Toast
          </div>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
