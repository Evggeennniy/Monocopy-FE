import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { contacts } from "../../widgets/dashboard/Contacts";
import { ArrowLeft, MessageCircle, Star } from "lucide-react";
import transfer_black_card from "../../assets/transfer_black_card.svg";
import comment from "../../assets/comment.svg";
import grivna from "../../assets/grivna.svg";
import prize from "../../assets/prize.svg";
export default function TransferPage() {
  const { id } = useParams();
  const user = contacts.find((c) => c.id === +id);
  const [value, setValue] = useState("");
  return (
    <div className="bg-[#1E1E1E] text-white min-h-screen  flex flex-col">
      {/* Header */}
      <div className="p-4">
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
      </div>

      {/* Amount */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="bg-[#1E1E1E] flex gap-1 items-center border border-[#323232] text-[#91A2B1] px-3 py-1 rounded-full text-[14px] text-gray-300 mb-3">
          <img src={transfer_black_card} alt="w-[18px] h-[14px]" />
          108 893.83
          <img src={grivna} alt="₴" className="w-3 h-3 object-contain " />
        </div>

        <div className="flex justify-center mt-6 ">
          <div className="flex items-center pr-3">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="0"
              className="text-5xl text-right font-semibold bg-transparent outline-none text-[#E1E1E1] 
               [appearance:textfield] 
               [&::-webkit-outer-spin-button]:appearance-none 
               [&::-webkit-inner-spin-button]:appearance-none
               placeholder-[#E1E1E1]"
              style={{
                width: `${(value.length || 1) + 1}ch`, // grows with number length
              }}
            />
            <img
              src={grivna}
              alt="₴"
              className="w-10 h-10 object-contain mt-1"
            />
          </div>
        </div>

        <p className="text-gray-400">Немає комісії</p>
      </div>

      {/* Footer */}
      <div className="border-t border-[#323232] ">
        <div className="p-4">
          <div className="flex  justify-between items-center gap-3 mb-3">
            <div className="flex items-center gap-3">
              <img src={comment} alt="w-[16px] h-[16px]" />
              <input
                type="text"
                placeholder="Коментар..."
                className="flex-1 bg-transparent text-[#91A2B1] focus:outline-none text-[13px] "
              />
            </div>

            <button className="w-8 h-8 rounded-full border border-[#323232] w-[56px] flex items-center justify-center">
              <img src={prize} alt="w-[16px] h-[16px]" />
            </button>
          </div>
          <div className="flex justify-between gap-[10px] ">
            <button className=" bg-[#2F2F2F] p-5 flex item-center  rounded-2xl  text-[#FFFFFF]">
              <Star className="w-5 h-5  inline-block " />
            </button>
            <button className="w-full py-3 bg-[#414141] rounded-2xl px-[110px] py-5 text-[#FFFFFF]  text-[14px] font-semibold">
              Надіслати
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
