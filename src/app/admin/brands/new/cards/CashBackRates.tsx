"use client";
import TitleCard from "@/components/cards/TitleCard";
import Input from "@/components/Inputs/Input";
import {
  addCashbackRate,
  removeCashbackRate,
  setCashbackRateTitle,
  setCashbackRateValue,
  useManageBrand,
} from "@/redux/slice/brandSlice";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { RiAddLargeFill } from "react-icons/ri";

function CashBackRates() {
  const { dispatch, state } = useManageBrand();
  return (
    <TitleCard
      title="CashBack Rates"
      action={
        <div
          onClick={() => {
            dispatch(addCashbackRate());
          }}
          className="w-8 h-8 bg-gray cursor-pointer text-black/50 flex justify-center items-center rounded-xl border border-graydark/10"
        >
          <RiAddLargeFill size={12} />
        </div>
      }
    >
      <div className="p-6">
        {state.cashBackRates.map((e, i) => {
          return (
            <div
              className="flex justify-start items-center mt-3"
              key={e.title + i}
            >
              <Input
                className="w-40 rounded-none border-r-0"
                placeholder="Percent (%)"
                type="number"
                value={e.value}
                onChange={(e) =>
                  dispatch(
                    setCashbackRateValue({ index: i, value: e.target.value })
                  )
                }
              />
              <Input
                className="w-full rounded-none"
                placeholder="Text Description"
                value={e.title}
                onChange={(e) =>
                  dispatch(
                    setCashbackRateTitle({ index: i, value: e.target.value })
                  )
                }
              />
              {i != 0 && (
                <div
                  onClick={() => dispatch(removeCashbackRate(i))}
                  className="w-10 h-full   py-3 bg-red text-white cursor-pointer  flex justify-center items-center   dark:border-form-strokedark  "
                >
                  <IoMdClose />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </TitleCard>
  );
}

export default CashBackRates;
