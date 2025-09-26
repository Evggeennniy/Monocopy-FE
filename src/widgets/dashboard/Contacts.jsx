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
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    favorite: true,
  },
  {
    id: 2,
    name: "Дмитро Шевченко",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    favorite: false,
  },
  {
    id: 3,
    name: "Олена Петренко",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    favorite: true,
  },
  {
    id: 4,
    name: "Максим Бондаренко",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    favorite: false,
  },
  {
    id: 5,
    name: "Софія Мельник",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
    favorite: false,
  },
  {
    id: 6,
    name: "Іван Гончаренко",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
    favorite: true,
  },
  {
    id: 7,
    name: "Марія Литвиненко",
    image: "https://randomuser.me/api/portraits/women/41.jpg",
    favorite: false,
  },
  {
    id: 8,
    name: "Олександр Мороз",
    image: "https://randomuser.me/api/portraits/men/53.jpg",
    favorite: false,
  },
  {
    id: 9,
    name: "Катерина Ткаченко",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    favorite: true,
  },
  {
    id: 10,
    name: "Олег Сидоренко",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
    favorite: false,
  },
  {
    id: 11,
    name: "Вікторія Кравчук",
    image: "https://randomuser.me/api/portraits/women/30.jpg",
    favorite: false,
  },
  {
    id: 12,
    name: "Наталія Іваненко",
    image: "https://randomuser.me/api/portraits/women/16.jpg",
    favorite: true,
  },
  {
    id: 13,
    name: "Артем Поліщук",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
    favorite: false,
  },
  {
    id: 14,
    name: "Аліна Чорна",
    image: "https://randomuser.me/api/portraits/women/34.jpg",
    favorite: false,
  },
  {
    id: 15,
    name: "Володимир Савченко",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    favorite: true,
  },
  {
    id: 16,
    name: "Ірина Бондар",
    image: "https://randomuser.me/api/portraits/women/27.jpg",
    favorite: false,
  },
  {
    id: 17,
    name: "Сергій Ковтун",
    image: "https://randomuser.me/api/portraits/men/64.jpg",
    favorite: false,
  },
  {
    id: 18,
    name: "Юлія Романенко",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
    favorite: true,
  },
  {
    id: 19,
    name: "Михайло Панасюк",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
    favorite: false,
  },
  {
    id: 20,
    name: "Тетяна Гриценко",
    image: "https://randomuser.me/api/portraits/women/19.jpg",
    favorite: false,
  },
  {
    id: 21,
    name: "Андрій Дорошенко",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
    favorite: true,
  },
  {
    id: 22,
    name: "Оксана Верес",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
    favorite: false,
  },
  {
    id: 23,
    name: "Руслан Колесник",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    favorite: false,
  },
  {
    id: 24,
    name: "Дарина Зайцева",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    favorite: true,
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

        <div className="relative w-full  w-full">
          {/* Icon */}

          {/* Input */}
          <input
            type="text"
            placeholder="Уведіть ім’я, номер картки або телефону"
            className="w-full  pr-10 pl-4 placeholder-[#91A2B1] opacity-80 py-3 rounded-2xl text-white placeholder-white focus:outline-none"
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
              {contacts.map((c) => (
                <li
                  key={c.id}
                  onClick={() => {
                    navigate("/transfer/" + c.id);
                  }}
                  className="flex justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-4  w-full rounded-xl ">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 text-[#E0E0E0] text-[16px]">
                      <p className="">{c.name}</p>
                    </div>
                    <Star className="mt-2" size={20} color="#E1E1E1" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Contacts;
