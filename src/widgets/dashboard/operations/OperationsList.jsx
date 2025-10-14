import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import arrow_left from "../../../assets/arrow_left.svg";
import card_image from "../../../assets/card_image.png";
import OperationItem from "./OperationItem";

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
    return [...allOperations].reverse();
  }, [allOperations]);

  const groupedOperations = useMemo(() => {
    return reversedAll.reduce((groups, item) => {
      const date = new Date(item.timestamp).toLocaleDateString("uk-UA", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      if (!groups[date]) groups[date] = [];
      groups[date].push(item);
      return groups;
    }, {});
  }, [reversedAll]);

  return (
    <div className="mt-8 bg-[#272727]  pb-3 pt-6 px-3 rounded-2xl relative z-[1000]">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-[17px] font-semibold ">Операції</h3>

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
          <OperationItem key={item.id} item={item} navigate={navigate} />
        ))}
      </ul>

      <AnimatePresence>
        {showAll && (
          <>
            {/* Затемнение фона */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAll(false)}
            />

            {/* Полный экран */}
            <motion.div
              className="fixed inset-0 min-h-screen  bg-[#272727] z-50 flex flex-col px-5 overflow-y-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.45, ease: [0.25, 0.8, 0.25, 1] }}
            >
              {/* Верхняя панель — теперь НЕ фиксирована */}

              <div className="flex flex-col h-full">
                {/* Верхняя панель — часть контента */}
                <div className="flex justify-between items-start mb-3 pt-5 pb-3 bg-[#272727] z-10 ">
                  <button
                    onClick={() => setShowAll(false)}
                    className="text-[#E1E1E1] text-xl flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#2F3239] transition-colors"
                  >
                    ✕
                  </button>

                  <div className="flex flex-col items-center justify-center gap-1">
                    <img src={card_image} alt="user" className="w-15 h-10" />
                    <div className="flex items-center gap-1 text-[#E1E1E1] text-sm font-medium">
                      {balance}
                      <span className="text-[13px]">₴</span>
                    </div>
                  </div>

                  <button
                    onClick={() => console.log("search clicked")}
                    className="text-[#6386BD] text-xl flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#2F3239]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
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

                {/* Скролл-зона для списка */}
                <div className="flex-1 overflow-y-auto pb-10 scrollbar-none">
                  <ul className="flex flex-col gap-8">
                    {Object.entries(groupedOperations).map(([date, items]) => (
                      <li key={date} className="flex flex-col gap-3">
                        {/* Sticky дата внутри скролл-зоны */}
                        <div className="sticky top-0 bg-[#272727] text-center text-[#BEBEBE] text-sm font-medium z-20 py-2">
                          {date}
                        </div>
                        <ul className="flex flex-col gap-4">
                          {items.map((item) => (
                            <OperationItem
                              key={item.id}
                              item={item}
                              navigate={navigate}
                            />
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OperationsList;
