import { Fragment } from "react";

// Renders `inline code` and wraps search matches in <mark>
export default function Highlight({ text, query }) {
  const q = query.trim();
  const re = q ? new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi") : null;
  const mark = (s) => (re ? s.split(re).map((p, i) => (i % 2 ? <mark key={i}>{p}</mark> : p)) : s);
  return text.split("`").map((part, i) =>
    i % 2 ? <code key={i} className="ic">{mark(part)}</code> : <Fragment key={i}>{mark(part)}</Fragment>
  );
}
