import TitleCard from "@/components/cards/TitleCard";
import Input from "@/components/Inputs/Input";
import Switcher from "@/components/Inputs/Switcher";
import TextArea from "@/components/Inputs/TextArea";
import { CategoryType } from "@/interface/categoty";
import { useManageBrand } from "@/redux/slice/brandSlice";
import React from "react";

function BrandBasicInfo({ onSave }: { onSave: Function }) {
  const { setValue, state } = useManageBrand();
  return (
    <TitleCard
      title="Basic Info"
      action={
        <div className="flex items-center justify-center gap-6 ">
          <Switcher
            enabled={state.isActive}
            setEnabled={(e) => setValue("isActive", e)}
          />
          <button
            onClick={() => onSave()}
            className="py-2 w-auto bg-primary disabled:bg-slate-500 disabled:opacity-20 px-4 text-white rounded-lg text-xs font-bold"
          >
            Save Brand
          </button>
        </div>
      }
    >
      <div className="p-6">
        <div className="">
          <label>Brand Name</label>
          <Input
            className="mt-2"
            value={state.name}
            onChange={(e) => setValue("name", e.target.value)}
          />
        </div>
        <br />
        <div className="">
          <label>Brand About</label>
          <TextArea
            className="mt-2"
            value={state.aboutBrand}
            onChange={(e) => setValue("aboutBrand", e.target.value)}
          />
        </div>
        <br />
      </div>
    </TitleCard>
  );
}

export default BrandBasicInfo;
