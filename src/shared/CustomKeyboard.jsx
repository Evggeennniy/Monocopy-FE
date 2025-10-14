import { useEffect, useRef, useState } from "react";

export default function CustomKeyboard() {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  // Фокус на input при загрузке
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClick = (num) => {
    setValue((prev) => prev + num);
  };

  const handleBackspace = () => {
    setValue((prev) => prev.slice(0, -1));
  };

  return (
    <div className="bg-[#1E1E1E] min-h-screen flex flex-col items-center justify-center text-white p-4">
      <input
        type="text"
        ref={inputRef}
        value={value}
        readOnly
        placeholder="0"
        className="text-5xl text-right font-semibold bg-transparent outline-none mb-6 w-48 sm:w-64"
      />

      <div className="grid grid-cols-3 gap-2 w-48 sm:w-64">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, ",", 0].map((num, i) => (
          <button
            key={i}
            onClick={() => handleClick(num.toString())}
            className="bg-[#333333] py-4 text-xl rounded-lg hover:bg-[#444] transition"
          >
            {num}
          </button>
        ))}
        <button
          onClick={handleBackspace}
          className="bg-[#555555] py-4 text-xl rounded-lg hover:bg-[#666] transition col-span-3"
        >
          ⌫
        </button>
      </div>
    </div>
  );
}
