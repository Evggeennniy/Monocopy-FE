import React from "react";
import apple_icon from "../../assets/apple_icon.svg";

import lock_icon from "../../assets/lock_icon.svg";
import credit_icon from "../../assets/credit_icon.svg";

import service_icon from "../../assets/service_icon.svg";
import reopen_icon from "../../assets/reopen_icon.svg";
import plastic_card from "../../assets/plastic_card.svg";
import iron_up from "../../assets/iron_up.svg";
import key_icon from "../../assets/key_icon.svg";
import pracent_icon from "../../assets/pracent_icon.svg";
import iban_icon from "../../assets/iban_icon.svg";
import pdf_settings from "../../assets/pdf_settings.svg";
import icons_setting from "../../assets/icons_setting.svg";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
function Settings({ setIsSettingsOpen }) {
  return (
    <motion.div
      key="details"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="w-full  flex flex-col gap-3"
    >
      {/* Детали карты */}
      <div className="absolute top-5 left-4 cursor-pointer">
        <X onClick={() => setIsSettingsOpen(false)} />
      </div>
      <div className="flex gap-3 px-5 pb-5 pt-3 items-center ">
        <div className="w-[31px] h-[31px] flex justify-center items-center">
          <img src={icons_setting} alt="" />
        </div>
        <div className="flex flex-col ">
          <div className="text-[#E1E1E1] text-[15px]">Налаштування оплат</div>
          <div className="text-[#91A2B1] text-[13px]">Додаткові перевірки</div>
        </div>
      </div>

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
            <div className="text-[#E1E1E1] text-[15px]">Заблокувати картку</div>
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
            <div className="text-[#91A2B1] text-[13px]">Поточний ліміт 0</div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 bg-[#293353] p-5 rounded-2xl items-center">
        <div className="w-[31px] h-[31px] flex justify-center items-center">
          <img src={service_icon} alt="" />
        </div>
        <div className="flex flex-col ">
          <div className="text-[#E1E1E1] text-[15px]">Підписки та сервіси</div>
          <div className="text-[#91A2B1] text-[13px]">
            Керування списаннями картки
          </div>
        </div>
      </div>
      <div
        style={{
          background:
            "linear-gradient(179.89deg, #293B60 9.21%, #243A63 29.49%, #253B64 49.89%, #293B5F 68.16%, #283B5C 90.08%)",
        }}
        className=" rounded-2xl flex flex-col gap-5 p-5"
      >
        <div className="flex gap-3 items-center">
          <div className="w-[31px] h-[31px] flex justify-center items-center">
            <img src={plastic_card} alt="" />
          </div>
          <div className="flex flex-col ">
            <div className="text-[#E1E1E1] text-[15px]">
              Випустити пластикову картку
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="w-[31px] h-[31px] flex justify-center items-center">
            <img src={reopen_icon} alt="" />
          </div>
          <div className="flex flex-col ">
            <div className="text-[#E1E1E1] text-[15px]">
              Перевипустити картку
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="w-[31px] h-[31px] flex justify-center items-center">
            <img src={iron_up} alt="" />
          </div>
          <div className="flex flex-col ">
            <div className="text-[#E1E1E1] text-[15px]">
              Підпищення до Platinum або IRON
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="w-[31px] h-[31px] flex justify-center items-center">
            <img src={key_icon} alt="" />
          </div>
          <div className="flex flex-col ">
            <div className="text-[#E1E1E1] text-[15px]">
              Налаштування ПІН-коду
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="w-[31px] h-[31px] flex justify-center items-center">
            <img src={credit_icon} alt="" />
          </div>
          <div className="flex flex-col ">
            <div className="text-[#E1E1E1] text-[15px]">
              Підпищення до Platinum або IRON
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="w-[31px] h-[31px] flex justify-center items-center">
            <img src={pracent_icon} alt="" />
          </div>
          <div className="flex flex-col ">
            <div className="text-[#E1E1E1] text-[15px]">Додаткові картки</div>
            <div className="text-[#91A2B1] text-[13px]">Картка mono х АТБ</div>
          </div>
        </div>
      </div>

      <div className="bg-[#2C3B5A] rounded-2xl flex flex-col gap-5 p-5">
        <div className="flex gap-3 items-center">
          <div className="w-[31px] h-[31px] flex justify-center items-center">
            <img src={iban_icon} alt="" />
          </div>
          <div className="flex flex-col ">
            <div className="text-[#E1E1E1] text-[15px]">Реквізити картки</div>
            <div className="text-[#91A2B1] text-[13px]">
              Для поповнення за IBAN
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="w-[31px] h-[31px] flex justify-center items-center">
            <img src={pdf_settings} alt="" />
          </div>
          <div className="flex flex-col ">
            <div className="text-[#E1E1E1] text-[15px]">
              Надіслати виписку за карткою
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Settings;
