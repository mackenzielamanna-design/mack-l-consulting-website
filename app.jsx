/* Main app */

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-logo">
          mack <em>in</em> black<span className="dot">.</span>
        </a>
        <div className="nav-links">
          <a href="#findings">Findings</a>
          <a href="#sample">Sample report</a>
          <a href="#money">Money flow</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
        </div>
        <a href="#contact" className="nav-cta">Start a diagnostic</a>
      </div>
    </nav>
  );
}

function App() {
  const [aesthetic, setAesthetic] = React.useState(window.TWEAK_DEFAULTS.aesthetic);
  const [heroStyle, setHeroStyle] = React.useState(window.TWEAK_DEFAULTS.heroStyle);
  const [accent, setAccent] = React.useState(window.TWEAK_DEFAULTS.accent);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-aesthetic', aesthetic);
  }, [aesthetic]);

  React.useEffect(() => {
    const root = document.documentElement.style;
    if (accent === 'moss') {
      root.setProperty('--ember', aesthetic === 'ink' ? '#7fb085' : '#4a7c59');
      root.setProperty('--ember-soft', aesthetic === 'ink' ? '#1e2a22' : '#d9e5dc');
    } else if (accent === 'ink') {
      root.setProperty('--ember', aesthetic === 'ink' ? '#f5f1ea' : '#0e1116');
      root.setProperty('--ember-soft', aesthetic === 'ink' ? '#262b35' : '#e5e0d2');
    } else {
      root.removeProperty('--ember');
      root.removeProperty('--ember-soft');
    }
  }, [accent, aesthetic]);

  return (
    <div id="top">
      <Nav />
      <Hero />
      <Findings />
      <SampleReport />
      <MoneyFlow />
      <Pricing />
      <Process />
      <About />
      <FinalCTA />
      <Footer />
      <Tweaks
        aesthetic={aesthetic} setAesthetic={setAesthetic}
        heroStyle={heroStyle} setHeroStyle={setHeroStyle}
        accent={accent} setAccent={setAccent}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
