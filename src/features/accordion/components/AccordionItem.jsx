import { useId } from "react";
import { Icon } from "@/shared/components";
import Highlight from "./Highlight";

export default function AccordionItem({ item, open, onToggle, query, icon, level }) {
  const uid = useId();
  const Heading = `h${level}`;
  return (
    <div className="acc-item" data-open={open}>
      <Heading className="acc-heading">
        <button type="button" id={`${uid}-h`} className="acc-head" data-acc-head aria-expanded={open}
          aria-controls={`${uid}-p`} onClick={() => onToggle(item.id)}>
          <span className="acc-title"><Highlight text={item.q} query={query} /></span>
          <Icon name={icon === "plusminus" ? "plus" : icon} className={`acc-ico acc-ico-${icon}`} data-open={open} />
        </button>
      </Heading>
      <div id={`${uid}-p`} role="region" aria-labelledby={`${uid}-h`} className="acc-panel" data-open={open}>
        <div className="acc-clip">
          <p className="acc-body"><Highlight text={item.a} query={query} /></p>
        </div>
      </div>
    </div>
  );
}
