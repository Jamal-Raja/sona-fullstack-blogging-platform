export function formatDate(raw) {
  const d = new Date(raw);
  return d.toLocaleDateString("en-GB");
}
