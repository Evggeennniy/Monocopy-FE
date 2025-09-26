import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { contacts } from "../../widgets/dashboard/Contacts";
import { ArrowLeft } from "lucide-react";
import transfer_black_card from "../../assets/transfer_black_card.svg";

import grivna from "../../assets/grivna.svg";
export default function TransferPage() {
  const { id } = useParams();
  const user = contacts.find((c) => c.id === +id);
  const [value, setValue] = useState("");
  return (
    <div className="bg-[#1E1E1E] text-white min-h-screen p-4 flex flex-col">
      {/* Header */}
      <button className="mb-4">
        <ArrowLeft className="w-6 h-6 text-gray-300" />
      </button>
      <div className="flex relative items-center gap-3">
        <div className="">
          <img
            src={user?.image}
            alt={user?.name}
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="w-6 h-6 left-5 top-6 absolute flex-items rounded-full  bg-black flex items-center justify-center text-white pb-2 ">
          <p>m</p>
        </div>
        <div>
          <h2 className="font-semibold text-base text-[#E0E0E0] text-[17px">
            Алина Снегирь
          </h2>
          <div clear-both className="flex items-center gap-1">
            <img src={transfer_black_card} alt="" />
            <p className="text-[13px] text-[#91A2B1]">На чорну картку</p>
          </div>
        </div>
      </div>
      {/* Amount */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="bg-[#1E1E1E] px-3 py-1 rounded-full text-sm text-gray-300 mb-3">
          108 893.83 ₴
        </div>

        <div className="flex justify-center mt-6">
          <div className="flex items-center">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="0"
              className="text-5xl text-right font-semibold bg-transparent outline-none  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              style={{
                width: `${(value.length || 1) + 1}ch`, // растёт по длине числа
              }}
            />
            <img
              src={grivna}
              alt="₴"
              className="w-10 h-10 object-contain mt-1 "
            />
          </div>
        </div>

        <p className="text-gray-400">Немає комісії</p>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-3">
          <input
            type="text"
            placeholder="Коментар..."
            className="flex-1 bg-transparent border-b border-gray-700 text-white focus:outline-none text-sm pb-1"
          />
          <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
            🎁
          </button>
        </div>
        <button className="w-full py-3 bg-gray-800 rounded-lg text-lg font-semibold">
          Надіслати
        </button>
      </div>
    </div>
  );
}
