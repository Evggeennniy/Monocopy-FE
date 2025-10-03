import React from "react";

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

function Contacts({ setIsContactsOpen, setIsSettingsOpen }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }} // start outside right
      animate={{ x: 0, opacity: 1 }} // move to position
      exit={{ x: "-100%", opacity: 0 }} // (optional) when leaving
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className=" w-full h- full flex flex-col gap-3"
    >
      <div
        className=" fixed flex flex-col gap-3 top-0 left-0 w-full h-[180px]  px-4 pt-6 text-white z-50"
        style={{
          background:
            "linear-gradient(180deg, #361073 0%, #2C2199 33.72%, #3444B3 69.43%, #417BCA 100%)",
        }}
      >
        <div className=" flex items-start justify-between">
          <button
            onClick={() => {
              setIsContactsOpen(false);
              setIsSettingsOpen(false);
              console.log("clicked");
            }}
            // className="p-2 rounded-full  transition"
          >
            <ArrowLeft size={24} />
          </button>

          {/* Right icon */}
          <button>
            <img src={archive} alt="" />
          </button>
        </div>
        <h1 className="text-[23px] ">Переказ на картку</h1>
        {/* Left back arrow */}

        <div className="relative w-full ">
          {/* Icon */}

          {/* Input */}
          <input
            type="text"
            placeholder="Уведіть ім’я, номер картки або телефону"
            className="w-full  pr-10 pl-4 placeholder-[#91A2B1] opacity-80 py-3 rounded-2xl text-white  focus:outline-none"
            style={{
              background: "linear-gradient(180deg, #2E45A3 0%, #3964B3 100%)",
            }}
          />
          <img
            src={search}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white w-5 h-5"
            alt=""
          />
        </div>
      </div>
      {/* <div className="h-[170px]"></div> */}

      <div className="bg-[#121212] x w-full pt-[195px]  flex flex-col gap-4">
        <div className="px-4 ">
          <div className="p-4 flex gap-3 items-center bg-[#1E1E1E] rounded-2xl">
            <div className="">
              <img src={group} alt="" />
            </div>
            <div className="text-[#E0E0E0] text-[16px]">Групові витрати</div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-[#4B4B4B] my-2"></div>

        <div className="w-full relative pl-4 ">
          <Swiper
            spaceBetween={10}
            slidesPerView="auto"
            centeredSlides={false} // первый слайд не центрируется
            slidesOffsetBefore={0} // сдвигаем карусель в самый левый край
            slidesOffsetAfter={20}
          >
            {cards.map((card) => (
              <SwiperSlide key={card.id} className="!w-[63%]">
                <div className="flex items-center gap-3 rounded-3xl p-2 bg-[#1E1E1E]">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <p className="font-semibold text-[16px]">{card.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="px-4 ">
          {" "}
          <div className=" bg-[#1E1E1E] rounded-3xl p-4">
            <h1 className="text-2xl font-bold mb-2">Контакти</h1>
            <ul className="space-y-4">
              {contacts.map((c) => {
                // Генерируем случайный светлый цвет

                const firstLetter = c.name.charAt(0).toUpperCase();

                return (
                  <li
                    key={c.id}
                    onClick={() => {
                      navigate("/transfer/" + c.id);
                    }}
                    className="flex justify-between cursor-pointer"
                  >
                    <div className="flex items-center relative gap-4 w-full rounded-xl">
                      <div
                        className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-white text-lg"
                        style={{ backgroundColor: c.bgColor }}
                      >
                        {firstLetter}
                        <div className="w-5 h-5 left-7 top-6 absolute text-[10px] flex-items rounded-full  bg-black flex items-center justify-center text-white ">
                          <p>m</p>
                        </div>
                      </div>
                      <div className="flex-1 text-[#E0E0E0] text-[16px]">
                        <p>{c.name}</p>
                      </div>
                      <Star className="mt-2" size={20} color="#E1E1E1" />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Contacts;
