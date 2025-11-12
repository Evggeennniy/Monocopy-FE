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
import mono from "../../assets/mono.jpg";
import massage_icon from "../../assets/message-icon.svg";
import response_icon from "../../assets/response-icon.png";
import return_icon from "../../assets/return-icon.svg";
import question_icon from "../../assets/question-icon.svg";

import { formatCardNumber } from "../../util/formatCardNumber";
import { getBankIconByName } from "../../shared/getBankIcon";
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

  // Convert to Kyiv time
  const kyivDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Europe/Kyiv" })
  );

  const day = kyivDate.getDate();
  const month = months[kyivDate.getMonth()];
  const year = kyivDate.getFullYear();
  const hours = String(kyivDate.getHours()).padStart(2, "0");
  const minutes = String(kyivDate.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}

export default function TransactionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bankName, setBankName] = useState();
  useEffect(() => {
    async function fetchTransaction() {
      setLoading(true);
      try {
        const res = await fetchWithAuth(`${API_URL}/transactions/${id}/`);
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
        const data = await res.json();
        setTransactionData(data);
        setBankName(data.bank);
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
      {bankName !== "mono" && (
        <div className=" relative bg-[#5F5FD9] ">
          <div className="  h-[120px] flex flex-col">
            <button onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-6 h-6 text-white absolute top-5 left-3" />
            </button>
          </div>
        </div>
      )}
      {bankName === "mono" && (
        <div className="relative">
          {/* Размытый фон */}
          <img
            src={
              transactionData.image_deposit || transactionData.image_withdraw
            }
            alt="mono background"
            className="absolute inset-0 w-full h-full object-cover blur-sm brightness-75"
          />
          {/* Контент сверху */}
          <div className="relative h-[120px] flex flex-col">
            <button onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-6 h-6 text-white absolute top-5 left-3" />
            </button>
          </div>
        </div>
      )}
      {transactionData.operation_type === "deposit" && (
        <>
          <div className="bg-[#272727] relative -top-3 w-full z-10 rounded-t-2xl flex flex-col gap-[15px] min-h-screen">
            <div className="relative w-[80px] h-[40px] mx-auto">
              <div
                style={{ background: "#293B60" }}
                className="w-[64px]  absolute left-[50%] flex justify-center items-center rounded-full  transform -translate-x-1/2 -translate-y-1/2 h-[64px]"
              >
                {transactionData.image_deposit ? (
                  <img
                    src={transactionData.image_deposit}
                    className="w-[64px] h-[64px]  rounded-full "
                    alt=""
                  />
                ) : (
                  <img src={download} className="w-9" />
                )}
              </div>

              <>
                <div className=" rounded-full  flex justify-center items-center">
                  {getBankIconByName(
                    transactionData.bank,
                    "w-5 h-5 -translate-x-1/2 left-16 top-3 rounded-full absolute"
                  )}
                </div>
              </>
            </div>
            <h3 className="text-[#E0E0E0] text-center text-[17px]">
              {transactionData.cardholder_name}
            </h3>
            <div className="flex gap-[25px] justify-center items-center">
              <div className="h-[1px] bg-[#4B4B4B] w-[18%]"></div>
              <button className="flex text-[#FFFFFF] rounded-full items-center text-[12px] gap-1 py-[2px] bg-[#3833A9] px-4">
                <div className="">Поповнення картки</div>
              </button>
              <div className="h-[1px] bg-[#4B4B4B] w-[18%]"></div>
            </div>
            <div className="text-[#91A2B1] text-[13px] text-center">
              {formatUADate(transactionData.timestamp)}
            </div>
            <div className="text-[#FDFDFD] text-[47px] flex items-center justify-center">
              {Math.abs(transactionData.amount).toLocaleString("ru-RU")}
              <span className="text-[35px] flex  pt-[12px] h-full ">
                .00{" "}
                <img
                  src={grivna}
                  className="w-[28px] mt-[14px] h-[28px]"
                  alt=""
                />
              </span>
            </div>
            {transactionData.comment && (
              <div className="mx-auto flex flex-col items-center">
                {/* Верхний блок */}
                <div className="flex gap-2 mb-2 w-[90%] px-2 relative left-[-24px]">
                  <img src={massage_icon} className="w-7 h-7 shrink-0" />
                  <div className="bg-[#59677b] w-full p-2 rounded-xl text-[#FDFDFD]">
                    {transactionData.comment}
                  </div>
                </div>

                {/* Нижний блок */}
                <div className="w-[70%] h-[50px] mx-auto">
                  <img
                    className="h-full w-full object-contain"
                    src={response_icon}
                    alt="response"
                  />
                </div>
              </div>
            )}
            <div className="bg-[#1E1E1E] px-5 pb-5 pt-4 flex w-full flex-col ">
              {!["4441", "4899", "4042"].includes(
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
            </div>

            <div className="flex flex-col gap-3 pb-4 ">
              <div
                onClick={() => navigate(`/transfer/${transactionData.id}`)}
                className="flex items-center gap-4 pl-[20px] "
              >
                <img
                  src={return_icon}
                  alt=""
                  className="flex-1 w-[25px] h-[47px]"
                />
                <p
                  className="text-[16px] h-full flex justify-center flex-col  flex-13 text-[#E4E4E4]
              "
                >
                  <div className="">Відповісти платижем</div>

                  <div className="h-[2px] mt-[11px]  bg-[#4B4B4B] w-full"></div>
                </p>
              </div>
              <div className="flex items-center gap-3 h-[47px]  pl-[10px]">
                <img
                  src={question_icon}
                  alt=""
                  className="flex-1 w-[43px] h-[43px] object-cover "
                />
                <p
                  className="text-[16px] h-full flex justify-center flex-col  flex-13 text-[#E4E4E4]
              "
                >
                  <div className="">Поставити запитання</div>

                  <div className="h-[2px] mt-[11px]  bg-[#4B4B4B] w-full"></div>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      {transactionData.operation_type !== "deposit" && (
        <>
          <div className="bg-[#272727] relative -top-3 w-full z-10 rounded-t-2xl flex flex-col gap-[15px] min-h-screen">
            <div className="relative w-[80px] h-[40px] mx-auto">
              {transactionData.image_withdraw ? (
                <img
                  src={transactionData.image_withdraw}
                  alt=""
                  className="absolute left-[50%] rounded-full  transform -translate-x-1/2 -translate-y-1/2 h-[64px]"
                />
              ) : (
                <img
                  src={transaction}
                  alt=""
                  className="absolute left-[50%]  transform -translate-x-1/2 -translate-y-1/2 h-[64px]"
                />
              )}

              <>
                <div className=" rounded-full  flex justify-center items-center">
                  {/* <img src={transaction} alt="" /> */}
                  {getBankIconByName(
                    transactionData.bank,
                    "w-5 h-5 -translate-x-1/2 left-16 top-3 rounded-full absolute"
                  )}
                </div>
              </>
            </div>

            <h3 className="text-[#E0E0E0] text-center text-[17px]">
              {formatCardNumber(transactionData.cardholder_name)}
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
              {`-${Math.abs(transactionData.amount).toLocaleString("ru-RU")}`}
              <span className="text-[35px] flex  pt-[12px] h-full ">
                .00{" "}
                <img
                  src={grivna}
                  className="w-[28px] mt-[14px] h-[28px]"
                  alt=""
                />
              </span>
            </div>
            {transactionData.comment && (
              <div className="w-[75%] mx-auto items-center flex flex-col">
                <div className="flex justify-center w-full gap-2 mb-2">
                  <img src={massage_icon} className="w-7 h-7" />
                  <div className="bg-[#59677b] w-full p-2 rounded-xl text-[#FDFDFD]">
                    {transactionData.comment}
                  </div>
                </div>
                <div className="w-[80%] h-[50px] ml-auto">
                  <img
                    className="h-full w-full object-contain"
                    src={response_icon}
                  ></img>
                </div>
              </div>
            )}
            <div className="bg-[#1E1E1E] px-5 pb-5 pt-4 flex w-full flex-col ">
              {/* {!["4441"].includes(
                transactionData.to_card.replace(/\s+/g, "").slice(0, 4)
              ) && <img src={keshbek} alt="" />} */}
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
              <div className="flex items-center h-[60px] gap-3 pl-[20px]">
                <img
                  src={separate}
                  alt=""
                  className="flex-1 w-[43px] h-[43px] object-cover"
                />
                <p
                  className="text-[16px] h-full flex justify-center flex-col  flex-13 text-[#E4E4E4]
              "
                >
                  <div className="">Розділити витрату</div>

                  <div className="h-[2px] mt-[11px]  bg-[#4B4B4B] w-full"></div>
                </p>
              </div>

              <div
                onClick={() => navigate(`/transfer/${transactionData.id}`)}
                className="flex items-center h-[47px] gap-3 pl-[20px]"
              >
                <img
                  src={repeat}
                  alt=""
                  className="flex-1 w-[43px] h-[43px] object-cover"
                />
                <p
                  className="text-[16px] h-full flex justify-center flex-col  flex-13 text-[#E4E4E4]
              "
                >
                  <div className="">Повторити платiж</div>

                  <div className="h-[2px] mt-[11px]  bg-[#4B4B4B] w-full"></div>
                </p>
              </div>
              <div className="flex items-center h-[47px] gap-3 pl-[20px]">
                <img
                  src={save}
                  alt=""
                  className="flex-1 w-[43px] h-[43px] object-cover"
                />
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
                className="flex items-center h-[47px] gap-3 pl-[20px]"
              >
                <img
                  src={rewatch}
                  alt=""
                  className="flex-1 w-[43px] h-[43px] object-cover"
                />
                <p
                  className="text-[16px] h-full flex justify-center flex-col  flex-13 text-[#E4E4E4]
              "
                >
                  <div className="">Переглянути квитанцію</div>

                  <div className="h-[2px] mt-[11px]  bg-[#4B4B4B] w-full"></div>
                </p>
              </div>
              <div className="flex items-center h-[47px] gap-3 pl-[20px]">
                <img
                  src={always}
                  alt=""
                  className="flex-1 w-[43px] h-[43px] object-cover"
                />
                <p
                  className="text-[16px] h-full flex justify-center flex-col  flex-13 text-[#E4E4E4]
              "
                >
                  <div className="">Зробити регулярним</div>

                  <div className="h-[2px] mt-[11px]  bg-[#4B4B4B] w-full"></div>
                </p>
              </div>
              <div className="flex items-center h-[47px] gap-3 pl-[20px]">
                <img
                  src={rasrochka}
                  alt=""
                  className="flex-1 w-[43px] h-[43px] object-cover"
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
        </>
      )}
    </>
  );
}
