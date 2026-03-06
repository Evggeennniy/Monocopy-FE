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
import message from "../../assets/message.png";
import prize from "../../assets/price.png";
import monobank from "../../assets/monobank.png";
import rating from "../../assets/stats-icon.png";
import two_cards from "../../assets/icon.two.card.svg";
import credits from "../../assets/icon.credit.svg";
import six from "../../assets/16.svg";
import dots from "../../assets/icon.menu.svg";
import market from "../../assets/market.svg";
import fetchWithAuth from "../../util/fetchWithAuth";
import { API_URL } from "../../url";
import bank_cards from "../../assets/bank-cards.svg";
import loadingIcon from "../../assets/loading.svg";
import { RefreshCw } from "lucide-react";
import { useTheme } from "../../util/useTheme";
import setThemeColor from "../../util/setThemeColor";

export default function Balance() {
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [displayBalance, setDisplayBalance] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offsetY, setOffsetY] = useState(0);
  const [hasFlown, setHasFlown] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Новое состояние для управления видимостью перекрывающего блока
  const [isBalanceCovered, setIsBalanceCovered] = useState(false);

  // Загружаем состояние блюра из localStorage при монтировании
  useEffect(() => {
    const savedBalanceCovered = localStorage.getItem("balanceCovered");
    if (savedBalanceCovered !== null) {
      setIsBalanceCovered(JSON.parse(savedBalanceCovered));
    }
  }, []);

  // Сохраняем состояние блюра в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("balanceCovered", JSON.stringify(isBalanceCovered));
  }, [isBalanceCovered]);

  const animateBalance = (from, to, duration = 500) => {
    const start = performance.now();
    const step = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      setDisplayBalance(Math.round(from + (to - from) * progress));
      if (progress < 1) requestAnimationFrame(step);
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
          const newBalance = data[0].balance;
          const prevBalance =
            parseFloat(localStorage.getItem("firstCardBalance")) || 0;

          if (prevBalance !== newBalance) {
            animateBalance(prevBalance, newBalance);
            localStorage.setItem("firstCardBalance", newBalance);
          }
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
    intervalId = setInterval(fetchCards, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // ✅ Устанавливаем цвет статус-бара при каждом заходе на страницу
  useEffect(() => {
    setThemeColor("var(--gradient-default-start)");
  }, []);

  const gradientBg =
    !isSettingsOpen && !isContactsOpen && !showAll
      ? "var(--bg-gradient-default)"
      : isContactsOpen
        ? "var(--bg-gradient-contacts)"
        : isSettingsOpen
          ? "var(--bg-gradient-settings)"
          : "var(--gray-1)";

  const firstCard = cards[0];
  const formattedBalance = Number(displayBalance)
    .toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(/,/g, " ");

  // Обработчик нажатия на значок гривны
  const handleGrivnaClick = () => {
    setIsBalanceCovered(!isBalanceCovered);
  };

  const calcRightOffset = (index) => {
    if (activeIndex === index || isSettingsOpen) return "";
    const width = window.innerWidth;
    if (width <= 380) return "1rem";
    if (width <= 390) return "2rem";
    if (width <= 400) return "3rem";
    if (width <= 430) return "4rem";
    return "5rem";
  };

  return (
    <div
      style={{ background: gradientBg }}
      className={`min-h-screen text-white relative flex flex-col items-center  ${
        isContactsOpen ? "p-0" : "p-0"
      }`}
    >
      {/* ===== Верхняя панель ===== */}
      <div
        className={`flex items-center absolute justify-center gap-2 text-sm h-[65px] duration-300 text-[var(--text-gray-400)] ${
          !hasFlown ? "opacity-0" : "opacity-100"
        }`}
      >
        <img
          src={loadingIcon}
          className={`w-7 h-7 ${
            hasFlown ? "animate-spin" : ""
          } bg-[var(--color-white)] p-1 rounded-full transition-transform`}
        />
      </div>

      {!isSettingsOpen && !isContactsOpen && !showAll && firstCard && (
        <div
          className={`flex justify-between w-full items-end p-4 transition-opacity duration-300 z-0 relative ${
            hasFlown ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex gap-3 items-center">
            <div className="w-[33px] h-[33px] rounded-full bg-[var(--blue-primary)] flex justify-center items-center text-[var(--text-primary)]">
              {firstCard.user.first_name[0].toUpperCase()}
            </div>
            <img src={message} alt="message" className="w-[22px] h-[20px]" />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center">
              <img src={prize} alt="price" className="w-[23px] h-[27px] pb-1" />
              <div className="text-[var(--balance)] fira-sans-normal">
                7.73 ₴
              </div>
            </div>
            <div className="h-[24px] w-[1px] bg-[var(--border-divider)]" />
            <div className="flex gap-5 items-center">
              <img
                src={monobank}
                alt="monobank"
                className="w-[22px] h-[22px]"
              />
              <img src={rating} alt="rating" className="w-[22px] h-[22px]" />
            </div>
          </div>
        </div>
      )}

      {isSettingsOpen && !isContactsOpen && <div className="h-[80px] w-full" />}

      {/* ===== Свайпер с картами ===== */}
      <div className="w-full">
        <Swiper
          spaceBetween={0}
          slidesPerView="auto"
          slidesOffsetBefore={0}
          slidesOffsetAfter={16}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
            localStorage.setItem("card", swiper.activeIndex);
          }}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={card.id}>
              {/* ===== Баланс ===== */}
              {!isSettingsOpen && !isContactsOpen && !showAll && (
                <>
                  <div className="h-[70px] w-full" />
                  <div className="text-center mb-4 flex justify-center items-center gap-2">
                    <img src={plus} alt="plus" />
                    <div className="relative">
                      <p className="text-[47px] leading-[40px] flex items-center">
                        <span className="fira-sans-semibold text-[var(--balance)] tracking-[2px]">
                          {formattedBalance}
                        </span>
                        <img
                          src={grivna}
                          alt="₴"
                          className="h-[35px] cursor-pointer transition-opacity hover:opacity-80 active:opacity-60"
                          onClick={handleGrivnaClick}
                        />
                      </p>
                      {isBalanceCovered && (
                        <div
                          className="absolute top-0 right-0 h-full bg-[var(--transfer-button-active)]/10 rounded"
                          style={{
                            width: "13%",
                            backdropFilter: "blur(8px)",
                            pointerEvents: "none",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* ===== Карта ===== */}
              {!isContactsOpen && !showAll && (
                <div
                  className="relative mx-auto transition-all px-4 duration-600 ease-in-out"
                  style={{ right: calcRightOffset(index) }}
                >
                  <MonobankCard
                    cardNumber={card.card_number}
                    isOpen={isSettingsOpen}
                    setIsOpen={setIsSettingsOpen}
                    offsetY={offsetY}
                    borderColor={
                      index === 0
                        ? "var(--border-card-first)"
                        : "var(--border-card-other)"
                    }
                    owner={`${card.user.first_name} ${card.user.last_name}`}
                  />
                </div>
              )}

              <AnimatePresence mode="popLayout">
                {!isSettingsOpen && !isContactsOpen && (
                  <div className="p-3">
                    <MainDashboard
                      setHasFlown={setHasFlown}
                      showAll={showAll}
                      offsetY={offsetY}
                      setOffsetY={setOffsetY}
                      balance={formattedBalance}
                      setShowAll={setShowAll}
                      isContactsOpen={isContactsOpen}
                      setIsOpen={setIsSettingsOpen}
                      setIsContactsOpen={setIsContactsOpen}
                      operationsCards={card.transactions}
                    />
                  </div>
                )}
              </AnimatePresence>
            </SwiperSlide>
          ))}
        </Swiper>

        {!isSettingsOpen && !isContactsOpen && !showAll && (
          <>
            {cards.length === 1 ? (
              <div
                className="flex absolute top-[22.5rem] right-1/2 z-[100] w-[120px] bg-[var(--bg-black-transparent)] rounded-full justify-center items-center gap-2 transform translate-x-1/2 transition-opacity duration-300"
                style={{
                  opacity:
                    offsetY > 10 ? Math.max(1 - (offsetY - 10) / 40, 0) : 1,
                }}
              >
                <span className="w-2 h-2 bg-[var(--color-white)] rounded-full"></span>
                <button className="text-[var(--text-gray-500)] pb-[1px] font-bold">
                  +
                </button>
              </div>
            ) : (
              <button
                className="flex absolute top-[21.4rem] left-1/2 z-[100] transform -translate-x-1/2 items-center mx-auto px-4 gap-2 py-[2px] rounded-full bg-[var(--blue-dark-1)] opacity-90 transition-opacity duration-300"
                style={{
                  opacity:
                    offsetY > 10 ? Math.max(1 - (offsetY - 10) / 40, 0) : 1,
                }}
              >
                <img src={bank_cards} alt="bank_cards" />
                <p className="text-[12px] text-[text-[var(--text-secondary)]]">
                  Усі картки
                </p>
              </button>
            )}
          </>
        )}
      </div>

      {isSettingsOpen && !isContactsOpen && (
        <div className="w-full max-w-[430px] p-5" mode="popLayout">
          <Settings setIsSettingsOpen={setIsSettingsOpen} />
        </div>
      )}

      {isContactsOpen && (
        <Contacts
          setIsSettingsOpen={setIsSettingsOpen}
          setIsContactsOpen={setIsContactsOpen}
        />
      )}

      {!isSettingsOpen && !isContactsOpen && !showAll && (
        <>
          <div className="flex justify-center fixed bottom-6 z-[999] gap-3 w-full items-center">
            <div className="bg-[var(--gray-2)] py-[12px] px-[25px] rounded-full">
              <div className="flex justify-around gap-[20px]">
                {[
                  { img: two_cards, label: "Картки", active: true },
                  { img: credits, label: "Кредити" },
                  { img: six, label: "Накопичення" },
                  { img: dots, label: "Ще" },
                ].map(({ img, label, active }) => (
                  <div
                    key={label}
                    className="flex flex-col justify-center items-center"
                  >
                    <img src={img} alt={label} className="w-[27px] h-[27px]" />
                    <p
                      className={`text-[10px] ${
                        active
                          ? "text-[var(--red-secondary)]"
                          : "text-[var(--text-primary)]"
                      }`}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="bg-[var(--gray-2)] h-[65px] w-[65px] flex items-center justify-center rounded-full"
            >
              <img src={market} alt="market" className="w-[37px] h-[37px]" />
            </button>
          </div>
          <div className="fixed bottom-0 left-0 w-full h-[90px] bg-[var(--gradient-footer)] z-[1]" />
        </>
      )}

      {!isSettingsOpen && !isContactsOpen && <div className="mt-[90px]" />}
    </div>
  );
}
