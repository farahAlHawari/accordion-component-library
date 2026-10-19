import { useId } from "react";
import Icon from "./Icon";

export default function Select({ label, name, value, options, onChange }) {
  const id = useId();
  const numeric = typeof options[0][0] === "number";
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="select">
        <select id={id} value={value} onChange={(e) => onChange(name, numeric ? Number(e.target.value) : e.target.value)}>
          {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <Icon name="chevron" />
      </div>
    </div>
  );
}
