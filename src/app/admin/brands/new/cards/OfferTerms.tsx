"use client";
import React from "react";
import TitleCard from "@/components/cards/TitleCard";
import Input from "@/components/Inputs/Input";
import { setMangeBrandValue, useManageBrand } from "@/redux/slice/brandSlice";
import { IoMdClose } from "react-icons/io";
import { RiAddLargeFill } from "react-icons/ri";
import TextEditor from "@/components/Inputs/TextEditor";

function OfferTerms() {
  const { dispatch, state } = useManageBrand(); // Destructure correctly for clarity

  return (
    <>
      <TitleCard title="Offer Terms">
        <TextEditor
          content={state.offerTerms}
          onChange={(e) => {
            dispatch(setMangeBrandValue({ key: "offerTerms", value: e }));
          }}
        />
      </TitleCard>
    </>
  );
}

export default OfferTerms;
