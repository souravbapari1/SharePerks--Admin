"use client";
import React from "react";
import TitleCard from "@/components/cards/TitleCard";
import Input from "@/components/Inputs/Input";
import { setMangeBrandValue, useManageBrand } from "@/redux/slice/brandSlice";
import { IoMdClose } from "react-icons/io";
import { RiAddLargeFill } from "react-icons/ri";
import TextEditor from "@/components/Inputs/TextEditor";

function CashBackRates() {
  const { dispatch, state } = useManageBrand(); // Ensure clear destructuring

  return (
    <TitleCard title="CashBack Rates">
      <TextEditor
        content={state.cashBackRates}
        onChange={(e) =>
          dispatch(setMangeBrandValue({ key: "cashBackRates", value: e }))
        }
      />
    </TitleCard>
  );
}

export default CashBackRates;
