import React from "react";
import MonobankCard from "./MonobankCard";
import card_icon from "../../assets/card_icon.svg";
import pdf_icon from "../../assets/pdf_icon.svg";
import slices_icon from "../../assets/slices.svg";
function Balance() {
  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, #0B0D40, #16265A, #112658, #0D244E, #121212)",
      }}
      className="min-h-screen  text-white p-3 flex flex-col "
    >
      <div className="h-20 w-full"></div>
      {/* Верхняя часть с картой */}

      <div className="text-center ">
        <p className="text-[43px] font-semibold leading-[20px] ">₴ 25,430.50</p>
      </div>
      <div className="flex justify-center">
        <MonobankCard cardNumber="4441 **** **** 1931" />
      </div>

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
          <p>Інші плвтежі</p>
        </div>
      </div>

      {/* Баланс */}

      {/* Кнопки действий */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
          <ArrowDownCircle className="w-5 h-5" /> Пополнить
        </Button>
        <Button className="bg-red-600 hover:bg-red-700 flex items-center gap-2">
          <ArrowUpCircle className="w-5 h-5" /> Отправить
        </Button> */}
      </div>

      {/* История транзакций */}
      <div className="mt-8 bg-[#272727] py-4 px-3 rounded-2xl">
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
    </div>
  );
}

export default Balance;
