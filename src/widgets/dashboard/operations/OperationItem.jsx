import { useNavigate } from "react-router-dom";
import { getBankIcon } from "../../../shared/getBankIcon";
import transaction from "../../../assets/transaction.svg";
import download from "../../../assets/download.svg";
import { formatCardNumber } from "../../../util/formatCardNumber";

const OperationItem = ({ item }) => {
  const navigate = useNavigate();
  const isWithdraw = item.operation_type === "withdraw";
  return (
    <li
      key={item.id}
      onClick={() => navigate("/transaction/" + item.id)}
      className="flex justify-between items-center rounded-xl py-[6px] cursor-pointer hover:bg-[#2f2f2f] transition-colors duration-200"
    >
      <div className="flex gap-4 items-center">
        {isWithdraw ? (
          <>
            <div className="w-[42px] h-[42px] relative rounded-full bg-[#315cc0] flex justify-center items-center">
              {item.image_withdraw ? (
                <img
                  src={item.image_withdraw}
                  className="w-[42px] h-[42px]  rounded-full "
                  alt=""
                />
              ) : (
                <img src={transaction} alt="" />
              )}

              {getBankIcon(item.to_card)}
            </div>
            <span className="text-[17px]">
              {formatCardNumber(item.cardholder_name)}
            </span>
          </>
        ) : (
          <>
            <div
              style={{ background: "#293B60" }}
              className="w-[42px] h-[42px] rounded-full relative flex justify-center items-center"
            >
              {item.image_deposit ? (
                <img
                  src={item.image_deposit}
                  className="w-[42px] h-[42px]  rounded-full "
                  alt=""
                />
              ) : (
                <img src={download} className="w-7" alt="" />
              )}
            </div>

            <span className="text-[17px]">
              Від: <span className="">{item.cardholder_name}</span>
            </span>
          </>
        )}
      </div>

      <div className="flex items-start">
        <span
          className={`text-[18px] ${
            isWithdraw ? "text-[#E1E1E1]" : "text-[#00a500]"
          }`}
        >
          {isWithdraw ? "-" : ""}
          {Math.abs(item.amount).toLocaleString("ru-RU")}
        </span>
        <span
          className={`text-[18px] ${
            isWithdraw ? "text-[#E1E1E1]" : "text-[#00a500]"
          }`}
        >
          .00 &#8372;
        </span>
      </div>
    </li>
  );
};
export default OperationItem;
