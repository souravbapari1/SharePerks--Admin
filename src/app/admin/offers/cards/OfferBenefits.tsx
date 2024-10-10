"use client";
import TitleCard from "@/components/cards/TitleCard";
import TextArea from "@/components/Inputs/TextArea";
import {
  addOfferBenefits,
  removeOfferBenefits,
  setOfferBenefits,
  useOfferRedux,
} from "@/redux/slice/offerSlice";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { RiAddLargeFill } from "react-icons/ri";

function OfferBenefits() {
  const { setValue, state, dispatch } = useOfferRedux();
  return (
    <TitleCard
      title="Offer Benefits"
      action={
        <div
          onClick={() => {
            dispatch(addOfferBenefits());
          }}
          className="w-8 h-8 bg-gray cursor-pointer text-black/50 flex justify-center items-center rounded-xl border border-graydark/10"
        >
          <RiAddLargeFill size={12} />
        </div>
      }
    >
      <div className="p-5">
        {state.offerKeyPoints.map((e, i) => {
          return (
            <div className="mb-2 relative" key={i + "sfdsfl"}>
              {i != 0 && (
                <div
                  onClick={() => {
                    dispatch(removeOfferBenefits(i));
                  }}
                  className="absolute -top-2 cursor-pointer -right-2 w-4 rounded-full h-4 text-xs text-white flex justify-center items-center bg-red"
                >
                  <IoCloseOutline />
                </div>
              )}
              <TextArea
                value={e}
                onChange={(e) =>
                  dispatch(
                    setOfferBenefits({ index: i, value: e.target.value })
                  )
                }
              />
            </div>
          );
        })}
      </div>
    </TitleCard>
  );
}

export default OfferBenefits;
