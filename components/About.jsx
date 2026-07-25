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
          <div className="as-title">Applied Data Scientist · Operational Optimization</div>
          <div className="as-meta">
            <div>
              <div className="m-k">Based in</div>
              <div className="m-v">Connecticut</div>
            </div>
            <div>
              <div className="m-k">Focus</div>
              <div className="m-v">Independent restaurants</div>
            </div>
            <div>
              <div className="m-k">Tools</div>
              <div className="m-v">POS · R · invoices</div>
            </div>
            <div>
              <div className="m-k">Engagements</div>
              <div className="m-v">6 months, then monthly</div>
            </div>
          </div>
          <div className="mb-seal" aria-label="Client capacity: 3 spots open">
            <div className="ms-sm">Only</div>
            <div className="ms-big">3</div>
            <div className="ms-sm">spots open</div>
          </div>
        </div>

        <div className="about-copy">
          <h3>I'm an applied data scientist who <em>loves restaurants.</em></h3>
          <p>
            Independent operators run on instinct — and that instinct is almost always right.
            The problem isn't bad decisions. It's that the details the decisions depend on live
            in seven different places: a POS, a stack of invoices, a payroll portal, a notebook
            in the back office, and a few Excel tabs nobody has time to open.
          </p>
          <p>
            I build the picture the chains take for granted: item-level margins, exact recipe
            costs, vendor price tracking, labor against daypart demand. Every recommendation
            comes with a dollar figure attached. No platform to buy. No retainer that outlives
            its value.
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
