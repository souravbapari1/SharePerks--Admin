"use client";
import { downloadExcel } from "@/helper/exceel";
import React from "react";
import { SiMicrosoftexcel } from "react-icons/si";

function Export({ error }: { error: any }) {
  return (
    <div
      onClick={() => {
        downloadExcel(error, "coupons-shareperks");
      }}
      className="bg-green-800  text-white py-1 flex justify-center items-center gap-2 rounded-lg text-sm px-4"
    >
      <SiMicrosoftexcel /> Export
    </div>
  );
}

export default Export;
