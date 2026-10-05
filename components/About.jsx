/* About — Mack bio */

function About() {
  return (
    <section id="about">
      <div className="container about-grid">
        <div className="about-signature">
          {/* Drop a real photo at website/headshot.jpg to replace the monogram. */}
          <div className="as-avatar">
            <img
              src="headshot.jpg"
              alt="Mackenzie Lamanna"
              className="as-photo"
              onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
            />
            <span className="as-monogram" style={{ display: 'none' }}>m</span>
          </div>
          <div className="as-name">Mackenzie Lamanna</div>
          <div className="as-title">Operations data and diagnostics</div>
          <div className="as-meta">
            <div>
              <div className="m-k">Based in</div>
              <div className="m-v">Connecticut</div>
            </div>
            <div>
              <div className="m-k">Focus</div>
              <div className="m-v">Food and beverage operations</div>
            </div>
            <div>
              <div className="m-k">Background</div>
              <div className="m-v">Manufacturing analytics</div>
            </div>
            <div>
              <div className="m-k">Engagements</div>
              <div className="m-v">Diagnostic, then monthly</div>
            </div>
          </div>
        </div>

        <div className="about-copy">
          <h3>Finding where a manufacturer's money went. <em>Now food and beverage.</em></h3>
          <p>
            I spent years inside a life-sciences manufacturer working out why production
            runs failed and what that cost. The method never changed: pull the data out of
            systems that don't talk to each other, join it, and put a number on the problem.
          </p>
          <p>
            A food and beverage operation is the same shape, whether it's one restaurant or a
            resort with six outlets. The POS, the invoices, and payroll each hold one piece,
            and the margin lives in the joins between them. I build the reporting the
            chains take for granted, item-level margins, real recipe costs, vendor price
            tracking, labor against demand by hour, and I put a dollar range on every finding
            with the data it came from.
          </p>
          <div className="about-pullquote">
            "The money is there. It's just hiding in the details. My job is to put a number on every one of them."
          </div>
        </div>
      </div>
    </section>
  );
}

window.About = About;
