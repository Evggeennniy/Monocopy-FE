import React, { useState } from "react";

import cat_big from "../../assets/cat_big.png";
import cat_big_white from "../../assets/cat_big_white.jpg";
import white_card from "../../assets/white_card.png";
import white_card_white from "../../assets/white_card_white.jpg";
import link from "../../assets/link.png";
import link_white from "../../assets/link_white.jpg";
import si_copy from "../../assets/si_copy.png";
import { motion } from "framer-motion";
import share from "../../assets/share.png";
import { useNavigate } from "react-router-dom";
import { formatCardNumber } from "../../util/formatCardNumber";
import { useTheme } from "../../util/useTheme";

function PaymentStatus() {
  const navigate = useNavigate();
  const [finished, setFinished] = useState(false);
  const data = JSON.parse(localStorage.getItem("formData"));
  console.log(data);
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="bg-[var(--gray-1)] pb-[40px] flex flex-col justify-around h-screen p-3">
      <div className="mt-[50px] flex flex-col items-center mb-[44px]">
        <img
          src={theme == "light" ? cat_big_white : cat_big}
          alt=""
          className="w-[221px]"
        />
      </div>

      <h2 className="text-[22px] flex flex-col items-center mb-[35px] text-[var(--gray-8)]">
        Платіж надіслано
      </h2>

      <div className="flex items-center gap-3 ml-6 mb-[35px]">
        <img
          src={theme == "light" ? white_card_white : white_card}
          alt=""
          className="w-[41px]"
        />
        <div className="flex flex-col text-[var(--gray-8)]">
          <div className="text-[17px]">
            {Number(data.amount).toFixed(2)} ₴ на картку
          </div>
          <div className="font-bold text-[16px]">
            {formatCardNumber(data.cardholder_name)}
          </div>
        </div>
      </div>

      <div className="p-5 mb-[35px] bg-[var(--bg-secondary)] rounded-xl">
        <div className="flex items-center gap-3 mb-[20px]">
          <img
            src={theme == "light" ? link_white : link}
            alt=""
            className="w-[57px]"
          />
          <div className="flex flex-col gap-1">
            <div className="text-[15px] font-semibold text-[var(--gray-8)]">
              Посилання на квитанцію
            </div>
            <div className="flex items-center gap-1">
              <img src={si_copy} alt="" className="w-[15px]" />
              <div className="text-[13px] font-semibold text-[var(--text-tertiary)]">
                check.monobank.ua/p/imfgSF...
              </div>
            </div>
          </div>
        </div>

        <button className="w-full bg-[var(--transfer-button-disabled)] cursor-pointer rounded-xl text-[var(--color-white)] py-3 flex justify-center items-center gap-3 hover:bg-[var(--transfer-button-disabled-hover)] transition">
          <img src={share} alt="" className="w-[20px]" />
          Поділитись
        </button>
      </div>

      <motion.div
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 2, ease: "linear" }}
        onAnimationComplete={() => setFinished(true)}
        className={`font-bold text-center text-[15px] mb-[35px] ${
          finished
            ? "text-[var(--bg-secondary)]"
            : "bg-gradient-to-r from-[var(--red-primary)] to-[var(--bg-secondary)] bg-[length:200%_100%] bg-clip-text text-transparent"
        }`}
      >
        Скасувати платіж
      </motion.div>

      <button
        onClick={() => navigate("/dashboard")}
        className="w-full bg-[var(--red-primary)] text-[14px] mb-[30px] py-4 mt-auto rounded-xl text-[var(--color-white)] hover:opacity-90 transition"
      >
        Готово
      </button>
    </div>
  );
}

export default PaymentStatus;
