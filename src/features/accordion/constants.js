// Options shown in the sidebar and the default accordion configuration
export const OPTIONS = {
  count: [3, 5, 8, 10].map((n) => [n, String(n)]),
  variant: [["bordered", "Bordered"], ["filled", "Filled"], ["minimal", "Minimal"], ["separated", "Separated"]],
  icon: [["chevron", "Chevron"], ["plusminus", "Plus/Minus"], ["arrow", "Arrow"], ["caret", "Caret"]],
  size: [["sm", "Small (sm)"], ["md", "Medium (md)"], ["lg", "Large (lg)"]],
  iconPos: [["start", "Start"], ["center", "Center"], ["end", "End"]],
  level: [2, 3, 4, 5, 6].map((n) => [n, `H${n}`]),
};

export const DEFAULTS = { count: 8, variant: "filled", icon: "caret", size: "md", iconPos: "end", level: 3, multiple: false, animated: true };
