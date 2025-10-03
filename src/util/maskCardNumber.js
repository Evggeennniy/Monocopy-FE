export function maskCardNumber(number) {
  if (!number) return "";
  const first = number.slice(0, 4);
  const last = number.slice(-4);
  return `${first} **** **** ${last}`;
}
