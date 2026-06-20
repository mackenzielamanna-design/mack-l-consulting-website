/* Tweaks panel — aesthetic + accent + density */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "aesthetic": "ledger",
  "accent": "ember"
}/*EDITMODE-END*/;

const AESTHETICS = [
  { key: 'editorial', label: 'Editorial' },
  { key: 'ink', label: 'Ink' },
  { key: 'ledger', label: 'Ledger' },
];

const ACCENTS = [
  { key: 'ember', label: 'Ember' },
  { key: 'moss', label: 'Moss' },
  { key: 'ink', label: 'Ink-only' },
];

function Tweaks({ aesthetic, setAesthetic, accent, setAccent }) {
  const [active, setActive] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    // Standalone access for the owner: append ?dev to the URL to open the panel.
    // Normal visitors never see it (no ?dev, no edit-mode host message).
    if (new URLSearchParams(window.location.search).has('dev')) {
      setActive(true);
    }
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') { setActive(true); setOpen(true); }
      if (e.data?.type === '__deactivate_edit_mode') { setActive(false); setOpen(false); }
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const update = (key, value) => {
    if (key === 'aesthetic') setAesthetic(value);
    if (key === 'accent') setAccent(value);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: value } }, '*');
  };

  if (!active) return null;

  return (
    <>
      <button className={`tweaks-toggle visible`} onClick={() => setOpen(!open)} aria-label="Tweaks">
        ✶
      </button>
      {open && (
        <div className="tweaks-panel">
          <h4>Tweaks</h4>
          <div className="tweaks-row">
            <label className="tweaks-label">Aesthetic direction</label>
            <div className="tweaks-options">
              {AESTHETICS.map(a => (
                <button
                  key={a.key}
                  className={`tweaks-option ${aesthetic === a.key ? 'active' : ''}`}
                  onClick={() => update('aesthetic', a.key)}
                >{a.label}</button>
              ))}
            </div>
          </div>
          <div className="tweaks-row">
            <label className="tweaks-label">Accent color</label>
            <div className="tweaks-options">
              {ACCENTS.map(a => (
                <button
                  key={a.key}
                  className={`tweaks-option ${accent === a.key ? 'active' : ''}`}
                  onClick={() => update('accent', a.key)}
                >{a.label}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

window.Tweaks = Tweaks;
window.TWEAK_DEFAULTS = TWEAK_DEFAULTS;
