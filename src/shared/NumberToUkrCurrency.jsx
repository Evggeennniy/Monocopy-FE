import React from "react";

export default function NumberToUkrCurrency({ value }) {
  if (value === undefined || value === null || value === "") return null;

  const words = numberToUkrCurrency(value);
  return <div>{words}</div>;
}

function numberToUkrCurrency(num) {
  num = Number(num).toFixed(2);
  const [grn, kop] = num.split(".");
  const grnNum = parseInt(grn, 10);

  if (isNaN(grnNum)) return "";

  const grnWords = numberToWords(grnNum);
  const grnForm = getForm(grnNum, ["гривня", "гривні", "гривень"]);

  return `${grnWords} ${grnForm} ${kop} копійок`;
}

function numberToWords(num) {
  if (num === 0) return "нуль";

  const units = [
    [
      "",
      "один",
      "два",
      "три",
      "чотири",
      "п’ять",
      "шість",
      "сім",
      "вісім",
      "дев’ять",
    ],
    [
      "",
      "одна",
      "дві",
      "три",
      "чотири",
      "п’ять",
      "шість",
      "сім",
      "вісім",
      "дев’ять",
    ],
  ];
  const teens = [
    "десять",
    "одинадцять",
    "дванадцять",
    "тринадцять",
    "чотирнадцять",
    "п’ятнадцять",
    "шістнадцять",
    "сімнадцять",
    "вісімнадцять",
    "дев’ятнадцять",
  ];
  const tens = [
    "",
    "десять",
    "двадцять",
    "тридцять",
    "сорок",
    "п’ятдесят",
    "шістдесят",
    "сімдесят",
    "вісімдесят",
    "дев’яносто",
  ];
  const hundreds = [
    "",
    "сто",
    "двісті",
    "триста",
    "чотириста",
    "п’ятсот",
    "шістсот",
    "сімсот",
    "вісімсот",
    "дев’ятсот",
  ];

  const forms = [
    ["", "", "", 0], // ones
    ["тисяча", "тисячі", "тисяч", 1],
    ["мільйон", "мільйони", "мільйонів", 0],
    ["мільярд", "мільярди", "мільярдів", 0],
  ];

  let result = [];
  let i = 0;

  while (num > 0) {
    const triad = num % 1000;

    if (triad) {
      const [h, t, u] = [
        Math.floor(triad / 100),
        Math.floor((triad % 100) / 10),
        triad % 10,
      ];

      let str = hundreds[h] ? hundreds[h] + " " : "";

      if (t > 1) {
        str += tens[t] + " " + units[forms[i][3]][u] + " ";
      } else if (t === 1) {
        str += teens[u] + " ";
      } else {
        str += units[forms[i][3]][u] + " ";
      }

      str += getForm(triad, forms[i]) + " ";

      result.unshift(str.trim());
    }

    num = Math.floor(num / 1000);
    i++;
  }

  return result.join(" ").trim();
}

function getForm(num, forms) {
  num = Math.abs(num) % 100;
  const n1 = num % 10;
  if (num > 10 && num < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
}
