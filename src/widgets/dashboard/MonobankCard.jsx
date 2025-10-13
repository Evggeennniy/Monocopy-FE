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
      {/* Темный синий туман/тень */}

      {!isOpen && (
        <div
          className="absolute z-[1001] top-6  w-[420px] sm:w-[360px] h-[80px] rounded-full blur-[20px] pointer-events-none"
          style={{
            background: "rgba(0,20,80,0.6)",
            // "radial-gradient(ellipse at center, rgba(0,30,60,0.6) 0%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0) 100%)",
          }}
        ></div>
      )}
      {/* Дополнительный слой для глубины */}
      {/* {!isOpen && (
        <div
          className="absolute z-[1001] top-2 left-1/2 -translate-x-1/2 w-[300px] sm:w-[360px] h-[80px] rounded-full blur-[80px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,30,60,0.6) 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 100%)",
          }}
        ></div>
      )} */}

      {/* Карточка */}
      <div
        className={`${
          !isOpen ? "w-[320px]" : "w-[340px]"
        } sm:w-[384px] h-[196px]`}
        style={{ perspective: "1200px" }}
      >
        {!isOpen && (
          <div
            className="absolute top-2  inset-0 w-[300px] pointer-events-none rounded-2xl"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(0,20,180,0.25) 0%, rgba(0,0,0,0) 50%)",
              filter: "blur(40px)",
              zIndex: 5, // над картой
              transition: "all 0.7s ease",
            }}
          ></div>
        )}{" "}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="main-card relative w-full h-full text-white p-6 rounded-2xl cursor-pointer transition-transform duration-700 ease-out"
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
              } w-[100px] sm:w-[120px]`}
            >
              <img src={monobankLogo} alt="Monobank" className="w-full" />
            </div>

            <div className="relative mx-auto">
              <p
                className={`tracking-widest sm:text-[28px] text-center`}
                style={{
                  fontWeight: 500, // Medium
                  fontSize: isOpen ? "20px" : "19px",
                  color: "rgba(245,245,245,1)", // мягкий белый
                  fontVariantNumeric: "tabular-nums",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)", // лёгкая тень для объёма
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
    </div>
  );
}
