import { ArrowLeft } from "lucide-react";
import edit from "../../assets/edit.svg";
import grivna from "../../assets/grivna.svg";
import tag from "../../assets/tag.svg";
import rest from "../../assets/rest.svg";
import separate from "../../assets/separate.svg";

import repeat from "../../assets/repeat.svg";
import save from "../../assets/save.svg";
import rewatch from "../../assets/rewatch.svg";
import always from "../../assets/always.svg";
import rasrochka from "../../assets/rasrochka.svg";
import transaction from "../../assets/transaction.svg";
import { useNavigate } from "react-router-dom";
export default function TransactionPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#5F5FD9] relative h-[120px] flex flex-col">
      <button onClick={() => navigate("/")}>
        <ArrowLeft className="w-6 h-6 text-white absolute top-5 left-3" />
      </button>
      <div className="bg-[#272727] relative h-screen mt-[100px]  rounded-t-2xl flex flex-col gap-[15px]">
        <img
          src={transaction}
          alt=""
          className="absolute left-[50%]  transform -translate-x-1/2 -translate-y-1/2"
        />
        <h3 className="text-[#E0E0E0] text-center text-[17px] mt-[38px]">
          Алина Снегирь
        </h3>
        <div className="flex gap-[25px] justify-center items-center">
          <div className="h-[1px] bg-[#4B4B4B] w-[18%]"></div>
          <button className="flex text-[#FFFFFF] rounded-full items-center text-[12px] gap-1 bg-[#3833A9] px-4">
            <div className=""> Переказ на картку</div>

            <img src={edit} alt="" className="pt-1" />
          </button>
          <div className="h-[1px] bg-[#4B4B4B] w-[18%]"></div>
        </div>
        <div className="text-[#91A2B1] text-[13px] text-center">
          26 вересня 2025, 23:59
        </div>
        <div className="text-[#FDFDFD] text-[47px] flex items-center justify-center">
          -1 200
          <span className="text-[35px] flex  pt-[12px] h-full ">
            .00 <img src={grivna} className="w-[28px] mt-4 h-[28px]" alt="" />
          </span>
        </div>

        <div className="bg-[#1E1E1E] p-5 flex w-full flex-col gap-3">
          <div className="bg-[#272727] rounded-lg flex items-center p-[15px] w-full gap-3 text-[#767676] text-[13px]">
            <img src={tag} alt="" />
            Опис та #теги
          </div>
          <div className="bg-[#272727] rounded-lg flex items-center px-[15px] py-[13px] w-full gap-3 text-[#767676] text-[13px]">
            <img src={rest} alt="" />
            <div className="flex flex-col ">
              <p className="text-[#91A2B1] text-[13px]">Залишок</p>
              <p className="text-[#E0E0E0] text-[15px]">100 000.32 ₴</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col pb-4 ">
          <div className="flex items-center gap-3 pl-[20px]">
            <img src={separate} alt="" className="flex-1" />
            <p
              className="text-[16px] h-full flex justify-center flex-col  flex-13 text-[#E4E4E4]
              "
            >
              <div className=""> Розділити витрату</div>

              <div className="h-[2px] mt-[11px]  bg-[#4B4B4B] w-full"></div>
            </p>
          </div>
          <div className="flex items-center gap-3 pl-[20px]">
            <img src={repeat} alt="" className="flex-1" />
            <p
              className="text-[16px] h-full flex justify-center flex-col  flex-13 text-[#E4E4E4]
              "
            >
              <div className=""> Розділити витрату</div>

              <div className="h-[2px] mt-[11px]  bg-[#4B4B4B] w-full"></div>
            </p>
          </div>
          <div className="flex items-center gap-3 pl-[20px]">
            <img src={save} alt="" className="flex-1" />
            <p
              className="text-[16px] h-full flex justify-center flex-col  flex-13 text-[#E4E4E4]
              "
            >
              <div className=""> Розділити витрату</div>

              <div className="h-[2px] mt-[11px]  bg-[#4B4B4B] w-full"></div>
            </p>
          </div>
          <div className="flex items-center gap-3 pl-[20px]">
            <img src={rewatch} alt="" className="flex-1" />
            <p
              className="text-[16px] h-full flex justify-center flex-col  flex-13 text-[#E4E4E4]
              "
            >
              <div className=""> Розділити витрату</div>

              <div className="h-[2px] mt-[11px]  bg-[#4B4B4B] w-full"></div>
            </p>
          </div>
          <div className="flex items-center gap-3 pl-[20px]">
            <img src={always} alt="" className="flex-1" />
            <p
              className="text-[16px] h-full flex justify-center flex-col  flex-13 text-[#E4E4E4]
              "
            >
              <div className=""> Розділити витрату</div>

              <div className="h-[2px] mt-[11px]  bg-[#4B4B4B] w-full"></div>
            </p>
          </div>
          <div className="flex items-center gap-3 pl-[20px]">
            <img src={rasrochka} alt="" className="flex-1" />
            <p
              className="text-[16px] h-full flex justify-center flex-col  flex-13 text-[#E4E4E4]
              "
            >
              <div className=""> Розділити витрату</div>

              <div className="h-[2px] mt-[11px]  bg-[#4B4B4B] w-full"></div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
