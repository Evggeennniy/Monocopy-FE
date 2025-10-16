import abank from "../assets/abank.jpg";
import pumb from "../assets/pumb.jpg";
import privat from "../assets/privat.jpg";
import bank from "../assets/bank-svgrepo.svg";
import mono from "../assets/mono.jpg";
export const getBankIcon = (to_card) => {
  if (!to_card) return null;

  const prefix = to_card.replace(/\s+/g, "").slice(0, 4);

  const bankMap = {
    monobank: ["4441", "5375", "4899", "4042"],
    privat: ["5168", "4341", "4405", "4581"],
    pumb: ["5355", "5374", "5358", "5440"],
    abank: ["4349", "5169"],
  };

  if (bankMap.monobank.includes(prefix)) {
    return (
      <img
        src={mono}
        alt="mono"
        className="w-5 h-5 left-7 rounded-full top-6 absolute"
      />
    );
  }
  if (bankMap.privat.includes(prefix))
    return (
      <img
        src={privat}
        alt="Privat"
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

  if (bankMap.abank.includes(prefix))
    return (
      <img
        src={abank}
        alt="ABank"
        className="w-5 h-5 left-7 rounded-full top-6 absolute"
      />
    );

  return (
    <div className="w-6 h-6 flex items-center justify-center bg-gray-600 left-7 rounded-full top-6 absolute">
      <img src={bank} alt="bank" className="w-3 h-3" />
    </div>
  );
};
