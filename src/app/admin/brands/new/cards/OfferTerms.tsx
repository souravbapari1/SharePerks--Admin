"use client";
import React from "react";
import TitleCard from "@/components/cards/TitleCard";
import Input from "@/components/Inputs/Input";
import {
  addMoreOfferTerm,
  addOfferTerm,
  removeOfferTerm,
  removeOfferTermContent,
  setOfferTermContent,
  setOfferTermTitle,
  useManageBrand,
} from "@/redux/slice/brandSlice";
import { IoMdClose } from "react-icons/io";
import { RiAddLargeFill } from "react-icons/ri";

function OfferTerms() {
  const { dispatch, state } = useManageBrand(); // Destructure correctly for clarity

  return (
    <>
      {state.offerTerms.map((offerTerm, offerIndex) => (
        <TitleCard
          title="Offer Terms"
          key={`offer-term-${offerIndex}`} // Ensure unique keys using index
          action={
            <div
              onClick={() =>
                offerIndex === 0
                  ? dispatch(addOfferTerm())
                  : dispatch(removeOfferTerm(offerIndex))
              }
              className={`w-8 h-8 ${
                offerIndex === 0 ? "bg-gray text-black/50" : "bg-red text-white"
              } cursor-pointer flex justify-center items-center rounded-xl border border-graydark/10`}
            >
              <RiAddLargeFill
                size={12}
                className={offerIndex === 0 ? "" : "rotate-45"}
              />
            </div>
          }
        >
          <div className="p-6">
            <div className="flex justify-start items-center">
              <Input
                placeholder="Title Of Offer Terms"
                className="rounded-none"
                value={offerTerm.title}
                onChange={(e) =>
                  dispatch(
                    setOfferTermTitle({
                      index: offerIndex,
                      value: e.target.value, // Fixed incorrect event handling
                    })
                  )
                }
              />
            </div>
            <div className="pl-5">
              {offerTerm.content.map((contentItem, contentIndex) => (
                <div
                  className="flex justify-center items-center"
                  key={`content-${offerIndex}-${contentIndex}`} // Improved unique key
                >
                  <Input
                    placeholder="Content Of Offer Terms"
                    className="rounded-none border-t-0"
                    value={contentItem}
                    onChange={(e) =>
                      dispatch(
                        setOfferTermContent({
                          index: offerIndex,
                          contentIndex: contentIndex, // Fixed incorrect contentIndex usage
                          value: e.target.value, // Fixed incorrect event target
                        })
                      )
                    }
                  />
                  {contentIndex !== 0 && (
                    <div
                      onClick={() =>
                        dispatch(
                          removeOfferTermContent({
                            contentIndex,
                            index: offerIndex,
                          })
                        )
                      }
                      className="w-10 h-full py-3 bg-red text-white cursor-pointer flex justify-center items-center dark:border-form-strokedark"
                    >
                      <IoMdClose />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div
              onClick={() => dispatch(addMoreOfferTerm(offerIndex))}
              className="w-8 h-8 float-right mb-3 mr-10 border border-t-0 cursor-pointer text-black/50 flex justify-center items-center border-graydark/10"
            >
              <RiAddLargeFill size={12} />
            </div>
          </div>
        </TitleCard>
      ))}
    </>
  );
}

export default OfferTerms;
