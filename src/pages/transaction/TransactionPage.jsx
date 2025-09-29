import { ArrowLeft } from "lucide-react";
import edit from "../../assets/edit.svg";
import grivna from "../../assets/grivna.svg";
export default function TransactionPage() {
  return (
    <div className="bg-[#5F5FD9] min-h-screen  flex flex-col">
      <div className="bg-[#272727] mt-[80px] rounded-t-2xl flex flex-col gap-[15px]">
        <h3 className="text-[#E0E0E0] text-center text-[17px] mt-[38px]">
          Алина Снегирь
        </h3>
        <div className="flex gap-[25px] justify-center items-center">
          <div className="h-[1px] bg-[#4B4B4B] w-[18%]"></div>
          <button className="flex text-[#FFFFFF] rounded-full items-center text-[12px] gap-1 bg-[#3833A9] px-4">
            Переказ на картку
            <img src={edit} alt="w-[10px] h-[10px]" />
          </button>
          <div className="h-[1px] bg-[#4B4B4B] w-[18%]"></div>
        </div>
        <div className="text-[#91A2B1] text-[13px] text-center">
          26 вересня 2025, 23:59
        </div>
        <div className="text-[#FDFDFD] text-[47px] flex items-center justify-center">
          -1 200
          <span className="text-[35px] flex  mt-3 h-full ">
            .00 <img src={grivna} className="w-[28px] mt-4 h-[28px]" alt="" />
          </span>
        </div>
      </div>
    </div>
  );
}
