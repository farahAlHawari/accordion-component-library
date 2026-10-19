import { Icon, Select, Checkbox } from "@/shared/components";
import { OPTIONS } from "@/features/accordion";

function Section({ icon, title, children }) {
  return (
    <section className="sec">
      <h2 className="sec-title"><Icon name={icon} />{title}</h2>
      <div className="sec-body">{children}</div>
    </section>
  );
}

export default function OptionsPanel({ opts, onChange, allClosed, onCloseAll, onExpandAll, onReset,
  isDesktop, open, collapsed, onToggle, theme, onTheme, toggleRef }) {
  // Keeps Tab inside the drawer while it is open (mobile only)
  const trap = (e) => {
    if (e.key !== "Tab" || !open) return;
    const f = [...e.currentTarget.querySelectorAll("button:not(:disabled),select,input")];
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  return (
    <aside id="options-panel" className="sidebar" data-open={open} aria-label="Accordion options" onKeyDown={trap}>
      <div className="dots" aria-hidden="true"><i /><i /><i /></div>
      <div className="side-head">
        <button ref={toggleRef} type="button" className="btn icon-only"
          aria-label={isDesktop ? (collapsed ? "Expand sidebar" : "Collapse sidebar") : "Close options"}
          aria-expanded={isDesktop ? !collapsed : undefined} onClick={onToggle}>
          <Icon name={isDesktop ? "menu" : "close"} />
        </button>
        <span className="side-brand">Accordion</span>
        <button type="button" className="btn icon-only" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} onClick={onTheme}>
          <Icon name={theme === "dark" ? "sun" : "moon"} />
        </button>
      </div>
      <div className="side-scroll">
        <Section icon="sliders" title="Display">
          <Select label="Questions shown" name="count" value={opts.count} options={OPTIONS.count} onChange={onChange} />
          <Select label="Style" name="variant" value={opts.variant} options={OPTIONS.variant} onChange={onChange} />
          <Select label="Size" name="size" value={opts.size} options={OPTIONS.size} onChange={onChange} />
        </Section>
        <Section icon="sparkles" title="Icons">
          <Select label="Icon shape" name="icon" value={opts.icon} options={OPTIONS.icon} onChange={onChange} />
          <Select label="Icon position" name="iconPos" value={opts.iconPos} options={OPTIONS.iconPos} onChange={onChange} />
          <Select label="Heading level" name="level" value={opts.level} options={OPTIONS.level} onChange={onChange} />
        </Section>
        <Section icon="toggle" title="Behaviour">
          <Checkbox label="Allow multiple open" checked={opts.multiple} onChange={(v) => onChange("multiple", v)} />
          <Checkbox label="Close all" checked={allClosed} onChange={onCloseAll} />
          <Checkbox label="Animated" checked={opts.animated} onChange={(v) => onChange("animated", v)} />
          <div className="btn-row">
            <button type="button" className="btn" onClick={onExpandAll} disabled={!opts.multiple}><Icon name="expand" />Expand all</button>
            <button type="button" className="btn" onClick={onReset}><Icon name="reset" />Reset</button>
          </div>
        </Section>
      </div>
    </aside>
  );
}
