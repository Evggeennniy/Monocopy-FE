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
  owner,
}) {
  return (
    <div className="flex justify-center items-center relative w-full">
      {/* Темный синий туман/тень */}
      {!isOpen && (
        <div
          className="absolute z-[1001] top-6 w-[90%] max-w-[420px] sm:w-[360px] h-[70px] sm:h-[80px] rounded-full blur-[20px] pointer-events-none"
          style={{
            background: "rgba(0,20,80,0.6)",
          }}
        ></div>
      )}

      {/* Карточка */}
      <div
        className={`${
          !isOpen ? "w-[90%] max-w-[320px]" : "w-[92%] max-w-[340px]"
        } sm:w-[384px] h-[180px] sm:h-[196px] transition-all duration-300`}
        style={{ perspective: "1200px" }}
      >
        {!isOpen && (
          <div
            className="absolute top-2 inset-0 w-[85%] max-w-[300px] mx-auto pointer-events-none rounded-2xl"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(17, 38, 100, 0.6) 0%, rgba(0,0,0,0) 50%)",
              filter: "blur(40px)",
              zIndex: 5,
              transition: "all 0.7s ease",
            }}
          ></div>
        )}

        <div
          onClick={() => setIsOpen(!isOpen)}
          className="main-card relative w-full h-full text-white p-5 sm:p-6 rounded-2xl cursor-pointer transition-transform duration-700 ease-out"
          style={{
            transform: isOpen
              ? "translateY(0px) rotateX(0deg)"
              : "translateY(-10px) rotateX(66deg)",
            transformStyle: "preserve-3d",
            background: "linear-gradient(to bottom, #0F0E0C, #2B2B2B)",
            borderBottom: isOpen
              ? `3px solid ${borderColor}`
              : `7px solid ${borderColor}`,
            boxShadow: isOpen
              ? "0 10px 15px rgba(0,0,0,0.5) inset"
              : "0 20px 20px rgba(0,0,0,0.5), 0 0 50px rgba(0,0,0,0.1) inset",
          }}
        >
          {/* Контент карты */}
          <div className="flex flex-col gap-6 h-full relative z-10">
            <div
              className={`${
                !isOpen ? "opacity-55" : ""
              } w-[80px] sm:w-[100px] md:w-[120px]`}
            >
              <img src={monobankLogo} alt="Monobank" className="w-full" />
            </div>

            <div className="relative mx-auto text-center">
              <p
                className="tracking-widest"
                style={{
                  fontWeight: 500,
                  fontSize: isOpen
                    ? "clamp(20px, 4vw, 20px)"
                    : "clamp(19px, 3.8vw, 19px)",
                  color: "rgba(245,245,245,1)",
                  fontVariantNumeric: "tabular-nums",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  textRendering: "geometricPrecision",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
              >
                {isOpen
                  ? formatCardNumber(cardNumber)
                  : maskCardNumber(cardNumber)}
              </p>
            </div>
          </div>

          {/* Владелец */}
          {isOpen && (
            <p className="absolute bottom-5 left-5 uppercase text-[13px] sm:text-[15px] truncate max-w-[70%]">
              {owner}
            </p>
          )}

          {/* Visa layer */}
          <div
            className="absolute bottom-5 right-5 w-[50px] sm:w-[70px] md:w-[80px]"
            style={{ transform: "translateZ(1px)" }}
          >
            <img src={visa} alt="Visa" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
