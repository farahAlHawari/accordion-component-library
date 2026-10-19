import { useEffect, useId, useRef } from "react";
import { Icon } from "@/shared/components";

export default function SearchForm({ query, onChange }) {
  const id = useId();
  const ref = useRef(null);

  // Press "/" anywhere to jump to the search field
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "/" || /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName)) return;
      e.preventDefault();
      ref.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <form role="search" className="search" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor={id}>Search React questions</label>
      <div className="search-row">
        <Icon name="search" className="lead-ico" />
        <input ref={ref} id={id} type="text" value={query} placeholder="Search React concepts" autoComplete="off"
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && query && onChange("")} />
        {query ? (
          <button type="button" className="btn icon-only clear" aria-label="Clear search"
            onClick={() => { onChange(""); ref.current?.focus(); }}>
            <Icon name="close" />
          </button>
        ) : <kbd className="kbd" aria-hidden="true">/</kbd>}
      </div>
    </form>
  );
}
