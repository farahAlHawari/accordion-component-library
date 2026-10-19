import { useId, useState } from "react";
import { Icon } from "@/shared/components";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";

// Odd indexes of split() are the captured tokens
const TOKEN = /("[^"]*"|\{[^}]*\}|<\/?\w+|\/>|\b\w+(?==))/g;

function colorize(line) {
  if (line.trim().startsWith("//")) return <span className="t-com">{line}</span>;
  return line.split(TOKEN).map((part, i) => {
    if (i % 2 === 0) return part;
    const cls = part.startsWith('"') ? "t-str" : part.startsWith("{") ? "t-val" : part.startsWith("<") || part === "/>" ? "t-tag" : "t-attr";
    return <span key={i} className={cls}>{part}</span>;
  });
}

export default function CodeBlock({ code, filename = "Accordion.jsx" }) {
  const { copied, copy } = useCopyToClipboard();
  const [open, setOpen] = useState(true);
  const bodyId = useId();
  return (
    <figure className="cb">
      <figcaption className="cb-bar">
        <span className="cb-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="cb-file"><Icon name="code" /><span className="cb-name">{filename}</span><span className="cb-badge">JSX</span></span>
        <button type="button" className="cb-btn" data-copied={copied} onClick={() => copy(code)}>
          <Icon name={copied ? "check" : "copy"} />{copied ? "Copied" : "Copy"}
        </button>
        <button type="button" className="cb-btn" aria-expanded={open} aria-controls={bodyId}
          aria-label={open ? "Collapse code" : "Expand code"} onClick={() => setOpen((o) => !o)}>
          <Icon name="chevron" className={open ? "flip" : ""} />
        </button>
        <span className="sr" role="status">{copied ? "Code copied to clipboard" : ""}</span>
      </figcaption>
      <div id={bodyId} hidden={!open}>
        <pre className="cb-pre"><code>{code.split("\n").map((l, i) => <span key={i} className="cb-line">{colorize(l)}</span>)}</code></pre>
      </div>
    </figure>
  );
}
