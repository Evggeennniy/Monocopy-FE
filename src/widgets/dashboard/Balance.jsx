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
import message from "../../assets/message.svg";
import price from "../../assets/price.svg";
import monobank from "../../assets/monobank.svg";
import rating from "../../assets/rating.svg";
import two_cards from "../../assets/two_cards.png";
import credits from "../../assets/credits.png";
import six from "../../assets/16.png";
import dots from "../../assets/dots.png";
import market from "../../assets/market.png";
export const cardsArray = [
  {
    id: 1,
    cardNumber: "4441 **** **** 1931",
    owner: "Vasyl Petrenko",
    borderColor: "#0F0E0C", // additional border color
    backgroundGradient: "linear-gradient(to bottom, #0F0E0C, #2B2B2B)",
    balance: "25,430.50",
    operationsCards: [
      {
        id: 1,
        name: "Starbucks",
        type: "expense",
        amount: 120.0,
        currency: "₴",
        color: "red",
      },
      {
        id: 2,
        name: "Зарплата",
        type: "income",
        amount: 15000.0,
        currency: "₴",
        color: "green",
      },
      {
        id: 3,
        name: "Starbucks",
        type: "expense",
        amount: 120.0,
        currency: "₴",
        color: "red",
      },
    ],
  },
  {
    id: 2,
    cardNumber: "4441 **** **** 1931",
    owner: "Vasyl Petrenko",
    borderColor: "#FB5255", // additional border color
    backgroundGradient: "linear-gradient(to bottom, #0F0E0C, #2B2B2B)",
    operationsCards: [
      {
        id: 1,
        name: "Starbucks",
        type: "expense",
        amount: 120.0,
        currency: "₴",
        color: "red",
      },
      {
        id: 2,
        name: "Зарплата",
        type: "income",
        amount: 15000.0,
        currency: "₴",
        color: "green",
      },
      {
        id: 3,
        name: "Starbucks",
        type: "expense",
        amount: 120.0,
        currency: "₴",
        color: "red",
      },
    ],
  },
];

export default function Balance() {
  // const [isSettingsOpen, setIsOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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
      {!isSettingsOpen && !isContactsOpen && (
        <div className="flex justify-between w-full items-center  pr-2">
          <div className="flex gap-3 items-center">
            <img
              src=""
              alt=""
              className="w-[37px] bg-[#3F497A] h-[37px] rounded-full"
            />
            <img src={message} alt="" />
          </div>
          <div className="flex  items-center gap-3">
            <div className="flex gap-2 items-center">
              <img src={price} alt="" />
              <div className="text-[#E1E1E1]">Кешбек</div>
            </div>
            <div className="h-[24px] w-[1px] bg-[#3F497A]"></div>
            <div className="flex gap-2 items-center">
              <img src={monobank} alt="" />
              <img src={rating} alt="" />
            </div>
          </div>
        </div>
      )}

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
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {cardsArray.map((card, index) => (
            <SwiperSlide key={card.id} className="">
              <div className=" ">
                {/* Top spacer + balance */}
                {!isSettingsOpen && !isContactsOpen && (
                  <>
                    <div className="h-[80px] w-full"></div>
                    <div className="text-center flex items-center justify-center gap-2">
                      <img src={plus} alt="" className="mt-2" />
                      <p className="text-[47px] text-[#E1E1E1] font-semibold leading-[40px] flex items-center">
                        <div>{card.balance}</div>{" "}
                        <img src={grivna} alt="" className="mt-2" />
                      </p>
                    </div>
                  </>
                )}

                {!isContactsOpen && (
                  <div
                    className={`!w-[100%] relative transition-all duration-500 ease-in-out`}
                    style={{
                      right:
                        activeIndex !== index && !isSettingsOpen
                          ? "3.5rem"
                          : "",
                    }}
                  >
                    <MonobankCard
                      cardNumber={card.cardNumber}
                      isOpen={isSettingsOpen}
                      setIsOpen={setIsSettingsOpen}
                      borderColor={card.borderColor}
                      owner={card.owner}
                    />
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {!isSettingsOpen && !isContactsOpen && (
                    <MainDashboard
                      isContactsOpen={isContactsOpen}
                      setIsOpen={setIsSettingsOpen}
                      setIsContactsOpen={setIsContactsOpen}
                      operationsCards={card.operationsCards}
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

      {!isSettingsOpen && !isContactsOpen && (
        <div className="flex justify-center fixed bottom-2 z-[999]  gap-3 mt-3 mx-auto w-full items-center  ">
          <div className="bg-[#292929] py-[12px] px-[30px]  rounded-full">
            <div className="flex gap-[20px]">
              <div className="flex flex-col justify-center items-center">
                <img src={two_cards} alt="" />
                <p className="text-[10px]">Картки</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src={credits} alt="" />
                <p className="text-[10px]">Кредити</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src={six} alt="" />
                <p className="text-[10px]">Накопичення</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src={dots} alt="" />
                <p className="text-[10px]">Ще</p>
              </div>
            </div>
          </div>
          <div className="bg-[#292929] h-[65px] w-[65px] flex items-center justify-center rounded-full">
            <img src={market} alt="w-[37px] h-[37px]" />
          </div>
        </div>
      )}
      {!isSettingsOpen && !isContactsOpen && <div className="mt-[70px]"></div>}
    </div>
  );
}
