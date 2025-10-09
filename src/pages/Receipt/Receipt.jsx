import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchWithAuth from "../../util/fetchWithAuth";
import { API_URL } from "../../url";
import qr_code from "../../assets/qr_code.png";
import sing from "../../assets/sing.png";
import mono_logo from "../../assets/mono_logo.jpg";
import { ArrowLeft } from "lucide-react";
function formatKyivDate(utcString) {
  if (!utcString) return "—"; // если пусто

  const date = new Date(utcString);
  if (isNaN(date.getTime())) return "—"; // если дата невалидная

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

  return `${get("day")}.${get("month")}.${get("year")} ${get("hour")}:${get(
    "minute"
  )}`;
}
function Receipt(props) {
  const { id } = useParams();
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const formatted = formatKyivDate(transactionData?.timestamp);

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
  const date = new Date(transactionData?.timestamp);
  return (
    <div className="h-min-screen flex flex-col justify-between bg-[#1E1E1E] p-2">
      <div className="h-[90px] flex flex-col p-3 gap-1 border-b-1 border-[#333333]">
        <ArrowLeft color="#FFFFFF" onClick={() => navigate("/dashboard")} />
        <div className="pl-1">
          {" "}
          <div className="text-[#FFFFFF]">Квитанція </div>
          <div className="text-[#767676] text-[13px]">
            № R3GT-72NA-P8B9-64A7{" "}
          </div>
        </div>
      </div>
      <div className="  flex items-center justify-center ">
        <div className="relative bg-white   p-10 w-full max-w-[840px]">
          {/* Header */}
          <header className="flex flex-col w-full sm:flex-row justify-between items-start sm:items-center gap-3">
            {/* Brand */}
            <div className="w-full">
              <div className="flex items-center justify-between  w-full gap-3">
                {/* <div className="bg-gradient-to-r from-[#0D244E] to-[#091a35] text-white font-bold text-lg px-3 py-2 rounded-md">
                monobank
              </div> */}
                <img src={mono_logo} alt="" className="w-[80px]" />
                <div>
                  <div className="text-[5px] font-semibold">Universal Bank</div>
                  <p className="text-[6px] text-gray-500">
                    АТ "УНІВЕРСАЛ БАНК"
                  </p>
                  <p className="text-[6px] text-gray-500">
                    Телефон: 0 800 205 205
                  </p>
                  <p className="text-[6px] text-gray-500">
                    Адреса: 04082, м. Київ, вул. Автозаводська, 54/19
                  </p>
                  <p className="text-[6px] text-gray-500">
                    Ліцензія НБУ на право надання банківських послуг №92 від
                    20.01.1994 р
                  </p>
                </div>
              </div>
            </div>

            {/* Title */}
          </header>

          <hr className="my-6 border-gray-200" />

          {/* Main grid */}
          <main className="grid sm:grid-cols-2 gap-6">
            <div className="text-left">
              <h1 className="text-[11px] font-bold">
                Квитанція № R3GT-72NA-P8B9-64A7 від{" "}
                {date.toLocaleDateString("uk-UA")}
              </h1>
              {/* <p className="text-[12px] text-gray-500 mt-1">
              Роздрук документу — офіційна квитанція про платіж
            </p> */}
            </div>
            {/* Sender */}
            <section className=" rounded-md ">
              <h3 className="font-semibold text-[9px] mb-2">Відправник</h3>
              <div className="space-y-2 text-[9px]">
                <Row label="Ім'я" value="Романов Кирило Іванович" />
                <Row label="Банк" value="Універсал Банк" />
                <Row label="Код банку" value="322001" />
                <Row label="Платіжна система" value="VISA" />
                <Row
                  label="Платіжний інструмент"
                  value="UA613220010000026200340086222, 432334******5079"
                />
              </div>
            </section>

            {/* Recipient */}
            <section className=" rounded-md  ">
              <h3 className="font-semibold text-[9px] mb-2">Одержувач</h3>
              <div className="space-y-2 text-[9px]">
                <Row label="Платіжна система" value="-" />
                <Row
                  label="Платіжний інструмент"
                  value="UA613220010000026200340086222"
                />
              </div>
            </section>

            {/* Transaction details */}
            <section className="sm:col-span-2  rounded-md   ">
              <h3 className="font-semibold text-[9px] mb-2">
                Деталі транзакції
              </h3>
              <div className="space-y-2 text-[9px]">
                <Row
                  label="Сума (грн)"
                  value={<span className="">{transactionData?.amount}</span>}
                />
                <Row label="Комісія (грн)" value="0.00" />
                <Row
                  label="Сума літерами"
                  value="чотириста п'ятдесят тисяч гривень 00 копійок"
                />
                <Row label="Код авторизації" value="347245" />
                <Row
                  label="Призначення платежу"
                  value="Переказ особистих коштів"
                />
                <Row label="Дата і час операції" value={formatted} />
                <Row
                  label="Ідентифікатор платіжного пристрою"
                  value="MONODirectR"
                />
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div>
              <p className="text-[9px]">Заступник голови Правління</p>
              <p className=" text-[9px] font-semibold">Акулиенко Ю.Ю.</p>
            </div>

            <div className="flex items-center justify-between w-full gap-4">
              <div className=" flex items-center gap-4 bg-[#f3f6fb] border border-gray-200 rounded-lg p-3 shadow-sm">
                <div>
                  <p className="text-[8px] font-semibold">
                    Отримайте картку <br /> monobank за QR-кодом
                  </p>
                  <p className="text-[7px] ">Та 50 грн на рахунок кешбеку</p>
                </div>
                <img
                  src={qr_code}
                  className="w-[30px] h-[30px]  bg-center bg-cover rounded-md"
                />
              </div>

              <div className="flex flex-col items-end">
                <img
                  src={sing}
                  alt="підпис"
                  className="w-[70px] h-auto object-contain"
                />
              </div>
            </div>
          </footer>
        </div>
      </div>
      <button className="w-[90%] mx-auto text-[#FFFFFF] py-3 rounded-2xl bg-[#FB5255] mt-[50px] ">
        Поділитися
      </button>
    </div>
  );
}

export default Receipt;
function Row({ label, value }) {
  return (
    <div className="flex justify-between items-start gap-2">
      <div className="text-gray-500 w-1/2">{label}</div>
      <div className="text-left font-medium w-1/2 break-words">{value}</div>
    </div>
  );
}
