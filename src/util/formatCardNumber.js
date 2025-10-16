// utils.js (или просто сверху файла)
export const formatCardNumber = (cardNumber) => {
  if (!cardNumber) return "—";
  const str = String(cardNumber).replace(/\s+/g, "");
  return `${str.slice(0, 6)}${"*".repeat(
    Math.max(0, str.length - 12)
  )}${str.slice(-4)}`;
};
