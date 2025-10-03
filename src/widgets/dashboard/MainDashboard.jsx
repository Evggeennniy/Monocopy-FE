import React from "react";
import card_icon from "../../assets/card_icon.png";
import pdf_icon from "../../assets/pdf_icon.png";
import slices_icon from "../../assets/slices.png";
import blue_smile from "../../assets/blue_smile.png";
import pink_icon from "../../assets/pink_icon.png";
import pink_pdf from "../../assets/pink_pdf.png";
import green_pdf from "../../assets/green_pdf.png";
import arrow_left from "../../assets/arrow_left.svg";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
function MainDashboard({
  setIsContactsOpen,
  setIsOpen,
  isContactsOpen,
  operationsCards,
}) {
  const navigate = useNavigate();
  console.log(operationsCards);
  const lastThreeReversed = operationsCards.slice(-3).reverse();
  function getRandomColor() {
    const colors = [
      "#FF6B6B",
      "#6BCB77",
      "#4D96FF",
      "#FFD93D",
      "#845EC2",
      "#FF9671",
      "#2C73D2",
      "#0081CF",
      "#00C9A7",
      "#F9F871",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  return (
    <>
      {!isContactsOpen && (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col gap-3"
        >
          {/* Баланс */}
          <button
            className=" h-[49px] 
           "
          ></button>

          {/* Навигация */}
          <div className="flex justify-around  mt-4 ">
            <div
              onClick={() => {
                setIsOpen(false);
                setIsContactsOpen(true);
              }}
              className="flex flex-col items-center gap-3 w-[77px]  text-center cursor-pointer"
            >
              <div className="w-[57px] h-[57px] rounded-full bg-[#04070E] flex justify-center items-center">
                <img src={card_icon} alt="" className="w-[30px] h-[30px]" />
              </div>
              <p>Переказати на картку</p>
            </div>
            <div className="flex flex-col items-center gap-3 w-[77px] text-center cursor-pointer">
              <div className="w-[57px] h-[57px] rounded-full bg-[#04070E] flex justify-center items-center">
                <img src={pdf_icon} alt="" className="w-[30px] h-[30px]" />
              </div>
              <p>Платіж за IBAN</p>
            </div>
            <div className="flex flex-col items-center gap-3 w-[77px] text-center cursor-pointer">
              <div className="w-[57px] h-[57px] rounded-full bg-[#04070E] flex justify-center items-center">
                <img src={slices_icon} alt="" className="w-[30px] h-[30px]" />
              </div>
              <p>Інші платежі</p>
            </div>
          </div>
          {/* Операции */}

          <>
            {" "}
            <div className="mt-8 bg-[#272727] py-4 px-3 rounded-2xl">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold mb-4">Операції</h3>
                <p className="bg-[#2F3239] rounded-full w-[54px] justify-center  gap-1 text-[11px] h-[25px] text-[#6386BD] flex items-center">
                  Усі <img src={arrow_left} alt="" className="pt-[1px]" />
                </p>
              </div>

              <ul className="flex flex-col gap-5">
                {lastThreeReversed.map((item) => {
                  const bgColor = getRandomColor();
                  return (
                    <li
                      onClick={() => navigate("/transaction/" + item.id)}
                      className="flex justify-between items-center rounded-xl  "
                    >
                      <div className="flex gap-4 items-center">
                        {item.operation_type === "withdraw" ? (
                          <div className="w-[42px] h-[42px] rounded-full bg-[#315cc0] flex justify-center items-center">
                            {item.cardholder_name.charAt(0).toUpperCase()}
                          </div>
                        ) : (
                          <div
                            style={{ background: bgColor }}
                            className="w-[42px] h-[42px] rounded-full  flex justify-center items-center"
                          >
                            {" "}
                            {item.cardholder_name.charAt(0).toUpperCase()}
                          </div>
                        )}

                        <span>{item.cardholder_name}</span>
                      </div>
                      {item.operation_type === "withdraw" ? (
                        <>
                          {" "}
                          <span className="text-red-400">
                            - {Number(item.amount).toLocaleString("uk-UA")}{" "}
                            &#8372;
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-green-400">
                            {Number(item.amount).toLocaleString("uk-UA")}{" "}
                            &#8372;
                          </span>
                        </>
                      )}
                    </li>
                  );
                })}
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
      )}
    </>
  );
}

export default MainDashboard;
