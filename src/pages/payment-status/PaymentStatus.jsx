import React, { useState } from "react";
import cat_big from "../../assets/cat_big.png";
import white_card from "../../assets/white_card.png";
import link from "../../assets/link.png";
import si_copy from "../../assets/si_copy.png";
import { motion } from "framer-motion";
import share from "../../assets/share.png";
import { useNavigate } from "react-router-dom";
import { formatCardNumber } from "../../util/balanceUtils";
// function formatCardNumber(card) {
//   return card
//     .replace(/\s+/g, "") // убираем все пробелы
//     .replace(/(\d{4})(?=\d)/g, "$1 ") // добавляем пробел после каждых 4 цифр
//     .trim();
// }
function PaymentStatus() {
  const navigate = useNavigate();
  const [finished, setFinished] = useState(false);
  const data = JSON.parse(localStorage.getItem("formData"));
  console.log(data);
  return (
    <div className="bg-[#1E1E1E] flex flex-col justify-between min-h-screen  p-3">
      <div className="mt-[70px] flex flex-col items-center  mb-[44px]">
        <img src={cat_big} alt="" className="w-[221px] " />
      </div>
      <h2 className="text-[22px] flex flex-col items-center mb-[35px] text-[#FFFFFF]">
        Платіж надіслано
      </h2>
      <div className="flex items-center gap-3 ml-6 mb-[35px]">
        <img src={white_card} alt="" className="w-[41px]" />
        <div className="flex flex-col text-white">
          <div className="text-[17px]">
            {Number(data.amount).toFixed(2)} ₴ на картку
          </div>
          <div className="font-bold text-[16px]">
            {formatCardNumber(data.to_card)}
          </div>
        </div>
      </div>
      <div className="p-5  mb-[35px] bg-[#272727] rounded-xl">
        <div className="flex items-center gap-3 mb-[20px]">
          <img src={link} alt="" className="w-[57px]" />
          <div className="flex flex-col gap-1">
            <div className="text-[15px] font-semibold text-[#E0E0E0]">
              Посилання на квитанцію
            </div>
            <div className="flex items-center gap-1">
              <img src={si_copy} alt="" className="w-[15px]" />
              <div className="text-[13px] font-semibold text-[#91A2B1]">
                check.monobank.ua/p/imfgSF...
              </div>
            </div>
          </div>
        </div>
        <button className="w-full  bg-[#383838] cursor-pointer rounded-xl text-[#FFFFFF] py-3 flex justify-center items-center gap-3">
          <img src={share} alt="" className="w-[20px]" />
          Поділитись
        </button>
      </div>
      <motion.div
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 2, ease: "linear" }}
        onAnimationComplete={() => setFinished(true)}
        className={`font-bold text-center text-[15px]  mb-[35px] ${
          finished
            ? "text-[#1E1E1E]" // конечный фиксированный цвет
            : "bg-gradient-to-r from-[#EF5559] to-[#1E1E1E] bg-[length:200%_100%] bg-clip-text  text-transparent"
        }`}
      >
        Скасувати платіж
      </motion.div>

      <button
        onClick={() => navigate("/dashboard")}
        className="w-full bg-[#EF5559] text-[14px] py-4 mt-auto rounded-xl text-white"
      >
        Готово
      </button>
    </div>
  );
}

export default PaymentStatus;
