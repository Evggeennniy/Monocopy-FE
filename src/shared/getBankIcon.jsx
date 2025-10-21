import abank from "../assets/abank.jpg";
import pumb from "../assets/pumb.jpg";
import privat from "../assets/privat.jpg";
import bank from "../assets/bank-svgrepo.svg";
import mono from "../assets/mono.jpg";
import izibank from "../assets/izi.jpg";
import oschad from "../assets/oshad.png";
import ukrsib from "../assets/ukrsib.png";
import sense from "../assets/sense.png";
import raiff from "../assets/raiff.jpg";
const bankMap = {
  mono: ["4441", "4899", "4042"],
  privat: ["5168", "4341", "4405", "4581"],
  pumb: ["4041", "4066", "4127", "4193"],
  abank: ["4323"],
  oschad: ["4295", "4352", "4389", "4790"],
  izibank: ["5375", "5374", "5371", "5366"],
  ukrsib: ["5274", "5169", "5128", "5351"],
  sense: ["5211", "4149", "5237"],
  raiff: ["1111"],
};
const bankIcons = {
  mono: mono,
  privat: privat,
  pumb: pumb,
  abank: abank,
  oschad: oschad,
  izibank: izibank,
  ukrsib: ukrsib,
  sense: sense,
  raiff: raiff,
  others: bank,
};
export const getBankName = (to_card) => {
  if (!to_card) return "Неизвестный банк";

  const prefix = to_card.replace(/\s+/g, "").slice(0, 4);

  for (const [name, prefixes] of Object.entries(bankMap)) {
    if (prefixes.includes(prefix)) {
      switch (name) {
        case "mono":
          return "mono";
        case "privat":
          return "privat";
        case "pumb":
          return "pumb";
        case "abank":
          return "abank";
        case "oschad":
          return "oschad";
        case "izibank":
          return "izibank";
        case "ukrsib":
          return "ukrsib";
        case "sense":
          return "sense";
        case "raiff":
          return "raiff";
        default:
          return "others";
      }
    }
  }
  return "others";
};

export const getBankIcon = (to_card) => {
  if (!to_card) return null;

  const prefix = to_card.replace(/\s+/g, "").slice(0, 4);

  if (bankMap.mono.includes(prefix))
    return (
      <img
        src={mono}
        alt="Monobank"
        className="w-5 h-5 left-7 rounded-full top-6 absolute"
      />
    );

  if (bankMap.privat.includes(prefix))
    return (
      <img
        src={privat}
        alt="PrivatBank"
        className="w-5 h-5 left-7 rounded-full top-6 absolute"
      />
    );

  if (bankMap.pumb.includes(prefix))
    return (
      <img
        src={pumb}
        alt="PUMB"
        className="w-5 h-5 left-7 rounded-full top-6 absolute"
      />
    );
  if (bankMap.raiff.includes(prefix))
    return (
      <img
        src={raiff}
        alt="raiff"
        className="w-5 h-5 left-7 rounded-full top-6 absolute"
      />
    );
  if (bankMap.abank.includes(prefix))
    return (
      <img
        src={abank}
        alt="ABank"
        className="w-5 h-5 left-7 rounded-full top-6 absolute"
      />
    );

  if (bankMap.oschad.includes(prefix))
    return (
      <img
        src={oschad}
        alt="Oschadbank"
        className="w-5 h-5 left-7 rounded-full top-6 absolute"
      />
    );

  if (bankMap.izibank.includes(prefix))
    return (
      <img
        src={izibank}
        alt="izibank"
        className="w-5 h-5 left-7 rounded-full top-6 absolute"
      />
    );

  if (bankMap.ukrsib.includes(prefix))
    return (
      <img
        src={ukrsib}
        alt="Ukrsibbank"
        className="w-5 h-5 left-7 rounded-full top-6 absolute"
      />
    );

  if (bankMap.sense.includes(prefix))
    return (
      <img
        src={sense}
        alt="Sense Bank"
        className="w-5 h-5 left-7 rounded-full top-6 absolute"
      />
    );

  return (
    <div className="w-6 h-6 flex items-center justify-center bg-gray-600 left-7 rounded-full top-6 absolute">
      <img src={bank} alt="bank" className="w-3 h-3" />
    </div>
  );
};
export const getBankIconByName = (bankName, className) => {
  const icon = bankIcons[bankName];

  if (icon && bankName !== "others")
    return (
      <img
        src={icon}
        alt={bankName}
        className={
          className ? className : "w-5 h-5 left-7 rounded-full top-6 absolute"
        }
      />
    );

  // Если банка нет в списке, возвращаем дефолтную иконку
  return (
    <div className="w-6 h-6 flex items-center justify-center bg-gray-600 left-7 rounded-full top-6 absolute">
      <img src={bank} alt="bank" className="w-3 h-3" />
    </div>
  );
};
