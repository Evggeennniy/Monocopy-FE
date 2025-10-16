export function formatBalance(value) {
  return Number(value)
    .toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(/,/g, " ");
}

export function formatCardNumber(number) {
  if (!number) return "—";
  const str = String(number);
  return `${str.slice(0, 6)}${"*".repeat(
    Math.max(0, str.length - 12)
  )}${str.slice(-4)}`;
}

export function getBackgroundGradient(isSettingsOpen) {
  return !isSettingsOpen
    ? "linear-gradient(to bottom, #0B0D3F 1%,#112658 9%,#112658 16%, #0D244E 25%, #111111 40%)"
    : "linear-gradient(180deg, #060622 0%, #181C2A 16.21%, #0D1D41 31.61%, #0E2652 48.57%, #132646 100%)";
}
