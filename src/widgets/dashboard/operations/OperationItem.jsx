import { useNavigate } from "react-router-dom";
import { getBankIcon, getBankIconByName } from "../../../shared/getBankIcon";
import transaction from "../../../assets/transaction.svg";
import download from "../../../assets/download.svg";
import { formatCardNumber } from "../../../util/formatCardNumber";
import massage_icon from "../../../assets/message-icon.svg";

const OperationItem = ({ item, isOpen = false }) => {
  const navigate = useNavigate();
  const isWithdraw = item.operation_type === "withdraw";

  return (
    <li
      key={item.id}
      onClick={() => navigate("/transaction/" + item.id)}
      className="flex justify-between items-center rounded-xl py-[6px] cursor-pointer hover:bg-[var(--bg-hover)] transition-colors duration-200 "
    >
      <div className="flex gap-4 items-center">
        {isWithdraw ? (
          <>
            <div className="w-[42px] h-[42px] relative rounded-full bg-[var(--blue-primary)] flex justify-center items-center">
              {item.image_withdraw ? (
                <img
                  src={item.image_withdraw}
                  className="w-[42px] h-[42px] rounded-full"
                  alt=""
                />
              ) : (
                <img src={transaction} alt="" />
              )}
              {item.bank !== "mono" && getBankIconByName(item.bank)}
            </div>

            <div className="flex flex-col">
              <span className="text-[17px] text-[var(--text-primary)]">
                {formatCardNumber(item.cardholder_name)}
              </span>
              {item.comment && isOpen && (
                <div className="flex gap-2 items-center text-[var(--gray-7)]">
                  <img src={massage_icon} className="w-5 h-5" alt="" />
                  <span className="text-[var(--gray-7)]">{item.comment}</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div
              style={{ background: "var(--blue-deposit)" }}
              className="w-[42px] h-[42px] rounded-full relative flex justify-center items-center"
            >
              {item.image_deposit ? (
                <img
                  src={item.image_deposit}
                  className="w-[42px] h-[42px] rounded-full"
                  alt=""
                />
              ) : (
                <img src={download} className="w-7" alt="" />
              )}
              {item.bank !== "mono" && getBankIconByName(item.bank)}
            </div>

            <span className="text-[17px] flex flex-col">
              <div className="text-[var(--text-primary)]">
                Від:{" "}
                <span className="text-[var(--text-primary)]">
                  {item.cardholder_name}
                </span>
              </div>
              {item.comment && isOpen && (
                <div className="flex gap-2 items-center text-[var(--gray-7)]">
                  <img src={massage_icon} className="w-5 h-5" alt="" />
                  <span className="text-[var(--gray-7)]">{item.comment}</span>
                </div>
              )}
            </span>
          </>
        )}
      </div>

      <div className="flex items-start">
        <span
          className={`text-[18px] ${
            isWithdraw
              ? "text-[var(--text-primary)]"
              : "text-[var(--green-primary)]"
          }`}
        >
          {isWithdraw ? "-" : ""}
          {Math.abs(item.amount).toLocaleString("ru-RU")}
        </span>
        <span
          className={`text-[18px] ${
            isWithdraw
              ? "text-[var(--text-primary)]"
              : "text-[var(--green-primary)]"
          }`}
        >
          .00 &#8372;
        </span>
      </div>
    </li>
  );
};

export default OperationItem;
