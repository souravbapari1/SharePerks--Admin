"use client";
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
import React from "react";
import { IoMdClose } from "react-icons/io";
import { RiAddLargeFill } from "react-icons/ri";

function OfferTerms() {
  const { dispatch, state } = useManageBrand();
  return (
    <>
      {state.offerTerms.map((e, i) => {
        return (
          <>
            <TitleCard
              title="Offer Terms"
              key={e.title + i}
              action={
                <>
                  {i == 0 ? (
                    <div
                      onClick={() => dispatch(addOfferTerm())}
                      className="w-8 h-8 bg-gray cursor-pointer text-black/50 flex justify-center items-center rounded-xl border border-graydark/10"
                    >
                      <RiAddLargeFill size={12} />
                    </div>
                  ) : (
                    <div
                      onClick={() => dispatch(removeOfferTerm(i))}
                      className="w-8 h-8 bg-red text-white cursor-pointer text-black/50 flex justify-center items-center rounded-xl border border-graydark/10"
                    >
                      <RiAddLargeFill size={12} className="rotate-45" />
                    </div>
                  )}
                </>
              }
            >
              <div className="p-6">
                <div className="flex justify-start items-center">
                  <Input
                    placeholder="Title Of Offer Terms"
                    className="rounded-none"
                    value={e.title}
                    onChange={(e) =>
                      dispatch(
                        setOfferTermTitle({ index: i, value: e.target.value })
                      )
                    }
                  />
                </div>
                <div className="pl-5">
                  {e.content.map((c, x) => {
                    return (
                      <div
                        className="flex justify-center items-center"
                        key={"exdsdfs" + i}
                      >
                        <Input
                          key={"content-" + x}
                          placeholder="Content Of Offer Terms"
                          className="rounded-none border-t-0"
                          value={c}
                          onChange={(v) =>
                            dispatch(
                              setOfferTermContent({
                                index: i,
                                contentIndex: i,
                                value: v.target.value,
                              })
                            )
                          }
                        />
                        {x != 0 && (
                          <div
                            onClick={() =>
                              dispatch(
                                removeOfferTermContent({
                                  contentIndex: x,
                                  index: i,
                                })
                              )
                            }
                            className="w-10 h-full    py-3 bg-red text-white cursor-pointer  flex justify-center items-center   dark:border-form-strokedark  "
                          >
                            <IoMdClose />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div
                  onClick={() => dispatch(addMoreOfferTerm(i))}
                  className="w-8 h-8 float-right  mb-3 mr-10 border border-t-0 cursor-pointer text-black/50 flex justify-center items-center    border-graydark/10"
                >
                  <RiAddLargeFill size={12} />
                </div>
              </div>
            </TitleCard>
          </>
        );
      })}
    </>
  );
}

export default OfferTerms;
