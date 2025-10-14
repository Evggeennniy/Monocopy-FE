import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { contacts } from "../../widgets/dashboard/Contacts";
import { ArrowLeft, MessageCircle, Star } from "lucide-react";
import transfer_black_card from "../../assets/transfer_black_card.svg";
import comment from "../../assets/comment.svg";
import grivna from "../../assets/grivna.svg";
import prize from "../../assets/prize.svg";
import fetchWithAuth from "../../util/fetchWithAuth";
import { API_URL } from "../../url";
import Balance from "../../widgets/dashboard/Balance";
import transaction from "../../assets/transaction.svg";
import { getBankIcon } from "../../shared/getBankIcon";
import { formatCardNumber } from "../../util/balanceUtils";
import CustomKeyboard from "../../shared/CustomKeyboard";

export default function TransferPage() {
  const { id } = useParams();
  const [foundCard, setFoundCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const firstLetter = id?.charAt(0).toUpperCase();

  useEffect(() => {
    async function fetchCards() {
      try {
        const res = await fetchWithAuth(`${API_URL}/cards/`);
        if (!res.ok) {
          throw new Error(`Ошибка: ${res.status}`);
        }
        const data = await res.json();
        setCards(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchCards();
  }, []);

  const color = useMemo(
    () =>
      `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`,
    [foundCard?.id]
  );
  const inputRef = useRef(null);
  const [showKeyboard, setShowKeyboard] = useState(false);
  // Фокус на input при загрузке
  useEffect(() => {
    inputRef.current?.focus();
    setShowKeyboard(true);
  }, []);

  const handleClick = (num) => {
    setValue((prev) => prev + num);
  };

  const handleBackspace = () => {
    setValue((prev) => prev.slice(0, -1));
  };

  const submit = async (e) => {
    e.preventDefault();

    const formData = {
      cardholder_name:
        cards[0]?.user.first_name + " " + cards[0]?.user.last_name,
      from_card: cards[0]?.card_number,
      to_card: id.replace(/\s+/g, "").trim(),
      amount: +value,
    };

    try {
      const res = await fetchWithAuth(API_URL + "/transactions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`Ошибка: ${res.status}`);

      const data = await res.json();
      localStorage.setItem("formData", JSON.stringify(formData));
      navigate("/payment-status");
    } catch (err) {
      console.error("Ошибка при отправке:", err);
    }
  };

  return (
    <div className="bg-[#1E1E1E]  pt-[calc(env(safe-area-inset-top)+1.5rem)] text-white min-h-screen flex flex-col ">
      {/* Header */}
      <div className="p-4 sm:p-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 sm:mb-6 hover:opacity-80 transition"
        >
          <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7 text-gray-300" />
        </button>

        <div className="flex relative items-center gap-3 sm:gap-4">
          <div className="w-[45px] h-[45px] relative rounded-full flex items-center justify-center text-white text-lg bg-[#0B4ED9]">
            {/* Дефолтный белый силуэт */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>

            {/* Иконка банка, если есть */}
            {getBankIcon(id)}
          </div>
          <div>
            <h2 className="font-semibold text-base sm:text-lg text-[#E0E0E0]">
              {formatCardNumber(id)}
            </h2>
            {["4441", "5375", "4899", "4042"].includes(
              id.replace(/\s+/g, "").slice(0, 4)
            ) && (
              <div className="flex items-center gap-1 sm:gap-2">
                <img
                  src={transfer_black_card}
                  alt=""
                  className="w-[14px] sm:w-[18px]"
                />
                <p className="text-[12px] sm:text-[14px] text-[#91A2B1]">
                  На чорну картку
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Amount */}
      <div className="flex flex-col items-center justify-center flex-1 text-center">
        <div className="flex gap-1 items-center border border-[#323232] text-[#E1E1E1] px-3 py-1 sm:px-4 sm:py-2 rounded-full text-[14px] mb-3 sm:mb-4">
          <img
            src={transfer_black_card}
            alt=""
            className="w-[18px] h-[14px] sm:w-[20px] sm:h-[16px]"
          />
          <p className="text-sm sm:text-base">{cards[0]?.balance}</p>
          <img src={grivna} alt="₴" className="w-3 h-3 object-contain" />
        </div>

        <div className="flex justify-center mt-4 sm:mt-6">
          <div className="flex items-center pr-2 sm:pr-3">
            <input
              type="text"
              readOnly
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="0"
              className="text-4xl sm:text-5xl md:text-6xl text-right font-semibold bg-transparent outline-none text-[#E1E1E1]
               [appearance:textfield]
               [&::-webkit-outer-spin-button]:appearance-none
               [&::-webkit-inner-spin-button]:appearance-none
               placeholder-[#E1E1E1]"
              style={{
                width: `${(value.length || 1) + 1}ch`,
              }}
            />
            <img
              src={grivna}
              alt="₴"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain mt-1"
            />
          </div>
        </div>

        <p className="text-gray-400 text-[13px] sm:text-[14px] mt-2">
          Немає комісії
        </p>
      </div>

      {/* Footer */}
      <div className="border-t border-[#323232] mt-6 sm:mt-8">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center gap-3 mb-3 sm:mb-5">
            <div className="flex items-center gap-3 sm:gap-4 flex-1">
              <img
                src={comment}
                alt=""
                className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]"
              />
              <input
                type="text"
                placeholder="Коментар..."
                className="flex-1 w-[100px] bg-transparent text-[#91A2B1] focus:outline-none text-[13px] sm:text-[14px]"
              />
            </div>

            <button className="w-[46px] shrink-0 sm:w-[56px] h-[26px] sm:h-[56px] rounded-full border border-[#323232] flex items-center justify-center hover:bg-[#2F2F2F] transition">
              <img src={prize} alt="" className="w-[16px] h-[16px] " />
            </button>
          </div>

          <div className="flex justify-between gap-3 sm:gap-4">
            <button className="bg-[#2F2F2F] p-4 sm:p-5 rounded-2xl text-[#FFFFFF] hover:bg-[#3A3A3A] transition">
              <Star className="w-5 h-5 inline-block" />
            </button>
            <button
              onClick={submit}
              className="w-full py-3 sm:py-4 bg-[#414141] rounded-2xl text-[#FFFFFF] text-[14px] sm:text-[15px] font-semibold hover:bg-[#4A4A4A] transition"
            >
              Надіслати
            </button>
          </div>
        </div>
      </div>
      <div
        className={`bg-[#323232] flex flex-col items-center justify-center text-white 
    transform transition-transform duration-500 ease-out
    ${
      showKeyboard
        ? "translate-y-0 opacity-100 h-auto"
        : "translate-y-full h-0 opacity-0 "
    }`}
      >
        <div className="grid grid-cols-6 gap-1 bg-[#3a3a3c] w-full">
          {["x", "/", "+", "-", "%", "="].map((op, i) => (
            <button
              key={i}
              disabled={true}
              onClick={() => handleClick(op)}
              className="   py-3 text-xl rounded-lg  transition"
            >
              {op}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 mt-2 mb-9 px-1 gap-2 w-full">
          {/* Первый ряд: операции */}

          {/* Второй ряд: 1,2(abc),3(def) */}
          {[
            { label: "1", sub: "" },
            { label: "2", sub: "ABC" },
            { label: "3", sub: "DEF" },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => handleClick(item.label)}
              className="bg-[#6f6f6f] py-[3px] text-xl rounded-lg hover:bg-[#444] transition flex flex-col items-center"
            >
              <span>{item.label}</span>
              <span className="text-[10px]">{item.sub}</span>
            </button>
          ))}

          {/* Третий ряд: 4,5,6 */}
          {[
            { label: "4", sub: "GHI" },
            { label: "5", sub: "JKL" },
            { label: "6", sub: "MNO" },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => handleClick(item.label)}
              className="bg-[#6f6f6f] py-[3px] text-xl rounded-lg hover:bg-[#444] transition flex flex-col items-center"
            >
              <span>{item.label}</span>
              <span className="text-[10px]">{item.sub}</span>
            </button>
          ))}

          {/* Четвёртый ряд: 7,8,9 */}
          {[
            { label: "7", sub: "PQRS" },
            { label: "8", sub: "TUV" },
            { label: "9", sub: "WXYZ" },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => handleClick(item.label)}
              className="bg-[#6f6f6f] py-[3px] text-xl rounded-lg hover:bg-[#444] transition flex flex-col items-center"
            >
              <span>{item.label}</span>
              <span className="text-[10px]">{item.sub}</span>
            </button>
          ))}

          {/* Пятый ряд: , 0 назад */}
          <button
            onClick={() => handleClick(",")}
            className=" py-1 text-xl rounded-lg  transition"
          >
            ,
          </button>
          <button
            onClick={() => handleClick("0")}
            className="bg-[#6f6f6f] py-[6px] text-xl rounded-lg hover:bg-[#444] transition"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className=" py-1 text-xl rounded-lg hover:bg-[#666] transition"
          >
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
}
