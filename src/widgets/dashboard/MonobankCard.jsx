import React, { useState } from "react";
import monobankLogo from "../../assets/logo_card.png";
import visa from "../../assets/visa.svg";
import { maskCardNumber } from "../../util/maskCardNumber";

function formatCardNumber(str) {
  if (!str) return "";
  const cleaned = str.replace(/\s+/g, "");
  return cleaned.replace(/(.{4})/g, "$1 ").trim();
}

export default function MonobankCard({
  cardNumber = "4441 **** **** 1931",
  setIsOpen,
  isOpen,
  isContactsOpen,
  borderColor = "#0F0E0C",
  owner,
  offsetY,
}) {
  return (
    <div className="flex justify-center items-center relative w-full ">
      {!isOpen && (
        <div
          className="absolute z-[1001] top-6 w-[90%] max-w-[420px] sm:w-[360px] h-[70px] sm:h-[80px] rounded-full blur-[20px] pointer-events-none"
          style={{
            background: "var(--bg-blue-haze)",
          }}
        ></div>
      )}

      <div
        className={`${
          !isOpen ? "w-[90%] max-w-[320px]" : "w-[96%] max-w-[385px]"
        } sm:w-[384px] ${isOpen ? "h-[215px] sm:h-[230px]" : "h-[180px] sm:h-[196px]"} transition-all duration-300`}
        style={{ perspective: "800px" }}
      >
        {!isOpen && (
          <div
            className="absolute top-2 inset-0 w-[85%] max-w-[300px] mx-auto pointer-events-none rounded-[20px]"
            style={{
              background: "var(--radial-card-glow)",
              filter: "blur(40px)",
              zIndex: 5,
              transition: "all 0.7s ease",
            }}
          ></div>
        )}

        <div
          onClick={() => setIsOpen(!isOpen)}
          className="main-card relative w-full h-full text-white p-5 sm:p-6 rounded-[20px] cursor-pointer transition-transform duration-700 ease-out"
          style={{
            borderRadius: "20px",
            transform: isOpen
              ? "translateY(0px) rotateX(0deg)"
              : `translateY(-22px) rotateX(${offsetY > 10 ? 55 : 58}deg)`,
            transformStyle: "preserve-3d",
            background: "var(--bg-gradient-card)",
            borderBottom: isOpen
              ? `3px solid ${borderColor}`
              : `7px solid ${borderColor}`,
            boxShadow: isOpen
              ? "0 10px 15px rgba(var(--color-black-rgb), 0.5) inset"
              : "0 45px 80px rgba(5, 10, 50, 0.65), 0 20px 40px rgba(8, 15, 55, 0.45)",
          }}
        >
          {/* Световой оверлей для 3D эффекта */}
          {!isOpen && (
            <div
              className="absolute inset-0 rounded-[20px] pointer-events-none z-20"
              style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)",
              }}
            />
          )}

          {/* Контент карты */}
          <div className="flex flex-col gap-6 h-full relative z-10">
            <div
              className={`${
                !isOpen ? "opacity-55" : ""
              } w-[80px] sm:w-[100px] md:w-[120px]`}
            >
              <img src={monobankLogo} alt="Monobank" className="w-full" />
            </div>

            <div
              className={
                isOpen
                  ? "absolute inset-0 flex items-center justify-center"
                  : "relative mx-auto text-center"
              }
            >
              <p
                className="tracking-widest"
                style={{
                  fontWeight: 500,
                  fontSize: isOpen
                    ? "clamp(22px, 6vw, 24мpx)"
                    : "clamp(19px, 3.8vw, 19px)",
                  color: "rgba(255, 255, 255, 1)",
                  fontVariantNumeric: "tabular-nums",
                  textShadow: "0 1px 2px rgba(var(--color-black-rgb), 0.1)",
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
            <p className="absolute bottom-5 left-5 uppercase text-[13px] sm:text-[15px] truncate max-w-[70%] text-[var(--balance)]">
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
