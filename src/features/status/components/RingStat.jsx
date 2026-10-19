const R = 30;
const C = 2 * Math.PI * R;

export default function RingStat({ value, total, label, hint, tone = "blue" }) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  return (
    <div className="ring-card">
      <div className="ring" role="img" aria-label={`${label}: ${value} of ${total}`}>
        <svg viewBox="0 0 72 72">
          <circle className="track" cx="36" cy="36" r={R} />
          <circle className="bar" data-tone={tone} cx="36" cy="36" r={R} strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)} />
        </svg>
        <b>{pct}%</b>
      </div>
      <div>
        <div className="ring-label">{label}</div>
        <div className="ring-hint">{hint}</div>
      </div>
    </div>
  );
}
