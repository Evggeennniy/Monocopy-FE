import React, { useEffect, useState } from "react";
import MonobankCard from "./MonobankCard";

import { AnimatePresence } from "framer-motion";
import MainDashboard from "./MainDashboard";
import Settings from "./Settings";
import Contacts from "./Contacts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import plus from "../../assets/plus.svg";
import grivna from "../../assets/uah-icon.svg";
import message from "../../assets/message.svg";
import price from "../../assets/price.svg";
import monobank from "../../assets/monobank.svg";
import rating from "../../assets/rating.svg";
import two_cards from "../../assets/two_cards.png";
import credits from "../../assets/credits.png";
import six from "../../assets/16.png";
import dots from "../../assets/dots.png";
import market from "../../assets/market.png";
import fetchWithAuth from "../../util/fetchWithAuth";
import { API_URL } from "../../url";
import bank_cards from "../../assets/bank-cards.svg";

// export const cardsArray = [
//   {
//     id: 1,
//     cardNumber: "4441 5555 5555 1931",
//     owner: "Vasyl Petrenko",
//     borderColor: "#0F0E0C",
//     balance: "25,430.50",
//     operationsCards: [
//       {
//         id: 1,
//         name: "Starbucks",
//         type: "expense",
//         amount: 120.0,
//         currency: "₴",
//         color: "red",
//       },
//       {
//         id: 2,
//         name: "Зарплата",
//         type: "income",
//         amount: 15000.0,
//         currency: "₴",
//         color: "green",
//       },
//       {
//         id: 3,
//         name: "Starbucks",
//         type: "expense",
//         amount: 120.0,
//         currency: "₴",
//         color: "red",
//       },
//     ],
//   },
//   {
//     id: 2,
//     cardNumber: "4441 5555 5555 1931",
//     owner: "Vasyl Petrenko",
//     borderColor: "#FB5255",
//     operationsCards: [
//       {
//         id: 1,
//         name: "Starbucks",
//         type: "expense",
//         amount: 120.0,
//         currency: "₴",
//         color: "red",
//       },
//       {
//         id: 2,
//         name: "Зарплата",
//         type: "income",
//         amount: 15000.0,
//         currency: "₴",
//         color: "green",
//       },
//       {
//         id: 3,
//         name: "Starbucks",
//         type: "expense",
//         amount: 120.0,
//         currency: "₴",
//         color: "red",
//       },
//     ],
//   },
// ];

export default function Balance() {
  // const [isSettingsOpen, setIsOpen] = useState(false);

  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [displayBalance, setDisplayBalance] = useState(0); // для анимации
  console.log(cards[0]?.balance, "cards");
  // функция для плавного изменения баланса
  const animateBalance = (from, to, duration = 500) => {
    const startTime = performance.now();

    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = from + (to - from) * progress;
      setDisplayBalance(Math.round(value));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    let intervalId;

    const fetchCards = async () => {
      setLoading(true);
      try {
        const res = await fetchWithAuth(`${API_URL}/cards/`);
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
        const data = await res.json();
        setCards(data);

        if (data.length > 0) {
          const newBalance = data[0].balance; // баланс первой карты

          const prevBalance =
            parseFloat(localStorage.getItem("firstCardBalance")) || 0;

          if (prevBalance !== newBalance) {
            animateBalance(prevBalance, newBalance); // анимируем
            localStorage.setItem("firstCardBalance", newBalance); // обновляем LocalStorage
          }
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards(); // сразу при монтировании

    intervalId = setInterval(fetchCards, 5000); // каждые 3 секунды

    return () => clearInterval(intervalId);
  }, []);

  console.log(cards, "cards");
  return (
    <div
      style={{
        background: !isSettingsOpen
          ? "linear-gradient(to bottom, #0B0D3F 1%,#112658 9%,#112658 16%, #0D244E 25%, #111111 40%)"
          : "linear-gradient(180deg, #060622 0%, #181C2A 16.21%, #0D1D41 31.61%, #0E2652 48.57%, #132646 100%)",
      }}
      className={`min-h-screen text-white flex flex-col items-center ${
        isContactsOpen ? "p-0" : " p-0"
      } `}
    >
      {!isSettingsOpen && !isContactsOpen && !showAll && (
        <div className="flex justify-between  w-full items-center p-3 pr-2">
          <div className="flex gap-3  items-center">
            <div className="w-[27px] h-[27px] rounded-full bg-[#315cc0] flex justify-center items-center">
              {cards[0]?.user.first_name.charAt(0).toUpperCase()}
            </div>

            <img src={message} alt="" className="w-[27px] h-[27px]" />
          </div>
          <div className="flex justify-center items-center gap-3">
            <div className="flex gap-2 justify-center items-center">
              <img src={price} alt="" className="w-[27px] h-[27px] pb-1" />
              <div className="text-[#E1E1E1]">7.73 &#8372;</div>
            </div>
            <div className="h-[24px] w-[1px] bg-[#3F497A]"></div>
            <div className="flex gap-2 items-center">
              <img src={monobank} alt="" className="w-[22px] h-[22px]" />
              <img src={rating} alt="" className="w-[22px] h-[22px]" />
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
                {!isSettingsOpen && !isContactsOpen && !showAll && (
                  <>
                    <div className="h-[80px] w-full"></div>
                    <div className="text-center flex items-center justify-center gap-2">
                      <img src={plus} alt="" className="" />
                      <p className="text-[47px]  leading-[40px] flex items-center">
                        <div className="font-bold ">
                          {Number(displayBalance)
                            .toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                            .replace(/,/g, " ")}
                        </div>
                        <img src={grivna} alt="" className="h-[30px]" />
                      </p>
                    </div>
                  </>
                )}

                {!isContactsOpen && !showAll && (
                  <div
                    className="relative transition-all px-4 duration-600 ease-in-out"
                    style={{
                      right:
                        activeIndex !== index && !isSettingsOpen
                          ? window.innerWidth <= 380
                            ? "1rem" // до 380px
                            : window.innerWidth <= 390
                            ? "2rem" // 381–390px
                            : window.innerWidth <= 400
                            ? "3rem" // 391–400px
                            : window.innerWidth <= 430
                            ? "4rem" // 401–430px
                            : "5rem" // больше 430px
                          : "12px",
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
                        showAll={showAll}
                        balance={Number(displayBalance)
                          .toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                          .replace(/,/g, " ")}
                        setShowAll={setShowAll}
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
        {!isSettingsOpen &&
          !isContactsOpen &&
          !showAll &&
          (cards.length === 1 ? (
            <div
              className="flex absolute top-[22.5rem] right-1/2 z-[100] w-[120px] bg-black/20 
                rounded-full justify-center items-center gap-2 transform translate-x-1/2"
            >
              {/* Точка */}
              <span className="w-2 h-2 bg-white rounded-full"></span>
              {/* Плюсик */}
              <button className="text-gray-500 pb-[1px] font-bold">+</button>
            </div>
          ) : (
            !isSettingsOpen &&
            !isContactsOpen &&
            !showAll && (
              <button
                className="flex absolute top-[21.5rem] left-[50%] z-[100]  transform -translate-x-1/2    items-center mx-auto px-4 gap-2 cursor-pointer py-[2px]
      rounded-full bg-[#0A1D3E] opacity-90"
              >
                <img src={bank_cards} alt="" />
                <p className="text-[12px] text-[#A0A6B9]">Усі картки</p>
              </button>
            )
          ))}
      </div>
      {/* Нижние блоки */}
      <div className="w-full max-w-[430px] p-5" mode="popLayout">
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
      </div>
      {isContactsOpen && (
        <Contacts
          setIsSettingsOpen={setIsSettingsOpen}
          setIsContactsOpen={setIsContactsOpen}
        />
      )}
      {!isSettingsOpen && !isContactsOpen && !showAll && (
        <>
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
          <div className="flex justify-center bg-black w-full h-[80px]  fixed bottom-[-15px] z-[1] blur-[15px]   gap-3 mt-3 mx-auto items-center  "></div>
        </>
      )}
      {!isSettingsOpen && !isContactsOpen && <div className="mt-[70px]"></div>}
    </div>
  );
}
