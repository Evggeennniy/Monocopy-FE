// utils.js (или просто сверху файла)
export const formatCardNumber = (cardNumber) => {
  if (!cardNumber) return "—";

  const str = String(cardNumber).replace(/\s+/g, "");

  // Если есть хотя бы одна буква (любой алфавит, включая кириллицу) — возвращаем строку как есть
  if (/\p{L}/u.test(str)) {
    return cardNumber;
  }

  // Иначе маскируем цифры
  return `${str.slice(0, 6)}${"*".repeat(
    Math.max(0, str.length - 10)
  )}${str.slice(-4)}`;
};
