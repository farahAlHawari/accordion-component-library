import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Accordion, FAQ, DEFAULTS } from "@/features/accordion";
import { OptionsPanel } from "@/features/options";
import { Hero } from "@/features/search";
import { RingStat } from "@/features/status";
import { CodeBlock } from "@/features/code-preview";
import { useTheme } from "@/features/theme";
import { Icon } from "@/shared/components";
import { useMediaQuery } from "@/shared/hooks";

export default function App() {
  const [opts, setOpts] = useState(DEFAULTS);
  const [openIds, setOpenIds] = useState(["q1"]);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 860px)");
  const { theme, toggle: toggleTheme } = useTheme();
  const burgerRef = useRef(null);
  const toggleRef = useRef(null);

  const drawerOpen = menuOpen && !isDesktop; // resizing to desktop closes the drawer automatically
  const base = useMemo(() => FAQ.slice(0, opts.count), [opts.count]);
  const openInBase = useMemo(() => openIds.filter((id) => base.some((i) => i.id === id)), [openIds, base]);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? base.filter((i) => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q)) : base;
  }, [base, query]);

  const handleOption = useCallback((key, value) => {
    setOpts((o) => ({ ...o, [key]: value }));
    // Turning "multiple" off keeps only the first open item
    if (key === "multiple" && !value) setOpenIds((ids) => ids.slice(0, 1));
  }, []);

  const toggle = useCallback((id) => {
    setOpenIds((ids) => ids.includes(id) ? ids.filter((x) => x !== id) : opts.multiple ? [...ids, id] : [id]);
  }, [opts.multiple]);

  // "Close all" is checked when nothing is open; unchecking opens the first item
  const handleCloseAll = useCallback((checked) => setOpenIds(checked ? [] : [base[0].id]), [base]);
  const expandAll = useCallback(() => setOpenIds(base.map((i) => i.id)), [base]);
  const reset = useCallback(() => { setOpts(DEFAULTS); setOpenIds(["q1"]); setQuery(""); }, []);

  const closeMenu = useCallback(() => { setMenuOpen(false); burgerRef.current?.focus(); }, []);
  const handleSidebarToggle = useCallback(() => (isDesktop ? setCollapsed((c) => !c) : closeMenu()), [isDesktop, closeMenu]);

  // Mobile drawer: focus, scroll lock, Escape
  useEffect(() => {
    if (!drawerOpen) return;
    toggleRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [drawerOpen, closeMenu]);

  const status = query.trim()
    ? results.length ? `${results.length} ${results.length === 1 ? "result" : "results"}` : "No results"
    : `${base.length} results`;

  const code = `import Accordion from "./components/Accordion/Accordion";

// ${opts.count} React questions currently shown
<Accordion
  items={items}
  variant="${opts.variant}"
  icon="${opts.icon}"
  iconPosition="${opts.iconPos}"
  size="${opts.size}"
  headingLevel={${opts.level}}
  allowMultiple={${opts.multiple}}
  animated={${opts.animated}}
/>`;

  return (
    <div className="shell">
      <div className="window" data-collapsed={collapsed}>
        <OptionsPanel opts={opts} onChange={handleOption} allClosed={openInBase.length === 0}
          onCloseAll={handleCloseAll} onExpandAll={expandAll} onReset={reset}
          isDesktop={isDesktop} open={drawerOpen} collapsed={collapsed} onToggle={handleSidebarToggle}
          theme={theme} onTheme={toggleTheme} toggleRef={toggleRef} />
        <div className="scrim" data-open={drawerOpen} onClick={closeMenu} aria-hidden="true" />
        <div className="content">
          <header className="topbar">
            <button ref={burgerRef} type="button" className="btn icon-only" aria-label="Open options"
              aria-expanded={drawerOpen} aria-controls="options-panel" onClick={() => setMenuOpen(true)}>
              <Icon name="menu" />
            </button>
            <strong>Accordion</strong>
            <button type="button" className="btn icon-only" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} onClick={toggleTheme}>
              <Icon name={theme === "dark" ? "sun" : "moon"} />
            </button>
          </header>
          <main>
            <h1>Component Library</h1>
            <div className="grid">
              <div className="col">
                <Hero query={query} onQueryChange={setQuery} status={status} />
                <section className="panel" aria-labelledby="faq-title">
                  <div className="panel-head">
                    <h2 id="faq-title">React interview questions</h2>
                    <span className="chip">{base.length} questions</span>
                  </div>
                  {results.length ? (
                    <Accordion items={results} openIds={openInBase} onToggle={toggle} query={query} variant={opts.variant}
                      icon={opts.icon} iconPos={opts.iconPos} level={opts.level} size={opts.size} animated={opts.animated} />
                  ) : (
                    <div className="empty">
                      <span className="empty-ico"><Icon name="search" /></span>
                      <p><strong>No questions match “{query}”</strong></p>
                      <p className="muted">Check the spelling or try a shorter keyword.</p>
                      <button type="button" className="btn" onClick={() => setQuery("")}>Clear search</button>
                    </div>
                  )}
                </section>
              </div>
              <aside className="col side-panel" aria-label="Live status and usage">
                <h2 className="side-title">Live status</h2>
                <RingStat value={openInBase.length} total={base.length} label="Open items" hint={`${openInBase.length} of ${base.length} expanded`} />
                <RingStat value={results.length} total={base.length} label="Search matches" hint={`${results.length} of ${base.length} shown`} tone="rose" />
                <h2 className="side-title">Usage</h2>
                <CodeBlock code={code} />
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
