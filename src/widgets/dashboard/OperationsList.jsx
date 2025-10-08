import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrow_left from "../../assets/arrow_left.svg";
import download from "../../assets/download.svg";
import card_image from "../../assets/card_image.png";
import abank from "../../assets/abank.jpg";
import pumb from "../../assets/pumb.jpg";
import privat from "../../assets/privat.jpg";
import transaction from "../../assets/transaction.svg";
import bank from "../../assets/bank-svgrepo.svg";
const OperationsList = ({
  lastThreeReversed,
  allOperations,
  showAll,
  setShowAll,
  balance,
}) => {
  const navigate = useNavigate();

  const reversedAll = useMemo(() => {
    if (!Array.isArray(allOperations)) return [];
    return [...allOperations].reverse(); // копия + reverse
  }, [allOperations]);
  return (
    <div className="mt-8 bg-[#272727] py-4 px-3 rounded-2xl relative z-[1000]">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold mb-4">Операції</h3>

        <button
          onClick={() => setShowAll(true)}
          className="bg-[#2F3239] rounded-full w-[54px] justify-center gap-1 text-[11px] h-[25px] text-[#6386BD] flex items-center"
        >
          Усі
          <img src={arrow_left} alt="" className="pt-[1px]" />
        </button>
      </div>

      {/* последние 3 операции */}
      <ul className="flex flex-col gap-5">
        {lastThreeReversed.map((item) => (
          <li
            key={item.id}
            onClick={() => navigate("/transaction/" + item.id)}
            className="flex justify-between items-center rounded-xl cursor-pointer hover:bg-[#2f2f2f] p-2 transition-colors duration-200"
          >
            <div className="flex gap-4 items-center">
              {item.operation_type === "withdraw" ? (
                <>
                  <div className="w-[42px] h-[42px] relative rounded-full bg-[#315cc0] flex justify-center items-center">
                    {/* {item.to_card.charAt(0).toUpperCase()} */}
                    <img src={transaction} alt="" />
                    <div className="">
                      {item.to_card &&
                      ["4441", "5375", "4899", "4042"].includes(
                        item.to_card.replace(/\s+/g, "").slice(0, 4)
                      ) ? (
                        // Монобанк — буква M
                        <>
                          {item.to_card?.charAt(0).toUpperCase()}

                          <div className="w-5 h-5 left-7 top-6 absolute text-[10px] flex-items rounded-full bg-black flex items-center justify-center text-white">
                            <p>m</p>
                          </div>
                        </>
                      ) : ["5168", "4341", "4405", "4581"].includes(
                          item.to_card.replace(/\s+/g, "").slice(0, 4)
                        ) ? (
                        <img
                          src={privat}
                          alt="Privat"
                          className="w-5 h-5 left-7 rounded-full top-6 absolute"
                        />
                      ) : ["5355", "5374", "5358", "5440"].includes(
                          item.to_card.replace(/\s+/g, "").slice(0, 4)
                        ) ? (
                        <img
                          src={pumb}
                          alt="PUMB"
                          className="w-5 h-5 left-7 rounded-full top-6 absolute"
                        />
                      ) : ["4349", "5169"].includes(
                          item.to_card.replace(/\s+/g, "").slice(0, 4)
                        ) ? (
                        <img
                          src={abank}
                          alt="ABank"
                          className="w-5 h-5 left-7 rounded-full top-6 absolute"
                        />
                      ) : (
                        <div className="w-6 h-6 flex items-center justify-center bg-gray-600 left-7 rounded-full top-6 absolute">
                          <img src={bank} alt="bank" className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </div>
                  <span>
                    {item.to_card
                      ? String(item.to_card).slice(0, 6) +
                        "*".repeat(
                          Math.max(0, String(item.to_card).length - 12)
                        ) +
                        String(item.to_card).slice(-4)
                      : "—"}
                  </span>
                </>
              ) : (
                <>
                  <div
                    style={{ background: "#293B60" }}
                    className="w-[42px] h-[42px] rounded-full relative flex justify-center items-center"
                  >
                    <img src={download} className="w-7" />
                  </div>
                  <span>
                    Від: <span>{item.cardholder_name}</span>{" "}
                  </span>
                </>
              )}
            </div>

            {item.operation_type === "withdraw" ? (
              <span className="text-[#E1E1E1] bold">
                - {item.amount} &#8372;
              </span>
            ) : (
              <span className="text-[#00a500] bold">{item.amount} &#8372;</span>
            )}
          </li>
        ))}
      </ul>

      {/* ПОЛНОЭКРАННЫЙ СЛАЙД */}
      <AnimatePresence>
        {showAll && (
          <>
            {/* затемнение фона */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAll(false)}
            />

            {/* ПОЛНЫЙ ЭКРАН */}
            <motion.div
              className="fixed inset-0 bg-[#272727] z-50 flex flex-col px-5 overflow-y-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.45, ease: [0.25, 0.8, 0.25, 1] }}
            >
              {/* Верхняя панель */}
              <div className="flex justify-between items-start mb-5 sticky pt-5 top-0 bg-[#272727] pb-3 z-10">
                {/* Кнопка закрытия (крестик) */}
                <button
                  onClick={() => setShowAll(false)}
                  className="text-[#E1E1E1] text-xl flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#2F3239] transition-colors"
                >
                  ✕
                </button>

                {/* Фото по центру */}
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center justify-center">
                    <img src={card_image} alt="user" className="w-15 h-10" />
                  </div>

                  <div className="flex items-center gap-1 text-[#E1E1E1] text-sm font-medium">
                    {balance}
                    <span className="text-[#E1E1E1] text-[13px]">₴</span>
                  </div>
                </div>

                {/* Лупа справа */}
                <button
                  onClick={() => console.log("search clicked")}
                  className="text-[#6386BD] text-xl flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#2F3239] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-search text-[#E1E1E1]"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </button>
              </div>

              {/* === Группировка по дате === */}
              <ul className="flex flex-col gap-8 pb-10">
                {Object.entries(
                  [...reversedAll] // создаём копию, чтобы reverse() не мутировал
                    .reduce((groups, item) => {
                      const date = new Date(item.timestamp);
                      // форматируем дату (пример: "30 вересня 2025")
                      const dateStr = date.toLocaleDateString("uk-UA", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      });

                      if (!groups[dateStr]) groups[dateStr] = [];
                      groups[dateStr].push(item);
                      return groups;
                    }, {})
                ).map(([date, items]) => (
                  <li key={date} className="flex flex-col gap-3">
                    {/* Заголовок даты */}
                    <div className="text-center text-[#BEBEBE] text-sm font-medium">
                      {date}
                    </div>

                    {/* Список операций за дату */}
                    <ul className="flex flex-col gap-4">
                      {items.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => navigate("/transaction/" + item.id)}
                          className="flex justify-between items-center rounded-xl cursor-pointer hover:bg-[#2f2f2f] p-2 transition-colors duration-200"
                        >
                          <div className="flex gap-4 items-center">
                            {item.operation_type === "withdraw" ? (
                              <>
                                <div className="w-[42px] h-[42px] rounded-full relative bg-[#315cc0] flex justify-center items-center">
                                  <img src={transaction} alt="" />
                                  <div className="">
                                    {item.to_card &&
                                    ["4441", "5375", "4899", "4042"].includes(
                                      item.to_card
                                        .replace(/\s+/g, "")
                                        .slice(0, 4)
                                    ) ? (
                                      // Монобанк — буква M
                                      <>
                                        {item.to_card?.charAt(0).toUpperCase()}

                                        <div className="w-5 h-5 left-7 top-6 absolute text-[10px] flex-items rounded-full bg-black flex items-center justify-center text-white">
                                          <p>m</p>
                                        </div>
                                      </>
                                    ) : [
                                        "5168",
                                        "4341",
                                        "4405",
                                        "4581",
                                      ].includes(
                                        item.to_card
                                          .replace(/\s+/g, "")
                                          .slice(0, 4)
                                      ) ? (
                                      <img
                                        src={privat}
                                        alt="Privat"
                                        className="w-5 h-5 left-7 rounded-full top-6 absolute"
                                      />
                                    ) : [
                                        "5355",
                                        "5374",
                                        "5358",
                                        "5440",
                                      ].includes(
                                        item.to_card
                                          .replace(/\s+/g, "")
                                          .slice(0, 4)
                                      ) ? (
                                      <img
                                        src={pumb}
                                        alt="PUMB"
                                        className="w-5 h-5 left-7 rounded-full top-6 absolute"
                                      />
                                    ) : ["4349", "5169"].includes(
                                        item.to_card
                                          .replace(/\s+/g, "")
                                          .slice(0, 4)
                                      ) ? (
                                      <img
                                        src={abank}
                                        alt="ABank"
                                        className="w-5 h-5 left-7 rounded-full top-6 absolute"
                                      />
                                    ) : (
                                      <div className="w-6 h-6 flex items-center justify-center bg-gray-600 left-7 rounded-full top-6 absolute">
                                        <img
                                          src={bank}
                                          alt="bank"
                                          className="w-3 h-3"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <span>
                                  {item.to_card
                                    ? String(item.to_card).slice(0, 6) +
                                      "*".repeat(
                                        Math.max(
                                          0,
                                          String(item.to_card).length - 12
                                        )
                                      ) +
                                      String(item.to_card).slice(-4)
                                    : "—"}
                                </span>
                              </>
                            ) : (
                              <>
                                <div
                                  style={{ background: "#293B60" }}
                                  className="w-[42px] h-[42px] rounded-full relative flex justify-center items-center"
                                >
                                  <img src={download} className="w-7" />
                                </div>
                                <span>
                                  Від: <span>{item.cardholder_name}</span>
                                </span>
                              </>
                            )}
                          </div>

                          {item.operation_type === "withdraw" ? (
                            <span className="text-[#E1E1E1]  bold">
                              - {item.amount} &#8372;
                            </span>
                          ) : (
                            <span className="text-[#00a500] bold">
                              {item.amount} &#8372;
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OperationsList;
