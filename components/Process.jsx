/* How it works — four-column horizontal timeline */

function Process() {
  const steps = [
    { when: 'Week 1', title: 'Toast export + call', desc: 'Two-minute export from your POS. Thirty-minute call with you about what things cost to make. First findings inside a week.', tag: '→ phase 01 begins' },
    { when: 'Weeks 2–3', title: 'Invoices + recipes', desc: 'Six months of vendor invoices fed into real recipe costs. Every menu item has an exact dollar figure behind it.', tag: '→ margin picture sharp' },
    { when: 'Months 2–3', title: 'Inventory + the gap', desc: 'Monthly inventory counts unlock theoretical-vs-actual — the most powerful number in restaurant finance.', tag: '→ phase 02 complete' },
    { when: 'Month 3+', title: 'Monthly monitoring', desc: 'Fresh data every month. Vendor creep, portion drift, seasonal shifts — caught the week they happen instead of two quarters later.', tag: '→ compounding' },
  ];
  return (
    <section id="process">
      <div className="container">
        <div className="section-head">
          <div className="section-kicker" data-num="05 —">How it works</div>
          <h2>Four phases. <em>Each one pays for the next.</em></h2>
          <p>You never commit blind. Phase 1 delivers a report with dollar figures attached — if the numbers aren't there, we don't move forward.</p>
        </div>
      </div>
      <div className="process-wrap container" style={{ maxWidth: 1200 }}>
        {steps.map((s, i) => (
          <div key={i} className="process-col">
            <div className="pc-tick" />
            <div className="pc-when">{s.when}</div>
            <div className="pc-title">{i === 0 ? <>Toast export <em>+ call</em></> : s.title}</div>
            <div className="pc-desc">{s.desc}</div>
            <div className="pc-tag">{s.tag}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

window.Process = Process;
