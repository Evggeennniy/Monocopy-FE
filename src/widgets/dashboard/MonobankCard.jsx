import React, { useState } from "react";
import monobankLogo from "../../assets/logo_card.png";
import visa from "../../assets/visa.svg";
import { maskCardNumber } from "../../util/maskCardNumber";
function formatCardNumber(str) {
  if (!str) return "";
  // оставим только символы (например цифры), если нужно — убрать все нецифры:
  const cleaned = str.replace(/\s+/g, "");
  // вставляем пробел после каждых 4 символов
  return cleaned.replace(/(.{4})/g, "$1 ").trim();
}
export default function MonobankCard({
  cardNumber = "4441 **** **** 1931",
  setIsOpen,
  isOpen,
  isContactsOpen,
  borderColor = "#0F0E0C",
  owner, // default color
}) {
  return (
    <div className="flex justify-center items-center relative">
      {/* Perspective wrapper */}
      <div
        className={`${
          !isOpen ? "w-[320px]" : "w-[340px]"
        } sm:w-[384px] h-[196px]`}
        style={{ perspective: "1200px" }}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full h-full text-white p-6 rounded-2xl shadow-2xl cursor-pointer transition-transform duration-600 ease-out"
          style={{
            transform: isOpen ? "rotateX(0deg)" : "rotateX(63deg)",
            transformStyle: "preserve-3d",
            background: "linear-gradient(to bottom, #0F0E0C, #2B2B2B)",
            borderBottom: `4px solid ${borderColor}`, // dynamic bottom border
          }}
        >
          {/* Card content */}
          <div className="flex flex-col gap-6 h-full relative z-10">
            <div
              className={`${
                !isOpen ? "opacity-55" : ""
              } w-[100px] sm:w-[120px]`}
            >
              <img src={monobankLogo} alt="Monobank" className="w-full" />
            </div>

            <p
              className={`tracking-widest  sm:text-[28px] mx-auto ${
                !isOpen ? "opacity-65 text-[26px]" : "text-[25px]"
              }`}
            >
              {isOpen
                ? formatCardNumber(cardNumber)
                : maskCardNumber(cardNumber)}
            </p>
          </div>
          {isOpen && (
            <p className="absolute bottom-6 left-6 uppercase text-[15px]">
              {owner}
            </p>
          )}

          {/* Visa layer */}
          <div
            className="absolute bottom-6 right-6 w-[60px] sm:w-[80px]"
            style={{ transform: "translateZ(1px)" }}
          >
            <img src={visa} alt="Visa" className="w-full" />
          </div>
        </div>
      </div>

      {/* Shadow */}
      <div className="absolute bottom-0 left-1/2 w-[320px] sm:w-[384px] h-6 bg-black opacity-20 rounded-full blur-2xl -translate-x-1/2"></div>
    </div>
  );
}
