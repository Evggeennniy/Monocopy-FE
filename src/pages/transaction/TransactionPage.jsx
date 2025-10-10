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
          <img
            src={transaction}
            alt=""
            className="absolute left-[50%]  transform -translate-x-1/2 -translate-y-1/2 h-[64px]"
          />
          <h3 className="text-[#E0E0E0] text-center text-[17px] mt-[38px]">
            {transactionData.cardholder_name}
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
                <p className="text-[#E0E0E0] text-[15px]">2 345 786 ₴</p>
              </div>
            </div>
            <img src={grafic} alt="" className="mt-1" />
          </div>

          <div className="flex flex-col gap-3 pb-4 ">
            <div className="flex items-center gap-3 pl-[20px]">
              <img src={separate} alt="" className="flex-1 w-[22px] h-[50px]" />
              <p
                className="text-[16px] h-full flex justify-center flex-col  flex-13 text-[#E4E4E4]
              "
              >
                <div className="">Розділити витрату</div>

                <div className="h-[2px] mt-[11px]  bg-[#4B4B4B] w-full"></div>
              </p>
            </div>

            <div className="flex items-center gap-3 pl-[20px]">
              <img src={repeat} alt="" className="flex-1 w-[22px] h-[50px]" />
              <p
                className="text-[16px] h-full flex justify-center flex-col  flex-13 text-[#E4E4E4]
              "
              >
                <div className="">Повторити платiж</div>

                <div className="h-[2px] mt-[11px]  bg-[#4B4B4B] w-full"></div>
              </p>
            </div>
            <div className="flex items-center gap-3 pl-[20px]">
              <img src={save} alt="" className="flex-1 w-[22px] h-[50px]" />
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
              <img src={rewatch} alt="" className="flex-1 w-[22px] h-[50px]" />
              <p
                className="text-[16px] h-full flex justify-center flex-col  flex-13 text-[#E4E4E4]
              "
              >
                <div className="">Переглянути квитанцію</div>

                <div className="h-[2px] mt-[11px]  bg-[#4B4B4B] w-full"></div>
              </p>
            </div>
            <div className="flex items-center gap-3 pl-[20px]">
              <img src={always} alt="" className="flex-1 w-[22px] h-[50px]" />
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
                className="flex-1 w-[22px] h-[50px]"
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
