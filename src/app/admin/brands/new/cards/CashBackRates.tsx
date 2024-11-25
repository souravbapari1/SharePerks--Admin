"use client";
import React from "react";
import TitleCard from "@/components/cards/TitleCard";
import Input from "@/components/Inputs/Input";
import {
  addCashbackRate,
  removeCashbackRate,
  setCashbackRateTitle,
  setCashbackRateValue,
  useManageBrand,
} from "@/redux/slice/brandSlice";
import { IoMdClose } from "react-icons/io";
import { RiAddLargeFill } from "react-icons/ri";

function CashBackRates() {
  const { dispatch, state } = useManageBrand(); // Ensure clear destructuring

  return (
    <TitleCard
      title="CashBack Rates"
      action={
        <div
          onClick={() => dispatch(addCashbackRate())} // Simplified handler
          className="w-8 h-8 bg-gray cursor-pointer text-black/50 flex justify-center items-center rounded-xl border border-graydark/10"
        >
          <RiAddLargeFill size={12} />
        </div>
      }
    >
      <div className="p-6">
        {state.cashBackRates.map((rate, index) => (
          <div
            className="flex justify-start items-center mt-3"
            key={`cashback-rate-${index}`} // Improved key for uniqueness
          >
            {/* Cashback Rate Value Input */}
            <Input
              className="w-40 rounded-none border-r-0"
              placeholder="Percent (%)"
              type="number"
              value={rate.value}
              onChange={(e) =>
                dispatch(
                  setCashbackRateValue({
                    index,
                    value: e.target.value,
                  })
                )
              }
            />

            {/* Cashback Rate Title Input */}
            <Input
              className="w-full rounded-none"
              placeholder="Text Description"
              value={rate.title}
              onChange={(e) =>
                dispatch(
                  setCashbackRateTitle({
                    index,
                    value: e.target.value,
                  })
                )
              }
            />

            {/* Remove Button */}
            {index !== 0 && (
              <div
                onClick={() => dispatch(removeCashbackRate(index))}
                className="w-10 h-full py-3 bg-red text-white cursor-pointer flex justify-center items-center dark:border-form-strokedark"
              >
                <IoMdClose />
              </div>
            )}
          </div>
        ))}
      </div>
    </TitleCard>
  );
}

export default CashBackRates;
