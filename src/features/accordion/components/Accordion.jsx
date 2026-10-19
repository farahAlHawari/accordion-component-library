import { useCallback, useRef } from "react";
import AccordionItem from "./AccordionItem";

export default function Accordion({ items, openIds, onToggle, query, variant, icon, iconPos, level, size, animated }) {
  const rootRef = useRef(null);

  // Arrow keys / Home / End move focus between headers
  const onKeyDown = useCallback((e) => {
    const heads = [...rootRef.current.querySelectorAll("[data-acc-head]")];
    const i = heads.indexOf(document.activeElement);
    if (i < 0) return;
    let next = null;
    if (e.key === "ArrowDown") next = (i + 1) % heads.length;
    else if (e.key === "ArrowUp") next = (i - 1 + heads.length) % heads.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = heads.length - 1;
    if (next === null) return;
    e.preventDefault();
    heads[next].focus();
  }, []);

  return (
    <div ref={rootRef} className="acc" data-variant={variant} data-pos={iconPos} data-size={size} data-anim={animated} onKeyDown={onKeyDown}>
      {items.map((item) => (
        <AccordionItem key={item.id} item={item} open={openIds.includes(item.id)} onToggle={onToggle} query={query} icon={icon} level={level} />
      ))}
    </div>
  );
}
