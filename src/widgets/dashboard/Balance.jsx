import React, { useState } from "react";
import MonobankCard from "./MonobankCard";

import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MainDashboard from "./MainDashboard";
import Settings from "./Settings";
import Contacts from "./Contacts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import plus from "../../assets/plus.svg";
import grivna from "../../assets/grivna.svg";
export const cardsArray = [
  {
    id: 1,
    cardNumber: "4441 **** **** 1931",
    owner: "Vasyl Petrenko",
    borderColor: "#0F0E0C", // additional border color
    backgroundGradient: "linear-gradient(to bottom, #0F0E0C, #2B2B2B)",
    operationsCards: [
      { id: 1, label: "Starbucks", amount: -120, currency: "₴", color: "red" },
      {
        id: 2,
        label: "Зарплата",
        amount: 15000,
        currency: "₴",
        color: "green",
      },
      { id: 3, label: "Starbucks", amount: -120, currency: "₴", color: "red" },
    ],
  },
  {
    id: 2,
    cardNumber: "4441 **** **** 1931",
    owner: "Vasyl Petrenko",
    borderColor: "green", // additional border color
    backgroundGradient: "linear-gradient(to bottom, #0F0E0C, #2B2B2B)",
    operationsCards: [
      { id: 1, label: "Starbucks", amount: -120, currency: "₴", color: "red" },
      {
        id: 2,
        label: "Зарплата",
        amount: 15000,
        currency: "₴",
        color: "green",
      },
      { id: 3, label: "Starbucks", amount: -120, currency: "₴", color: "red" },
    ],
  },
];

export default function Balance() {
  // const [isSettingsOpen, setIsOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  return (
    <div
      style={{
        background:
          "linear-gradient(179.99deg, #0B0D40 0%, #16265A 16.21%, #112658 31.61%, #0D244E 48.57%, #121212 57.07%, #121212 98.97%)",
      }}
      className={`min-h-screen text-white flex flex-col items-center ${
        isContactsOpen ? "p-0" : " p-3"
      } `}
    >
      {isSettingsOpen && !isContactsOpen && (
        <div className="h-[80px] w-full"></div>
      )}

      {/* Карточка */}

      {/* <>
        {!isSettingsOpen && !isContactsOpen && (
          <>
            <div className="h-[80px] w-full"></div>
            <div className="text-center">
              <p className="text-[43px] font-semibold leading-[40px]">
                ₴ 25,430.50
              </p>
            </div>
          </>
        )}
        {!isContactsOpen && (
          <motion.div
            layout
            initial={false}
            animate={{ y: isSettingsOpen ? -30 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex justify-center w-full"
          >
            <MonobankCard
              isOpen={isSettingsOpen}
              setIsOpen={setIsSettingsOpen}
              cardNumber="4441 **** **** 1931"
            />
          </motion.div>
        )}
        <AnimatePresence mode="wait">
          {!isSettingsOpen && !isContactsOpen && (
            <>
              <MainDashboard
                setIsContactsOpen={setIsContactsOpen}
              ></MainDashboard>
            </>
          )}
        </AnimatePresence>
      </> */}

      <div className="w-full">
        <Swiper
          spaceBetween={16}
          slidesPerView="auto"
          centeredSlides={false}
          slidesOffsetBefore={0}
          slidesOffsetAfter={16}
        >
          {cardsArray.map((card) => (
            <SwiperSlide key={card.id} className="">
              <div className=" ">
                {/* Top spacer + balance */}
                {!isSettingsOpen && !isContactsOpen && (
                  <>
                    <div className="h-[80px] w-full"></div>
                    <div className="text-center flex items-center justify-center gap-2">
                      <img src={plus} alt="" className="mt-2" />
                      <p className="text-[47px] text-[#E1E1E1] font-semibold leading-[40px] flex items-center">
                        <div>25,430.50</div>{" "}
                        <img src={grivna} alt="" className="mt-2" />
                      </p>
                    </div>
                  </>
                )}

                {!isContactsOpen && (
                  <div className="!w-[100%]">
                    <MonobankCard
                      cardNumber={card.cardNumber}
                      isOpen={isSettingsOpen}
                      setIsOpen={setIsSettingsOpen}
                    />
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {!isSettingsOpen && !isContactsOpen && (
                    <MainDashboard
                      isContactsOpen={isContactsOpen}
                      setIsOpen={setIsSettingsOpen}
                      setIsContactsOpen={setIsContactsOpen}
                    />
                  )}
                </AnimatePresence>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Нижние блоки */}
      <AnimatePresence mode="wait">
        {/* {!isSettingsOpen && !isContactsOpen && (
          <>
            <div className="h-[80px] w-full"></div>
            <div className="text-center">
              <p className="text-[43px] font-semibold leading-[40px]">
                ₴ 25,430.50
              </p>
            </div>
            <MainDashboard
              setIsContactsOpen={setIsContactsOpen}
            ></MainDashboard>
          </>
        )} */}
        {isSettingsOpen && !isContactsOpen && (
          <Settings setIsSettingsOpen={setIsSettingsOpen}></Settings>
        )}
        {isContactsOpen && (
          <Contacts
            setIsSettingsOpen={setIsSettingsOpen}
            setIsContactsOpen={setIsContactsOpen}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
