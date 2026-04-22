/* Final CTA + footer */

function FinalCTA() {
  const mailto = "mailto:mackenzielamanna@gmail.com?subject=Interested%20in%20Mack%20in%20Black&body=Hi%20Mack%2C%0A%0AI%27d%20like%20to%20learn%20more%20about%20your%20restaurant%20optimization%20services.%0A%0ARestaurant%20Name%3A%20%0AEstimated%20Annual%20Revenue%3A%20%0APOS%3A%20%0A%0AThanks%21";
  return (
    <section id="contact" className="final-cta">
      <div className="narrow">
        <h2>Ready to see <em>your numbers?</em></h2>
        <p>Start with a two-minute Toast export. We build the rest together.</p>
        <a href={mailto} className="btn-primary" style={{ fontSize: 15, padding: '16px 30px' }}>
          Email Mack <ArrowRight size={16} />
        </a>
        <div className="input-line">mackenzielamanna@gmail.com · no commitment · no pressure · just data</div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div>Mack in Black — getting restaurants back in the black</div>
        <div style={{ display: 'flex', gap: 18 }}>
          <a href="#sample">Sample report</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </div>
        <div>© 2026 · Connecticut</div>
      </div>
    </footer>
  );
}

window.FinalCTA = FinalCTA;
window.Footer = Footer;
