import React, { useEffect, useState } from "react";
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
import message from "../../assets/message.png";
import price from "../../assets/price.png";
import monobank from "../../assets/monobank.png";
import rating from "../../assets/rating.svg";
import two_cards from "../../assets/two_cards.png";
import credits from "../../assets/credits.png";
import six from "../../assets/16.png";
import dots from "../../assets/dots.png";
import market from "../../assets/market.png";
import fetchWithAuth from "../../util/fetchWithAuth";
import { API_URL } from "../../url";
import bank_cards from "../../assets/bank-cards.svg";
export const cardsArray = [
  {
    id: 1,
    cardNumber: "4441 5555 5555 1931",
    owner: "Vasyl Petrenko",
    borderColor: "#0F0E0C",
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
    cardNumber: "4441 5555 5555 1931",
    owner: "Vasyl Petrenko",
    borderColor: "#FB5255",
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
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCards() {
      setLoading(true);
      try {
        const res = await fetchWithAuth(`${API_URL}/cards/`);
        if (!res.ok) {
          throw new Error(`Ошибка: ${res.status}`);
        }
        console.log(res);
        const data = await res.json();
        console.log(data, "data");
        // если API возвращает JSON
        setCards(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCards();
  }, []);
  console.log(cards, "cards");
  return (
    <div
      style={{
        background: !isSettingsOpen
          ? "linear-gradient(179.99deg, #0B0D40 0%, #16265A 16.21%, #112658 31.61%, #0D244E 48.57%, #121212 57.07%, #121212 98.97%)"
          : "linear-gradient(180deg, #060622 0%, #181C2A 16.21%, #0D1D41 31.61%, #0E2652 48.57%, #132646 100%)",
      }}
      className={`min-h-screen text-white flex flex-col items-center ${
        isContactsOpen ? "p-0" : " p-0"
      } `}
    >
      {!isSettingsOpen && !isContactsOpen && (
        <div className="flex justify-between  w-full items-center p-3 pr-2">
          <div className="flex gap-3 items-center">
            <div className="w-[42px] h-[42px] rounded-full bg-[#315cc0] flex justify-center items-center">
              {cards[0]?.user.first_name.charAt(0).toUpperCase()}
            </div>

            <img src={message} alt="" className="w-[32px] h-[33px]" />
          </div>
          <div className="flex  items-center gap-3">
            <div className="flex gap-2 items-center">
              <img src={price} alt="" className="w-[27px] h-[33px]" />
              <div className="text-[#E1E1E1]">Кешбек</div>
            </div>
            <div className="h-[24px] w-[1px] bg-[#3F497A]"></div>
            <div className="flex gap-2 items-center">
              <img src={monobank} alt="" className="w-[22px] h-[22px]" />
              <img src={rating} alt="" />
            </div>
          </div>
        </div>
      )}

      {isSettingsOpen && !isContactsOpen && (
        <div className="h-[80px] w-full"></div>
      )}

      {/* Карточка */}

      <div className="w-full ">
        <Swiper
          spaceBetween={0}
          slidesPerView="auto"
          centeredSlides={false}
          slidesOffsetBefore={0}
          slidesOffsetAfter={16}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
            localStorage.setItem("card", swiper.activeIndex);
          }}
        >
          {cards.map((card, index) => (
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
                    className={` relative transition-all px-4 duration-500 ease-in-out`}
                    style={{
                      right:
                        activeIndex !== index && !isSettingsOpen
                          ? "2.3rem"
                          : "",
                    }}
                  >
                    <MonobankCard
                      cardNumber={card.card_number}
                      isOpen={isSettingsOpen}
                      setIsOpen={setIsSettingsOpen}
                      borderColor={index === 0 ? "#0F0E0C" : "#FB5255"}
                      owner={card.user.first_name + " " + card.user.last_name}
                    />
                  </div>
                )}

                <AnimatePresence mode="popLayout">
                  {!isSettingsOpen && !isContactsOpen && (
                    <div className="p-3 ">
                      <MainDashboard
                        isContactsOpen={isContactsOpen}
                        setIsOpen={setIsSettingsOpen}
                        setIsContactsOpen={setIsContactsOpen}
                        operationsCards={card.transactions}
                      />
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {!isSettingsOpen && !isContactsOpen && (
          <button
            className="flex absolute top-[45%] right-[40%] z-[100]  items-center  mx-auto px-2 gap-2 cursor-pointer py-1
            rounded-full bg-[#0A1D3E] opacity-90"
          >
            {" "}
            <img src={bank_cards} alt="" />
            <p className="text-[12px] text-[#A0A6B9] ">Усі картки</p>
          </button>
        )}
      </div>
      {/* Нижние блоки */}
      <AnimatePresence mode="popLayout">
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
        <div className="flex justify-center  fixed bottom-6 z-[999]  gap-3 mt-3 mx-auto w-full items-center  ">
          <div className="bg-[#292929] py-[12px] px-[30px]  rounded-full">
            <div className="flex gap-[20px]">
              <div className="flex flex-col justify-center items-center">
                <img src={two_cards} alt="" className="w-[27px] h-[27px]" />
                <p className="text-[10px] text-[#FB5257]">Картки</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src={credits} alt="" className="w-[27px] h-[27px]" />
                <p className="text-[10px]">Кредити</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src={six} alt="" className="w-[27px] h-[27px]" />
                <p className="text-[10px]">Накопичення</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src={dots} alt="" className="w-[27px] h-[27px]" />
                <p className="text-[10px]">Ще</p>
              </div>
            </div>
          </div>
          <div className="bg-[#292929] h-[65px] w-[65px] flex items-center justify-center rounded-full">
            <img src={market} alt="" className="w-[37px] h-[37px]" />
          </div>
        </div>
      )}
      {!isSettingsOpen && !isContactsOpen && <div className="mt-[70px]"></div>}
    </div>
  );
}
