/* Findings strip — what we typically find, as a horizontal band */

function Findings() {
  const items = [
    { num: '2–6%', label: 'Revenue recoverable', desc: 'Typical total opportunity found through POS, invoice, and inventory analysis.' },
    { num: '3–10%', label: 'Theoretical ↔ actual gap', desc: 'The difference between what food should cost and what you actually spent.' },
    { num: '$15–45K', label: 'Labor misalignment', desc: 'Staffing flat across the week when 58% of revenue comes Fri–Sun.' },
    { num: '3–8%', label: 'Vendor price creep', desc: 'Annual ingredient inflation nobody emails you about. Compounds silently.' },
  ];
  return (
    <section id="findings">
      <div className="container">
        <div className="section-head">
          <div className="section-kicker" data-num="01 —">What we typically find</div>
          <h2>Every restaurant is different. The <em>patterns</em> are not.</h2>
          <p>Across independent operators, these four numbers show up again and again. Individually small — together, they define the gap between a good year and a great one.</p>
        </div>
      </div>
      <div className="findings-row">
        {items.map((it, i) => (
          <div key={i} className="finding-cell">
            <div className="fc-num"><em>{it.num}</em></div>
            <div className="fc-label">{it.label}</div>
            <div className="fc-desc">{it.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

window.Findings = Findings;
