import Icon from "./Icon";

export default function Checkbox({ label, checked, onChange, disabled }) {
  return (
    <label className="check">
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      <span className="box"><Icon name="check" /></span>
      <span>{label}</span>
    </label>
  );
}
