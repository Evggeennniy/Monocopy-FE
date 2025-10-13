import { ArrowLeft } from "lucide-react";
import edit from "../../assets/edit.svg";
import grivna from "../../assets/uah-icon.svg";
import tag from "../../assets/tag.svg";
import rest from "../../assets/rest.svg";
import separate from "../../assets/separate.png";

import repeat from "../../assets/repeat.png";
import save from "../../assets/save.png";
import rewatch from "../../assets/rewatch.png";
import always from "../../assets/always.png";
import rasrochka from "../../assets/rasrochka.png";
import transaction from "../../assets/transaction.svg";
import keshbek from "../../assets/keshbek.jpg";
import grafic from "../../assets/grafic.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchWithAuth from "../../util/fetchWithAuth";
import { API_URL } from "../../url";
import download from "../../assets/download.svg";
import abank from "../../assets/abank.jpg";
import pumb from "../../assets/pumb.jpg";
import privat from "../../assets/privat.jpg";
import bank from "../../assets/bank-svgrepo.svg";
function formatUADate(isoString) {
  const date = new Date(isoString);

  const months = [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
  ];

  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}

export default function TransactionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTransaction() {
      setLoading(true);
      try {
        const res = await fetchWithAuth(`${API_URL}/transactions/${id}/`);
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
        const data = await res.json();
        setTransactionData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTransaction();
  }, [id]);
  console.log(transactionData);

  if (!transactionData) return null;
  return (
    <>
      <div className=" relative ">
        <div className="bg-[#5F5FD9]  h-[120px] flex flex-col">
          <button onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-6 h-6 text-white absolute top-5 left-3" />
          </button>
        </div>

        <div className="bg-[#272727] absolute top-[100px] w-full z-10 min-h-screen    rounded-t-2xl flex flex-col gap-[15px]">
          {transactionData.operation_type === "deposit" ? (
            <div
              style={{ background: "#293B60" }}
              className="w-[64px]  absolute left-[50%] flex justify-center items-center rounded-full  transform -translate-x-1/2 -translate-y-1/2 h-[64px]"
            >
              <img src={download} className="w-9" />
            </div>
          ) : (
            <img
              src={transaction}
              alt=""
              className="absolute left-[50%]  transform -translate-x-1/2 -translate-y-1/2 h-[64px]"
            />
          )}
          <>
            <div className=" rounded-full relative flex justify-center items-center">
              {/* <img src={transaction} alt="" /> */}
              <div className="">
                {transactionData.to_card &&
                ["4441", "5375", "4899", "4042"].includes(
                  transactionData.to_card.replace(/\s+/g, "").slice(0, 4)
                ) ? (
                  // Монобанк — буква M
                  <>
                    {/* {item.to_card?.charAt(0).toUpperCase()} */}

                    <div className="w-5 h-5 -translate-x-1/2 left-61 top-3 absolute text-[10px] flex-items rounded-full bg-black flex items-center justify-center text-white pb-[2px]">
                      <p>m</p>
                    </div>
                  </>
                ) : ["5168", "4341", "4405", "4581"].includes(
                    transactionData.to_card.replace(/\s+/g, "").slice(0, 4)
                  ) ? (
                  <img
                    src={privat}
                    alt="Privat"
                    className="w-5 h-5 -translate-x-1/2 left-61 top-3 rounded-full absolute"
                  />
                ) : ["5355", "5374", "5358", "5440"].includes(
                    transactionData.to_card.replace(/\s+/g, "").slice(0, 4)
                  ) ? (
                  <img
                    src={pumb}
                    alt="PUMB"
                    className="w-5 h-5  rounded-full -translate-x-1/2 left-61 top-3 absolute"
                  />
                ) : ["4349", "5169"].includes(
                    transactionData.to_card.replace(/\s+/g, "").slice(0, 4)
                  ) ? (
                  <img
                    src={abank}
                    alt="ABank"
                    className="w-5 h-5 -translate-x-1/2 left-61 top-3 rounded-full  absolute"
                  />
                ) : (
                  <div className="w-6 h-6 flex items-center -translate-x-1/2 left-61  justify-center bg-gray-600 rounded-full top-3 absolute">
                    <img src={bank} alt="bank" className="w-3 h-3" />
                  </div>
                )}
              </div>
            </div>
          </>
          <h3 className="text-[#E0E0E0] text-center text-[17px] mt-[38px]">
            {transactionData.to_card
              ? String(transactionData.to_card).slice(0, 6) +
                "*".repeat(
                  Math.max(0, String(transactionData.to_card).length - 12)
                ) +
                String(transactionData.to_card).slice(-4)
              : "—"}
            {/* {transactionData.to_card.replace(/(.{4})/g, "$1 ").trim()} */}
          </h3>
          <div className="flex gap-[25px] justify-center items-center">
            <div className="h-[1px] bg-[#4B4B4B] w-[18%]"></div>
            <button className="flex text-[#FFFFFF] rounded-full items-center text-[12px] gap-1 py-[2px] bg-[#3833A9] px-4">
              <div className="">Переказ на картку</div>

              <img src={edit} alt="" className="" />
            </button>
            <div className="h-[1px] bg-[#4B4B4B] w-[18%]"></div>
          </div>
          <div className="text-[#91A2B1] text-[13px] text-center">
            {formatUADate(transactionData.timestamp)}
          </div>
          <div className="text-[#FDFDFD] text-[47px] flex items-center justify-center">
            {transactionData.operation_type === "deposit"
              ? Math.abs(transactionData.amount).toLocaleString("ru-RU")
              : `-${Math.abs(transactionData.amount).toLocaleString("ru-RU")}`}
            <span className="text-[35px] flex  pt-[12px] h-full ">
              .00{" "}
              <img
                src={grivna}
                className="w-[28px] mt-[14px] h-[28px]"
                alt=""
              />
            </span>
          </div>

          <div className="bg-[#1E1E1E] px-5 pb-5 pt-4 flex w-full flex-col ">
            {!["4441"].includes(
              transactionData.to_card.replace(/\s+/g, "").slice(0, 4)
            ) && <img src={keshbek} alt="" />}
            <div className="bg-[#272727] rounded-lg flex mt-3 items-center p-[15px] w-full gap-3 text-[#767676] text-[13px]">
              <img src={tag} alt="" />
              Опис та #теги
            </div>
            <div className="bg-[#272727] rounded-lg flex mt-3 items-center px-[15px] py-[13px] w-full gap-3 text-[#767676] text-[13px]">
              <img src={rest} className="h-[25px]" />
              <div className="flex flex-col ">
                <p className="text-[#91A2B1] text-[13px]">Залишок</p>
                <p className="text-[#E0E0E0] text-[15px]">
                  <div className="text-[#FDFDFD]  flex items-center gap-1 justify-center">
                    {Math.abs(transactionData.balance_after).toLocaleString(
                      "ru-RU"
                    )}
                    <span className=" flex items-center "> &#8372;</span>
                  </div>
                </p>
              </div>
            </div>
            <img src={grafic} alt="" className="mt-1" />
          </div>

          <div className="flex flex-col gap-3 pb-4 ">
            <div className="flex items-center gap-3 pl-[20px]">
              <img src={separate} alt="" className="flex-1 w-[60px] h-[60px]" />
              <p
                className="text-[16px] h-full flex justify-center flex-col  flex-13 text-[#E4E4E4]
              "
              >
                <div className="">Розділити витрату</div>

                <div className="h-[2px] mt-[11px]  bg-[#4B4B4B] w-full"></div>
              </p>
            </div>

            <div className="flex items-center gap-3 pl-[20px]">
              <img src={repeat} alt="" className="flex-1 w-[60px] h-[60px]" />
              <p
                className="text-[16px] h-full flex justify-center flex-col  flex-13 text-[#E4E4E4]
              "
              >
                <div className="">Повторити платiж</div>

                <div className="h-[2px] mt-[11px]  bg-[#4B4B4B] w-full"></div>
              </p>
            </div>
            <div className="flex items-center gap-3 pl-[20px]">
              <img src={save} alt="" className="flex-1 w-[60px] h-[60px]" />
              <p
                className="text-[16px] h-full flex justify-center flex-col  flex-13 text-[#E4E4E4]
              "
              >
                <div className="">Зберегти карту</div>

                <div className="h-[2px] mt-[11px]  bg-[#4B4B4B] w-full"></div>
              </p>
            </div>
            <div
              onClick={() => navigate(`/receipt/${id}`)}
              className="flex items-center gap-3 pl-[20px] h-full"
            >
              <img src={rewatch} alt="" className="flex-1 w-[60px] h-[60px]" />
              <p
                className="text-[16px] h-full flex justify-center flex-col  flex-13 text-[#E4E4E4]
              "
              >
                <div className="">Переглянути квитанцію</div>

                <div className="h-[2px] mt-[11px]  bg-[#4B4B4B] w-full"></div>
              </p>
            </div>
            <div className="flex items-center gap-3 pl-[20px]">
              <img src={always} alt="" className="flex-1 w-[60px] h-[60px]" />
              <p
                className="text-[16px] h-full flex justify-center flex-col  flex-13 text-[#E4E4E4]
              "
              >
                <div className="">Зробити регулярним</div>

                <div className="h-[2px] mt-[11px]  bg-[#4B4B4B] w-full"></div>
              </p>
            </div>
            <div className="flex items-center gap-3 h-[60px] flex items-between pl-[20px]">
              <img
                src={rasrochka}
                alt=""
                className="flex-1 w-[60px] h-[60px]"
              />
              <p
                className="text-[16px] h-full flex justify-center flex-col gap-4  flex-13 text-[#E4E4E4]
              "
              >
                <div className="">Перевести в росрочку</div>

                <div className="h-[2px]   bg-[#4B4B4B] w-full"></div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
