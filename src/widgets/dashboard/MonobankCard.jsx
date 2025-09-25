import React, { useState } from "react";
import monobankLogo from "../../assets/logo_card.png";
import visa from "../../assets/visa.svg";

export default function MonobankCard({
  cardNumber = "4441 **** **** 1931",
  setIsOpen,
  isOpen,
}) {
  return (
    <div className="flex justify-center items-center relative">
      {/* Perspective wrapper */}
      <div
        className="w-[320px] sm:w-[384px] h-[196px]"
        style={{ perspective: "1200px" }}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full h-full text-white p-6 rounded-2xl border-b-4 border-[#0F0E0C] shadow-2xl cursor-pointer transition-transform duration-700 ease-out"
          style={{
            transform: isOpen ? "rotateX(0deg)" : "rotateX(63deg)",
            transformStyle: "preserve-3d",
            background: "linear-gradient(to bottom, #0F0E0C, #2B2B2B)",
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
              className={`${
                !isOpen ? "opacity-65" : ""
              } tracking-widest text-[26px] sm:text-[28px] mx-auto`}
            >
              {cardNumber}
            </p>

            <div className="ml-auto mt-auto  ">
              <img src={visa} alt="Visa" className="w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Shadow */}
      <div className="absolute bottom-0 left-1/2 w-[320px] sm:w-[384px] h-6 bg-black opacity-20 rounded-full blur-2xl -translate-x-1/2"></div>
    </div>
  );
}
