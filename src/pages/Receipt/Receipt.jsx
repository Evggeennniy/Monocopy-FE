import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Lottie from "lottie-react";

import fetchWithAuth from "../../util/fetchWithAuth";
import { API_URL } from "../../url";
import { useTheme } from "../../util/useTheme";

import qr_code from "../../assets/qr_code.png";
import sing from "../../assets/sing.png";
import mono_logo from "../../assets/mono_logo.jpg";
import loaderAnimation from "../../assets/animations/loader.json";

import NumberToUkrCurrency from "../../shared/NumberToUkrCurrency";

const RECEIPT_LOADER_FALLBACK_MS = 1800;

function formatKyivDate(utcString) {
  if (!utcString) return "—";

  const date = new Date(utcString);
  if (isNaN(date.getTime())) return "—";

  const formatter = new Intl.DateTimeFormat("uk-UA", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value || "00";

  return `${get("day")}.${get("month")}.${get("year")} ${get("hour")}:${get("minute")}`;
}

function ReceiptLoaderCard({ onComplete, theme }) {
  const completedRef = useRef(false);

  const completeOnce = () => {
    if (completedRef.current) return;

    completedRef.current = true;
    onComplete();
  };

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      completeOnce();
    }, RECEIPT_LOADER_FALLBACK_MS);

    return () => clearTimeout(fallbackTimer);
  }, []);

  const boxBg = theme === "dark" ? "bg-[rgba(255,255,255,0.08)]" : "bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]";

  return (
    <div className="flex items-center justify-center">
      <div className={`w-[92px] h-[92px] rounded-[18px] flex items-center justify-center ${boxBg}`}>
        <div className="w-[42px] h-[42px] flex items-center justify-center">
          <Lottie
            animationData={loaderAnimation}
            loop={false}
            autoplay={true}
            onComplete={completeOnce}
            style={{
              width: "100%",
              height: "100%",
            }}
            rendererSettings={{
              preserveAspectRatio: "xMidYMid meet",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Receipt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTransaction() {
      setLoading(true);

      try {
        const res = await fetchWithAuth(`${API_URL}/transactions/${id}/`);

        if (!res.ok) {
          throw new Error(`Ошибка: ${res.status}`);
        }

        const data = await res.json();
        setTransactionData(data);
      } catch (err) {
        setError(err.message || "Помилка завантаження");
      } finally {
        setLoading(false);
      }
    }

    fetchTransaction();
  }, [id]);

  const showReceipt = loaderFinished && !loading && !error && Boolean(transactionData);

  const formatted = formatKyivDate(transactionData?.timestamp);

  const date = transactionData?.timestamp ? new Date(transactionData.timestamp) : null;

  const pageBg = theme === "dark" ? "bg-[#1E1E1E]" : "bg-[#F4F4F4]";
  const headerText = theme === "dark" ? "text-white" : "text-[#111111]";
  const subText = theme === "dark" ? "text-[#767676]" : "text-[#8A8A8A]";
  const borderColor = theme === "dark" ? "border-[#333333]" : "border-[#E3E3E3]";

  return (
    <div className={`h-dvh flex flex-col justify-between ${pageBg}`}>
      <div className={`h-[90px] shrink-0 border-b ${borderColor} px-4`}>
        <div className="relative h-full flex items-center justify-center">
          <button onClick={() => navigate("/dashboard")} className="absolute left-0 top-1/2 -translate-y-1/2 p-1">
            <ArrowLeft className={`w-8 h-8 ${headerText}`} />
          </button>

          <div className={`text-[28px] font-semibold ${headerText}`}>Квитанція</div>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center px-2 py-4 overflow-auto">
        {showReceipt ? (
          <div className="relative bg-white text-[#111111] px-5 pt-5 pb-15 w-full max-w-[840px]">
            <header className="flex flex-col w-full sm:flex-row justify-between items-start sm:items-center gap-3 text-[#111111]">
              <div className="w-full">
                <div className="flex items-center justify-between w-full gap-2">
                  <img src={mono_logo} alt="" className="w-[80px]" />

                  <div className="text-[#111111]">
                    <div className="text-[5px] font-semibold text-[#111111]">Universal Bank</div>

                    <p className="text-[6px] text-gray-500">АТ "УНІВЕРСАЛ БАНК"</p>

                    <p className="text-[6px] text-gray-500">Телефон: 0 800 205 205</p>

                    <p className="text-[6px] text-gray-500">Адреса: 04082, м. Київ, вул. Автозаводська, 54/19</p>

                    <p className="text-[6px] text-gray-500">
                      Ліцензія НБУ на право надання банківських послуг №92 від 20.01.1994 р
                    </p>
                  </div>
                </div>
              </div>
            </header>

            <hr className="my-2 border-gray-200" />

            <main className="grid sm:grid-cols-2 gap-3 text-[#111111]">
              <div className="text-left">
                <h1 className="text-[11px] font-bold text-[#111111]">
                  Квитанція № R3GT-72NA-P8B9-64A7 від {date ? date.toLocaleDateString("uk-UA") : "—"}
                </h1>
              </div>

              <section className="rounded-md text-[#111111]">
                <h3 className="font-semibold text-[9px] mb-2 text-[#111111]">Відправник</h3>

                <div className="text-[9px] text-[#111111]">
                  <Row label="Ім'я" value="Романов Кирило Іванович" />
                  <Row label="Банк" value="Універсал Банк" />
                  <Row label="Код банку" value="322001" />
                  <Row label="Платіжна система" value="VISA" />
                  <Row label="Платіжний інструмент" value={transactionData?.from_card || ""} />
                </div>
              </section>

              <section className="rounded-md text-[#111111]">
                <h3 className="font-semibold text-[9px] mb-2 text-[#111111]">Одержувач</h3>

                <div className="text-[9px] text-[#111111]">
                  <Row label="Платіжна система" value="-" />
                  <Row label="Платіжний інструмент" value={transactionData?.to_card || ""} />
                </div>
              </section>

              <section className="sm:col-span-2 rounded-md text-[#111111]">
                <h3 className="font-semibold text-[9px] mb-2 text-[#111111]">Деталі транзакції</h3>

                <div className="text-[9px] text-[#111111]">
                  <Row label="Сума (грн)" value={<span>{transactionData?.amount}</span>} />

                  <Row label="Комісія (грн)" value="0.00" />

                  <Row label="Сума літерами" value={<NumberToUkrCurrency value={transactionData?.amount} />} />

                  <Row label="Код авторизації" value="347245" />

                  <Row label="Призначення платежу" value="Переказ особистих коштів" />

                  <Row label="Дата і час операції" value={formatted} />

                  <Row label="Ідентифікатор платіжного пристрою" value="MONODirectR" />
                </div>
              </section>
            </main>

            <footer className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 text-[#111111]">
              <div className="text-[#111111]">
                <p className="text-[9px] text-[#111111]">Заступник голови Правління</p>

                <p className="text-[9px] text-[#111111]">Акулиенко Ю.Ю.</p>
              </div>

              <div className="flex items-center justify-between w-full gap-4">
                <div className="flex items-center gap-4 bg-[#e5e6f8] border border-gray-200 rounded-lg p-3 shadow-sm text-[#111111]">
                  <div className="text-[#111111]">
                    <p className="text-[8px] font-semibold text-[#111111]">
                      Отримайте картку <br /> monobank за QR-кодом
                    </p>

                    <p className="text-[7px] text-[#111111]">Та 50 грн на рахунок кешбеку</p>
                  </div>

                  <img src={qr_code} className="w-[30px] h-[30px] bg-center bg-cover rounded-md" alt="" />
                </div>

                <div className="flex flex-col items-end">
                  <img src={sing} alt="підпис" className="w-[70px] h-auto object-contain" />
                </div>
              </div>
            </footer>
          </div>
        ) : error && loaderFinished && !loading ? (
          <div className="flex flex-col items-center justify-center text-center px-5">
            <p className={`text-[18px] font-medium ${headerText}`}>Помилка завантаження квитанції</p>

            <p className={`text-[14px] mt-2 ${subText}`}>{error}</p>
          </div>
        ) : (
          <ReceiptLoaderCard theme={theme} onComplete={() => setLoaderFinished(true)} />
        )}
      </div>

      <div className={`shrink-0 border-t ${borderColor} px-5 py-6`}>
        <button className="w-full mx-auto py-5 rounded-[28px] text-[18px] font-semibold bg-[#FB5255] text-white">
          Поділитися квитанцією
        </button>
      </div>
    </div>
  );
}

export default Receipt;

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-start gap-2 text-[#111111]">
      <div className="text-gray-500 w-1/2">{label}</div>
      <div className="text-left font-medium w-1/2 break-words text-[#111111]">{value}</div>
    </div>
  );
}
