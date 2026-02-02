export function getKpiStatus(value, target, direction = "up") {
  if (direction === "up") {
    const ratio = value / target;

    if (ratio >= 1) return "good";
    if (ratio >= 0.9) return "warning";
    return "bad";
  }

  // direction === "down"
  const ratio = target / value;

  if (ratio >= 1) return "good";
  if (ratio >= 0.9) return "warning";
  return "bad";
}
