export const formatCardNumber = (cardNumber) => {
  if (!cardNumber) return "—";

  const str = String(cardNumber).replace(/\s+/g, "");

  if (/\p{L}/u.test(str)) {
    return cardNumber;
  }

  return `${str.slice(0, 4)} ${str.slice(4, 6)}** **** ${str.slice(-4)}`;
};
