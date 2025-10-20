import React, { useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";

import { Archive, ArrowLeft, Search, Star } from "lucide-react";

import archive from "../../assets/arhive.svg";
import group from "../../assets/group.svg";
import mono_green from "../../assets/mono_green.svg";
import mono_red from "../../assets/mono_red.svg";
import search from "../../assets/search.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import fetchWithAuth from "../../util/fetchWithAuth";
import { API_URL } from "../../url";

import mono from "../../assets/mono.jpg";
import { faker } from "@faker-js/faker";
import transaction from "../../assets/transaction.svg";
import { getBankIcon, getBankName } from "../../shared/getBankIcon";
import { getRandomRussianUser } from "../../util/users";
export const contacts = [
  {
    id: 1,
    name: "Анастасія Ковальчук",
    favorite: true,
    bgColor: "hsl(210, 70%, 80%)",
    cardNumber: "4000 1234 5678 9010",
  },
  {
    id: 13,
    name: "Артем Поліщук",
    favorite: false,
    bgColor: "hsl(45, 70%, 80%)",
    cardNumber: "4000 2345 6789 0123",
  },
  {
    id: 14,
    name: "Аліна Чорна",
    favorite: false,
    bgColor: "hsl(320, 70%, 80%)",
    cardNumber: "4000 3456 7890 1234",
  },
  {
    id: 21,
    name: "Андрій Дорошенко",
    favorite: true,
    bgColor: "hsl(180, 70%, 80%)",
    cardNumber: "4000 4567 8901 2345",
  },
  {
    id: 11,
    name: "Вікторія Кравчук",
    favorite: false,
    bgColor: "hsl(90, 70%, 80%)",
    cardNumber: "4000 5678 9012 3456",
  },
  {
    id: 15,
    name: "Володимир Савченко",
    favorite: true,
    bgColor: "hsl(300, 70%, 80%)",
    cardNumber: "4000 6789 0123 4567",
  },
  {
    id: 2,
    name: "Дмитро Шевченко",
    favorite: false,
    bgColor: "hsl(15, 70%, 80%)",
    cardNumber: "4000 7890 1234 5678",
  },
  {
    id: 24,
    name: "Дарина Зайцева",
    favorite: true,
    bgColor: "hsl(200, 70%, 80%)",
    cardNumber: "4000 8901 2345 6789",
  },
  {
    id: 20,
    name: "Тетяна Гриценко",
    favorite: false,
    bgColor: "hsl(350, 70%, 80%)",
    cardNumber: "4000 9012 3456 7890",
  },
  {
    id: 16,
    name: "Ірина Бондар",
    favorite: false,
    bgColor: "hsl(60, 70%, 80%)",
    cardNumber: "4000 0123 4567 8901",
  },
  {
    id: 6,
    name: "Іван Гончаренко",
    favorite: true,
    bgColor: "hsl(270, 70%, 80%)",
    cardNumber: "4000 1234 5678 9012",
  },
  {
    id: 4,
    name: "Максим Бондаренко",
    favorite: false,
    bgColor: "hsl(120, 70%, 80%)",
    cardNumber: "4000 2345 6789 0124",
  },
  {
    id: 7,
    name: "Марія Литвиненко",
    favorite: false,
    bgColor: "hsl(30, 70%, 80%)",
    cardNumber: "4000 3456 7890 1235",
  },
  {
    id: 12,
    name: "Наталія Іваненко",
    favorite: true,
    bgColor: "hsl(250, 70%, 80%)",
    cardNumber: "4000 4567 8901 2346",
  },
  {
    id: 8,
    name: "Олександр Мороз",
    favorite: false,
    bgColor: "hsl(10, 70%, 80%)",
    cardNumber: "4000 5678 9012 3457",
  },
  {
    id: 22,
    name: "Оксана Верес",
    favorite: false,
    bgColor: "hsl(190, 70%, 80%)",
    cardNumber: "4000 6789 0123 4568",
  },
  {
    id: 3,
    name: "Олена Петренко",
    favorite: true,
    bgColor: "hsl(330, 70%, 80%)",
    cardNumber: "4000 7890 1234 5679",
  },
  {
    id: 10,
    name: "Олег Сидоренко",
    favorite: false,
    bgColor: "hsl(140, 70%, 80%)",
    cardNumber: "4000 8901 2345 6780",
  },
  {
    id: 9,
    name: "Катерина Ткаченко",
    favorite: true,
    bgColor: "hsl(70, 70%, 80%)",
    cardNumber: "4000 9012 3456 7891",
  },
  {
    id: 19,
    name: "Михайло Панасюк",
    favorite: false,
    bgColor: "hsl(100, 70%, 80%)",
    cardNumber: "4000 0123 4567 8902",
  },
  {
    id: 23,
    name: "Руслан Колесник",
    favorite: false,
    bgColor: "hsl(210, 70%, 80%)",
    cardNumber: "4000 1234 5678 9013",
  },
  {
    id: 17,
    name: "Сергій Ковтун",
    favorite: false,
    bgColor: "hsl(280, 70%, 80%)",
    cardNumber: "4000 2345 6789 0125",
  },
  {
    id: 5,
    name: "Софія Мельник",
    favorite: false,
    bgColor: "hsl(160, 70%, 80%)",
    cardNumber: "4000 3456 7890 1236",
  },
  {
    id: 18,
    name: "Юлія Романенко",
    favorite: true,
    bgColor: "hsl(230, 70%, 80%)",
    cardNumber: "4000 4567 8901 2347",
  },
];

const cards = [
  {
    id: 1,
    name: "На мою доларову",
    image: mono_green,
  },
  {
    id: 2,
    name: "На мою червону",
    image: mono_red,
  },
  {
    id: 3,
    name: "На мою червону",
    image: mono_green,
  },
];

export default function Contacts({ setIsContactsOpen, setIsSettingsOpen }) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [foundCard, setFoundCard] = useState(null);
  const [randomName, setRandomName] = useState("");
  const [randomAvatar, setAvatar] = useState("");
  // const [bankName, setBankName] = useState("");
  // const bankName = getBankName();
  useEffect(() => {
    const clean = inputValue.replace(/\s+/g, "");

    if (clean.length === 16) {
      setFoundCard(inputValue);

      // Получаем рандомное реальное лицо через RandomUser.me
      getRandomRussianUser()
        .then((user) => {
          if (user) {
            setRandomName(user.name);
            setAvatar(user.avatar);
          }
        })
        .catch((err) => console.error(err));
    } else {
      setFoundCard(null);
      setRandomName("");
      setAvatar("");
    }
  }, [inputValue]);

  const handleClick = () => {
    if (!foundCard) return;
    const bankName = getBankName(foundCard);
    // Сохраняем данные в localStorage
    localStorage.setItem(
      "userData",
      JSON.stringify({
        name: bankName === "mono" ? randomName : foundCard,
        avatar: bankName === "mono" ? randomAvatar : "",
      })
    );

    // Переходим на страницу перевода
    navigate("/transfer/" + foundCard);
  };
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        background:
          "linear-gradient(180deg, #361073 0%, #2C2199 33.72%, #3444B3 69.43%, #417BCA 100%)",
      }}
      className="w-full h-screen flex flex-col   text-white overflow-hidden"
    >
      {/* HEADER */}
      <div
        className=" w-full h-[180px]  px-4 pt-6 z-50 flex flex-col gap-3 sm:h-[150px]"
        style={{
          background:
            "linear-gradient(180deg, #361073 0%, #2C2199 33.72%, #3444B3 69.43%, #417BCA 100%)",
        }}
      >
        <div className="flex items-start justify-between">
          <button
            onClick={() => {
              setIsContactsOpen(false);
              setIsSettingsOpen(false);
            }}
          >
            <ArrowLeft size={24} />
          </button>

          <button>
            <img src={archive} alt="" className="w-6 h-6" />
          </button>
        </div>

        <h1 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold">
          Переказ на картку
        </h1>

        <div className="relative w-full">
          <input
            type="text"
            value={inputValue}
            maxLength={19} // 16 цифр + 3 пробела, если вдруг пользователь попробует редактировать
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, ""); // убираем все нецифры

              if (value.length > 16) value = value.slice(0, 16); // максимум 16 цифр

              // если введено ровно 16 цифр — добавляем пробелы
              if (value.length === 16) {
                value = value.replace(/(.{4})/g, "$1 ").trim();
              }

              setInputValue(value);
            }}
            placeholder="Уведіть ім’я, номер картки або телефону"
            className="w-full pr-10 pl-4 placeholder-[#91A2B1] opacity-80 py-3 rounded-2xl text-white focus:outline-none text-[14px] sm:text-[15px]"
            style={{
              background: "linear-gradient(180deg, #2E45A3 0%, #3964B3 100%)",
            }}
          />
          <img
            src={search}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
            alt="search"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="pt-4 bg-[#121212] overflow-y-auto scrollbar-none px-3 sm:px-4 md:px-6 flex-1 space-y-4 scroll-hidden">
        {!foundCard ? (
          <>
            <div>
              <div className="p-4 flex gap-3 items-center bg-[#1E1E1E] rounded-2xl">
                <img src={group} alt="group" className="w-6 sm:w-7 h-auto" />
                <div className="text-[#E0E0E0] text-[15px] sm:text-[16px]">
                  Групові витрати
                </div>
              </div>
            </div>

            <div className="h-[1px] w-full bg-[#4B4B4B]" />

            <div>
              <div className="bg-[#1E1E1E] rounded-3xl p-4">
                <h1 className="text-xl sm:text-2xl font-bold mb-2">Контакти</h1>
                <ul className="space-y-4">
                  {contacts.map((c) => {
                    const firstLetter = c.name.charAt(0).toUpperCase();
                    return (
                      <li
                        key={c.id}
                        className="flex justify-between items-center cursor-pointer"
                      >
                        <div className="flex items-center gap-4 w-full rounded-xl">
                          <div
                            className="relative w-[42px] h-[42px] rounded-full flex items-center justify-center text-white text-lg shrink-0"
                            style={{ backgroundColor: c.bgColor }}
                          >
                            {firstLetter}
                            <img
                              src={mono}
                              alt="mono"
                              className="w-5 h-5 left-7 rounded-full top-6 absolute"
                            />
                          </div>
                          <p className="flex-1 text-[#E0E0E0] text-[15px] sm:text-[16px] truncate">
                            {c.name}
                          </p>
                          <Star
                            size={18}
                            color="#E1E1E1"
                            className="flex-shrink-0"
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div>
            <div className="bg-[#1E1E1E] rounded-3xl p-4">
              <h1 className="text-xl sm:text-2xl font-bold mb-2">Знайдено</h1>
              <ul className="space-y-4">
                {foundCard && (
                  <li
                    key={foundCard}
                    onClick={handleClick}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    <div className="flex items-center gap-4 w-full rounded-xl">
                      <div className="relative bg-black/60 w-[42px] h-[42px] rounded-full flex items-center justify-center text-white text-lg shrink-0">
                        {["4441", "4899", "4042"].includes(
                          foundCard.replace(/\s+/g, "").slice(0, 4)
                        ) ? (
                          <img
                            src={randomAvatar}
                            className="w-[42px] h-[42px] rounded-full"
                            alt=""
                          />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            className="w-5 h-5"
                          >
                            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                          </svg>
                        )}

                        <div>{getBankIcon(foundCard)}</div>
                      </div>
                      <p className="flex-1 text-[#E0E0E0] text-[15px] sm:text-[16px] break-all">
                        {["4441", "5375", "4899", "4042"].includes(
                          foundCard.replace(/\s+/g, "").slice(0, 4)
                        )
                          ? randomName
                          : foundCard}
                      </p>
                      <Star
                        size={18}
                        color="#E1E1E1"
                        className="flex-shrink-0"
                      />
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
