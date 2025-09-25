import React, { useState } from "react";
import MonobankCard from "./MonobankCard";
import card_icon from "../../assets/card_icon.svg";
import pdf_icon from "../../assets/pdf_icon.svg";
import slices_icon from "../../assets/slices.svg";
import blue_smile from "../../assets/blue_smile.svg";
import pink_icon from "../../assets/pink_icon.svg";
import pink_pdf from "../../assets/pink_pdf.svg";
import green_pdf from "../../assets/green_pdf.svg";
import apple_icon from "../../assets/apple_icon.svg";

import lock_icon from "../../assets/lock_icon.svg";
import credit_icon from "../../assets/credit_icon.svg";

import service_icon from "../../assets/service_icon.svg";
import { motion, AnimatePresence } from "framer-motion";
export default function Balance() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #0B0D40, #16265A, #121212)",
      }}
      className="min-h-screen text-white p-3 flex flex-col items-center"
    >
      {isOpen && <div className="h-[70px] w-full"></div>}
      {!isOpen && (
        <>
          <div className="h-[80px] w-full"></div>
          <div className="text-center">
            <p className="text-[43px] font-semibold leading-[40px]">
              ₴ 25,430.50
            </p>
          </div>
        </>
      )}

      {/* Карточка */}
      <motion.div
        layout
        initial={false}
        animate={{ y: isOpen ? -60 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="flex justify-center w-full"
      >
        <MonobankCard
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          cardNumber="4441 **** **** 1931"
        />
      </motion.div>

      {/* Нижние блоки */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="w-full mt-8 flex flex-col gap-3"
          >
            {/* Баланс */}

            {/* Навигация */}
            <div className="flex justify-around ">
              <div className="flex flex-col items-center gap-3 w-[77px] text-center cursor-pointer">
                <div className="w-[57px] h-[57px] rounded-full bg-[#04070E] flex justify-center items-center">
                  <img src={card_icon} alt="" />
                </div>
                <p>Переказати на картку</p>
              </div>
              <div className="flex flex-col items-center gap-3 w-[77px] text-center cursor-pointer">
                <div className="w-[57px] h-[57px] rounded-full bg-[#04070E] flex justify-center items-center">
                  <img src={pdf_icon} alt="" />
                </div>
                <p>Платіж за IBAN</p>
              </div>
              <div className="flex flex-col items-center gap-3 w-[77px] text-center cursor-pointer">
                <div className="w-[57px] h-[57px] rounded-full bg-[#04070E] flex justify-center items-center">
                  <img src={slices_icon} alt="" />
                </div>
                <p>Інші платежі</p>
              </div>
            </div>
            {/* Операции */}
            <div className="mt-8 bg-[#272727] py-4 px-3 rounded-2xl">
              <h3 className="text-lg font-semibold mb-4">Операції</h3>
              <ul className="flex flex-col gap-5">
                <li className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="w-[42px] h-[42px] rounded-full bg-[#04070E]"></div>
                    <span>Starbucks</span>
                  </div>
                  <span className="text-red-400">-120 ₴</span>
                </li>
                <li className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="w-[42px] h-[42px] rounded-full bg-[#04070E]"></div>
                    <span>Зарплата</span>
                  </div>
                  <span className="text-green-400">+15,000 ₴</span>
                </li>
              </ul>
            </div>
            <>
              {" "}
              <div className=" bg-[#272727] py-4 px-3 rounded-2xl">
                <h3 className="text-lg font-semibold mb-4">Операції</h3>
                <ul className="flex flex-col gap-5">
                  <li className="flex justify-between items-center rounded-xl  ">
                    <div className="flex gap-4 items-center">
                      <div className="w-[42px] h-[42px] rounded-full bg-[#04070E] flex justify-center items-center"></div>
                      <span>Starbucks</span>
                    </div>

                    <span className="text-red-400">- 120.00 ₴ </span>
                  </li>
                  <li className="flex justify-between items-center rounded-xl  ">
                    <div className="flex gap-4 items-center">
                      <div className="w-[42px] h-[42px] rounded-full bg-[#04070E] flex justify-center items-center"></div>
                      <span>Зарплата</span>
                    </div>
                    <span className="text-green-400">+ 15,000.00 ₴</span>
                  </li>
                  <li className="flex justify-between items-center rounded-xl  ">
                    <div className="flex gap-4 items-center">
                      <div className="w-[42px] h-[42px] rounded-full bg-[#04070E] flex justify-center items-center"></div>
                      <span>Starbucks</span>
                    </div>

                    <span className="text-red-400">- 120.00 ₴</span>
                  </li>
                </ul>
              </div>
              <div className=" bg-[#272727] py-4 px-3 rounded-2xl">
                <h3 className="text-lg font-semibold mb-4">Інформація</h3>
                <div className="bg-[#343434] flex flex-col gap-2 p-4 rounded-xl">
                  <p className="text-[#91A2B1] text-[13px]!">Обмеження НБУ</p>

                  {/* Прогресс-бар */}
                  <div className="w-full h-[5px] bg-[#1E1E1E] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: "0%" }} // замените 0% на динамическое значение
                    ></div>
                  </div>

                  <p className="text-[#E1E1E1] text-[13px]!">Використано 0 ₴</p>
                </div>
              </div>
              <div className=" bg-[#272727] py-4 px-3 rounded-2xl ">
                <h3 className="text-lg font-semibold mb-4">Корисне</h3>
                <div className="bg-[#343434] flex flex-col items-center mb-3 gap-2 p-4 rounded-xl">
                  <div className="flex gap-2 items-center">
                    <div className="w-[36px] h-[36px] flex justify-center items-center bg-[#414141] rounded-full"></div>
                    <div className="flex flex-col gap-1">
                      <div className="text-[13px]! text-[#91A2B1]">
                        Болгарський лев
                      </div>
                      <div className="text-[13px]! text-[#E1E1E1]">25.1157</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col  gap-3">
                  <div className="flex text-center gap-3">
                    <div className="max-w-[200px] w-full bg-[#343434] flex flex-col justify-center items-center gap-2 px-2 py-4 rounded-xl">
                      <img
                        src={blue_smile}
                        className={"w-[28px] h-[28px]"}
                        alt="icon"
                      />
                      <p className="text-[13px]! text-[#E1E1E1]">
                        Служба підтримки
                      </p>
                    </div>
                    <div className="max-w-[200px] w-full bg-[#343434] flex flex-col justify-center items-center gap-2 px-2 py-4 rounded-xl">
                      <img
                        src={pink_icon}
                        className={"w-[28px] h-[28px]"}
                        alt="icon"
                      />
                      <p className="text-[13px]! text-[#E1E1E1]">
                        Поширені запитання
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-center ">
                    <div className="max-w-[200px] w-full bg-[#343434] flex flex-col justify-center items-center gap-2 px-2 py-4 rounded-xl">
                      <img
                        src={pink_pdf}
                        className={"w-[28px] h-[28px]"}
                        alt="icon"
                      />
                      <p className="text-[13px]! text-[#E1E1E1]">
                        Виписки та довідки
                      </p>
                    </div>
                    <div className="max-w-[200px] w-full bg-[#343434] flex flex-col justify-center items-center gap-2 px-2 py-4 rounded-xl">
                      <img
                        src={green_pdf}
                        className={"w-[28px] h-[28px]"}
                        alt="icon"
                      />
                      <p className="text-[13px]! text-[#E1E1E1]">
                        Умови та тарифи
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full  flex flex-col gap-3"
          >
            {/* Детали карты */}

            <div className="bg-[#2C3B5A] rounded-2xl flex flex-col gap-5 p-5">
              <div className="flex gap-3 items-center">
                <div className="w-[31px] h-[31px] flex justify-center items-center">
                  <img src={apple_icon} alt="" />
                </div>
                <div className="flex flex-col ">
                  <div className="text-[#E1E1E1] text-[15px]">
                    Налаштування Apple Pay
                  </div>
                  <div className="text-[#91A2B1] text-[13px]">
                    Обрати скін картки - у нас їх багато
                  </div>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="w-[31px] h-[31px] flex justify-center items-center">
                  <img src={lock_icon} alt="" />
                </div>
                <div className="flex flex-col ">
                  <div className="text-[#E1E1E1] text-[15px]">
                    Заблокувати картку
                  </div>
                  <div className="text-[#91A2B1] text-[13px]">
                    Ви завжди можете її розблокувати
                  </div>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="w-[31px] h-[31px] flex justify-center items-center">
                  <img src={credit_icon} alt="" />
                </div>
                <div className="flex flex-col ">
                  <div className="text-[#E1E1E1] text-[15px]">
                    Змінити кредитний ліміт
                  </div>
                  <div className="text-[#91A2B1] text-[13px]">
                    Поточний ліміт 0
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 bg-[#293353] p-5 rounded-2xl items-center">
              <div className="w-[31px] h-[31px] flex justify-center items-center">
                <img src={service_icon} alt="" />
              </div>
              <div className="flex flex-col ">
                <div className="text-[#E1E1E1] text-[15px]">
                  Підписки та сервіси
                </div>
                <div className="text-[#91A2B1] text-[13px]">
                  Керування списаннями картки
                </div>
              </div>
            </div>
            <div
              style={{
                background: "linear-gradient(to bottom, #293B60, #283B5C)",
              }}
              className=" rounded-2xl flex flex-col gap-5 p-5"
            >
              <div className="flex gap-3 items-center">
                <div className="w-[31px] h-[31px] flex justify-center items-center">
                  <img src={apple_icon} alt="" />
                </div>
                <div className="flex flex-col ">
                  <div className="text-[#E1E1E1] text-[15px]">
                    Налаштування Apple Pay
                  </div>
                  <div className="text-[#91A2B1] text-[13px]">
                    Обрати скін картки - у нас їх багато
                  </div>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="w-[31px] h-[31px] flex justify-center items-center">
                  <img src={lock_icon} alt="" />
                </div>
                <div className="flex flex-col ">
                  <div className="text-[#E1E1E1] text-[15px]">
                    Заблокувати картку
                  </div>
                  <div className="text-[#91A2B1] text-[13px]">
                    Ви завжди можете її розблокувати
                  </div>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="w-[31px] h-[31px] flex justify-center items-center">
                  <img src={credit_icon} alt="" />
                </div>
                <div className="flex flex-col ">
                  <div className="text-[#E1E1E1] text-[15px]">
                    Змінити кредитний ліміт
                  </div>
                  <div className="text-[#91A2B1] text-[13px]">
                    Поточний ліміт 0
                  </div>
                </div>
              </div>
            </div>

            {/* Настройки */}
            <div className="bg-[#272727] py-4 px-3 rounded-2xl">
              <h3 className="text-lg font-semibold mb-4">Налаштування</h3>
              <p className="text-[#E1E1E1]">Заморозити картку</p>
              <p className="text-[#E1E1E1]">Змінити PIN</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
