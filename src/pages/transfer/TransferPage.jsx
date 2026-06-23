import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import Lottie from "lottie-react";

import transfer_black_card from "../../assets/transfer_black_card.svg";
import comment from "../../assets/comment.svg";
import Grivna from "../../assets/grivna.svg?react";
import prize from "../../assets/prize.svg";
import loaderAnimation from "../../assets/animations/loader.json";

import fetchWithAuth from "../../util/fetchWithAuth";
import { API_URL } from "../../url";

import { getBankIcon, getBankIconByName, getBankName } from "../../shared/getBankIcon";

import { formatCardNumber } from "../../util/formatCardNumber";
import setThemeColor from "../../util/setThemeColor";
import { useTheme } from "../../util/useTheme";

const SUBMIT_LOADER_FALLBACK_MS = 1600;

function SubmitLoaderOverlay({ theme, onComplete }) {
  const completedRef = useRef(false);

  const completeOnce = () => {
    if (completedRef.current) return;

    completedRef.current = true;
    onComplete();
  };

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      completeOnce();
    }, SUBMIT_LOADER_FALLBACK_MS);

    return () => clearTimeout(fallbackTimer);
  }, []);

  const boxClass = theme === "light" ? "bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]" : "bg-[rgba(255,255,255,0.08)]";

  return createPortal(
    <div className="fixed inset-0 z-[999999] pointer-events-auto flex items-center justify-center bg-transparent">
      <div className={`w-[92px] h-[92px] rounded-[18px] flex items-center justify-center ${boxClass}`}>
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
    </div>,
    document.body,
  );
}

const renderCardText = (text) => {
  if (!text) return null;
  return text.split(" ").map((group, i) => (
    <span key={i} style={{ marginLeft: i > 0 ? "5px" : 0, letterSpacing: 0 }}>
      {group.split("").map((char, j) =>
        char === "*" ? (
          <span key={j} style={{ position: "relative", top: "0px", fontSize: "0.9em", fontWeight: 800 }}>*</span>
        ) : char
      )}
    </span>
  ));
};

export default function TransferPage() {
  const { id } = useParams();

  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitRequestDone, setSubmitRequestDone] = useState(false);
  const [submitAnimationDone, setSubmitAnimationDone] = useState(false);
  const [error, setError] = useState(null);
  const [value, setValue] = useState("");
  const [cards, setCards] = useState([]);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [randomUser, setRandomUser] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { theme } = useTheme();

  const formatAmount = (inputValue) => {
    if (inputValue === "" || inputValue === null || inputValue === undefined) {
      return inputValue;
    }

    const normalizedValue = inputValue.replace(/,/g, ".");

    if (/^\d*\.?\d*$/.test(normalizedValue)) {
      const parts = normalizedValue.split(".");

      if (parts.length === 2 && parts[1].length > 2) {
        const roundedValue = Math.round(parseFloat(normalizedValue) * 100) / 100;

        if (parts[1].length > 0) {
          const [integerPart, decimalPart] = roundedValue.toString().split(".");

          return decimalPart ? `${integerPart}.${decimalPart.padEnd(2, "0")}` : `${integerPart}.00`;
        }

        return roundedValue.toString();
      }

      return inputValue;
    }

    return inputValue;
  };

  useEffect(() => {
    async function fetchCards() {
      try {
        const res = await fetchWithAuth(`${API_URL}/cards/`);

        if (!res.ok) {
          throw new Error(`Ошибка: ${res.status}`);
        }

        const data = await res.json();
        setCards(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchCards();
  }, []);

  useEffect(() => {
    async function fetchTransactionOrSetCard() {
      setLoading(true);

      try {
        if (id.length < 16) {
          const res = await fetchWithAuth(`${API_URL}/transactions/${id}/`);

          if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
          }

          const data = await res.json();

          setTransactionData(data);

          if (data.operation_type !== "deposit") {
            setValue(Math.abs(data.amount).toString());
          }
        } else {
          setTransactionData(null);

          const userData = localStorage.getItem("userData");

          if (userData) {
            const { name, avatar } = JSON.parse(userData);
            setRandomUser({ name, avatar });
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactionOrSetCard();
  }, [id]);

  useEffect(() => {
    inputRef.current?.focus();
    setShowKeyboard(true);
  }, []);

  useEffect(() => {
    const numericValue = parseFloat(value.replace(/,/g, "."));

    setCanSubmit(value !== "" && !isNaN(numericValue) && numericValue > 0);
  }, [value]);

  useEffect(() => {
    setThemeColor("var(--transfer-bg)");
    return () => {
      setThemeColor("var(--gradient-default-start)");
    };
  }, []);

  useEffect(() => {
    if (!submitLoading) return;
    if (!submitRequestDone) return;
    if (!submitAnimationDone) return;

    navigate("/payment-status");
  }, [submitLoading, submitRequestDone, submitAnimationDone, navigate]);

  const handleClick = (num) => {
    if (num === ",") {
      if (!value.includes(".") && !value.includes(",")) {
        if (value === "") {
          setValue("0.");
        } else {
          setValue((prev) => prev + ".");
        }
      }

      return;
    }

    const newValue = value + num;
    const formattedValue = formatAmount(newValue);
    setValue(formattedValue);
  };

  const handleBackspace = () => {
    const newValue = value.slice(0, -1);
    const formattedValue = formatAmount(newValue);
    setValue(formattedValue);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (submitLoading) return;

    const numericValue = parseFloat(value.replace(/,/g, "."));

    if (!value || isNaN(numericValue) || numericValue <= 0) {
      alert("Будь ласка, введіть суму переказу");
      return;
    }

    const roundedAmount = Math.round(numericValue * 100) / 100;

    let formData;

    if (transactionData?.operation_type === "deposit") {
      formData = {
        cardholder_name: transactionData.cardholder_name,
        from_card: cards[0]?.card_number,
        to_card: transactionData.cardholder_name ? transactionData.cardholder_name : "",
        amount: roundedAmount,
        comment: commentValue,
        image_withdraw: transactionData.bank === "mono" ? transactionData.image_deposit : "",
        operation_type: "withdraw",
        bank: transactionData.bank,
      };
    } else if (transactionData?.operation_type === "withdraw") {
      formData = {
        cardholder_name: transactionData.cardholder_name,
        from_card: cards[0]?.card_number,
        to_card: transactionData.to_card ? transactionData.to_card : "",
        image_withdraw: transactionData.image_withdraw,
        amount: roundedAmount,
        comment: commentValue,
        bank: transactionData.bank ? transactionData.bank : getBankName(transactionData.to_card),
      };
    } else {
      formData = {
        cardholder_name: randomUser.name,
        from_card: cards[0]?.card_number,
        to_card: id.replace(/\s+/g, "").trim(),
        amount: roundedAmount,
        comment: commentValue,
        image_withdraw: randomUser.avatar,
        bank: getBankName(id.replace(/\s+/g, "").trim()),
      };
    }

    setSubmitLoading(true);
    setSubmitRequestDone(false);
    setSubmitAnimationDone(false);

    try {
      const res = await fetchWithAuth(API_URL + "/transactions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();

        console.error("Server error response:", errorData);

        throw new Error(`Ошибка: ${res.status} - ${JSON.stringify(errorData)}`);
      }

      await res.json();

      localStorage.setItem("formData", JSON.stringify(formData));

      setSubmitRequestDone(true);
    } catch (err) {
      console.error("Ошибка при отправке:", err);

      setSubmitLoading(false);
      setSubmitRequestDone(false);
      setSubmitAnimationDone(false);

      alert("Помилка при відправці. Спробуйте ще раз.");
    }
  };

  if (loading) {
    return <p className="text-[var(--transfer-text-primary)]">Loading...</p>;
  }

  if (error) {
    return <p className="text-[var(--transfer-error)]">{error}</p>;
  }

  return (
    <div
      className={`bg-[var(--transfer-bg)] text-[var(--transfer-text-primary)] h-screen flex flex-col pb-[40px] justify-between`}
    >
      {submitLoading && <SubmitLoaderOverlay theme={theme} onComplete={() => setSubmitAnimationDone(true)} />}

      {/* Header */}
      <div className="p-4 sm:p-6">
        <button onClick={() => navigate("/dashboard")} className="mb-4 sm:mb-6 hover:opacity-80 transition">
          <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--transfer-text-gray-300)]" />
        </button>

        <div className="flex relative items-center gap-3 sm:gap-4">
          <div className="w-[45px] h-[45px] relative rounded-full flex items-center justify-center text-[var(--transfer-text-primary)] text-lg bg-[var(--transfer-avatar-bg)]">
            {!transactionData && id && randomUser.avatar && (
              <img src={randomUser.avatar} className="w-[45px] h-[45px] rounded-full" alt="" />
            )}

            {transactionData?.image_withdraw ? (
              <img src={transactionData?.image_withdraw} className="w-[45px] h-[45px] rounded-full" alt="" />
            ) : transactionData?.image_deposit ? (
              <img src={transactionData?.image_deposit} className="w-[45px] h-[45px] rounded-full" alt="" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
              </svg>
            )}

            {(() => {
              let card;

              if (transactionData?.operation_type === "deposit") {
                return (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {getBankIconByName(transactionData?.bank)}
                  </div>
                );
              }

              if (transactionData?.operation_type === "withdraw") {
                return (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {getBankIconByName(transactionData?.bank)}
                  </div>
                );
              }

              card = id;

              return <div className="absolute inset-0 flex items-center justify-center">{getBankIcon(card)}</div>;
            })()}
          </div>

          <div>
            <h2
              className={`font-extrabold text-[19px] sm:text-lg ${
                theme === "light" ? "text-black" : "text-white"
              }`}
              style={{ fontFamily: "Inter, sans-serif", wordSpacing: "normal" }}
            >
              {(() => {
                if (transactionData?.operation_type === "deposit") {
                  return <>{renderCardText(formatCardNumber(transactionData?.cardholder_name))}</>;
                }

                if (transactionData?.operation_type === "withdraw") {
                  return <>{renderCardText(formatCardNumber(transactionData?.cardholder_name))}</>;
                }

                return <>{renderCardText(formatCardNumber(randomUser.name))}</>;
              })()}
            </h2>

            {id && ["4441", "5375", "4899", "4042"].includes(id.replace(/\s+/g, "").slice(0, 4)) && (
              <div className="flex items-center gap-1 sm:gap-2">
                <img src={transfer_black_card} alt="" className="w-[14px] sm:w-[18px]" />

                <p className="text-[12px] sm:text-[14px] text-[var(--transfer-text-tertiary)]">На чорну картку</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Amount */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex gap-1 items-center border border-[var(--transfer-border)] text-[var(--transfer-text-amount)] px-3 py-1 sm:px-4 sm:py-2 rounded-full text-[14px] mb-3 sm:mb-4">
          <img src={transfer_black_card} alt="" className="w-[18px] h-[14px] sm:w-[20px] sm:h-[16px]" />

          <p className="text-sm sm:text-base">{cards[0]?.balance}</p>

          <Grivna className="w-3 h-3 text-[var(--transfer-text-primary)] object-contain" />
        </div>

        <div className="flex justify-center mt-4 sm:mt-6">
          <div className="flex items-center pr-2 sm:pr-3">
            <input
              type="text"
              readOnly
              ref={inputRef}
              value={value}
              placeholder="0"
              className="text-4xl sm:text-5xl fira-sans-semibold md:text-6xl text-right font-semibold bg-transparent outline-none text-[var(--transfer-text-amount)]
               [appearance:textfield]
               [&::-webkit-outer-spin-button]:appearance-none
               [&::-webkit-inner-spin-button]:appearance-none
               placeholder-[var(--transfer-text-amount)]"
              style={{
                width: `${Math.max(value.length || 1, 1) + 1}ch`,
              }}
            />

            <Grivna className="w-8 h-8 text-[var(--transfer-text-primary)] sm:w-10 sm:h-10 object-contain" />
          </div>
        </div>

        <p className="text-[var(--transfer-text-gray-400)] text-[13px] sm:text-[14px] mt-2">Немає комісії</p>
      </div>

      {/* Footer */}
      <div>
        <div className="border-t border-[var(--transfer-border)] sm:mt-8">
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center gap-3 mb-3 sm:mb-5">
              <div className="flex items-center gap-3 sm:gap-4 flex-1">
                <img src={comment} alt="" className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />

                <input
                  type="text"
                  placeholder="Коментар..."
                  className="flex-1 w-[100px] bg-transparent text-[var(--transfer-text-tertiary)] focus:outline-none text-[13px] sm:text-[14px]"
                  onChange={(e) => setCommentValue(e.target.value)}
                  onFocus={() => setShowKeyboard(false)}
                  onBlur={() => setShowKeyboard(true)}
                />
              </div>

              <button className="w-[46px] shrink-0 sm:w-[56px] h-[26px] sm:h-[56px] rounded-full border border-[var(--transfer-border)] flex items-center justify-center hover:bg-[var(--transfer-button-hover)] transition">
                <img src={prize} alt="" className="w-[16px] h-[16px]" />
              </button>
            </div>

            <div className="flex justify-between gap-3 sm:gap-4">
              <div
                className={`${
                  canSubmit
                    ? "p-[1px] bg-gradient-to-r from-[var(--transfer-gradient-start)] to-[var(--transfer-gradient-end)] rounded-2xl"
                    : "p-[1px]"
                }`}
              >
                <button className="bg-[var(--transfer-button-bg)] p-4 sm:p-5 rounded-2xl text-[var(--transfer-text-primary)] hover:bg-[var(--transfer-button-hover)] transition w-full h-full">
                  <Star className="w-5 h-5 inline-block" />
                </button>
              </div>

              <button
                onClick={submit}
                disabled={!canSubmit || submitLoading}
                className={`${
                  canSubmit && !submitLoading
                    ? "bg-[var(--transfer-button-active)] cursor-pointer"
                    : theme === "light"
                      ? "bg-[#E5E5EA] cursor-not-allowed opacity-100"
                      : "bg-[#2F3037] cursor-not-allowed opacity-100"
                } w-full py-3 sm:py-4 rounded-2xl ${
                  canSubmit && !submitLoading
                    ? theme === "light"
                      ? "text-[var(--gray-2)]"
                      : "text-[var(--balance)]"
                    : theme === "light"
                      ? "text-[#8E8E93]"
                      : "text-[#8E8E93]"
                } text-[18px] font-semibold transition`}
              >
                Надіслати
              </button>
            </div>
          </div>
        </div>

        <div
          className={`bg-[var(--transfer-keyboard-bg)] flex flex-col items-center justify-center text-[var(--transfer-text-primary)] 
    transform transition-transform
    ${showKeyboard ? "opacity-100 h-auto" : "h-[200px] opacity-0"}`}
        >
          <div className="grid grid-cols-6 gap-1 bg-[var(--transfer-keyboard-top-bg)] w-full">
            {["x", "/", "+", "-", "%", "="].map((op, i) => (
              <button
                key={i}
                disabled={true}
                onClick={() => handleClick(op)}
                className="py-3 text-xl rounded-lg transition text-[var(--transfer-text-primary)]"
              >
                {op}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 pt-2 pb-15 px-1 gap-2 w-full">
            {[
              { label: "1", sub: "" },
              { label: "2", sub: "ABC" },
              { label: "3", sub: "DEF" },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => handleClick(item.label)}
                className="bg-[var(--transfer-keyboard-btn-bg)] py-[3px] text-xl rounded-lg hover:bg-[var(--transfer-keyboard-btn-hover)] transition flex flex-col items-center text-[var(--transfer-text-primary)]"
              >
                <span>{item.label}</span>

                <span className="text-[10px] text-[var(--transfer-text-tertiary)]">{item.sub}</span>
              </button>
            ))}

            {[
              { label: "4", sub: "GHI" },
              { label: "5", sub: "JKL" },
              { label: "6", sub: "MNO" },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => handleClick(item.label)}
                className="bg-[var(--transfer-keyboard-btn-bg)] py-[3px] text-xl rounded-lg hover:bg-[var(--transfer-keyboard-btn-hover)] transition flex flex-col items-center text-[var(--transfer-text-primary)]"
              >
                <span>{item.label}</span>

                <span className="text-[10px] text-[var(--transfer-text-tertiary)]">{item.sub}</span>
              </button>
            ))}

            {[
              { label: "7", sub: "PQRS" },
              { label: "8", sub: "TUV" },
              { label: "9", sub: "WXYZ" },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => handleClick(item.label)}
                className="bg-[var(--transfer-keyboard-btn-bg)] py-[3px] text-xl rounded-lg hover:bg-[var(--transfer-keyboard-btn-hover)] transition flex flex-col items-center text-[var(--transfer-text-primary)]"
              >
                <span>{item.label}</span>

                <span className="text-[10px] text-[var(--transfer-text-tertiary)]">{item.sub}</span>
              </button>
            ))}

            <button
              onClick={() => handleClick(",")}
              className="py-1 text-xl rounded-lg transition text-[var(--transfer-text-primary)]"
            >
              ,
            </button>

            <button
              onClick={() => handleClick("0")}
              className="bg-[var(--transfer-keyboard-btn-bg)] py-[6px] text-xl rounded-lg hover:bg-[var(--transfer-keyboard-btn-hover)] transition text-[var(--transfer-text-primary)]"
            >
              0
            </button>

            <button
              onClick={handleBackspace}
              className="py-1 text-xl rounded-lg hover:bg-[var(--transfer-keyboard-backspace-hover)] transition text-[var(--transfer-text-primary)]"
            >
              ⌫
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
