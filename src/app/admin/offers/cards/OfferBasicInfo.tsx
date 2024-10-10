"use client";

import TitleCard from "@/components/cards/TitleCard";
import Checkbox from "@/components/Inputs/CheckBox";
import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select";
import Switcher from "@/components/Inputs/Switcher";
import TextArea from "@/components/Inputs/TextArea";
import { commissionProvider } from "@/constents";
import { useOfferRedux } from "@/redux/slice/offerSlice";

function OfferBasicInfo({ onSave }: { onSave: Function }) {
  const { setValue, state } = useOfferRedux();
  return (
    <TitleCard
      title="Basic Info"
      action={
        <button
          onClick={() => onSave()}
          className="py-2 w-auto bg-primary disabled:bg-slate-500 disabled:opacity-20 px-4 text-white rounded-lg text-xs font-bold"
        >
          Save Offer
        </button>
      }
    >
      <div className="p-5">
        <div className="">
          <div className="flex justify-start gap-10 items-center">
            <div className="flex justify-center items-center gap-4">
              <p>Status</p>
              <Checkbox
                isChecked={state.isEnable}
                onClick={() => setValue("isEnable", !state.isEnable)}
              />
            </div>
            <div className="flex justify-center items-center gap-4">
              <p>Top Offer</p>
              <Switcher
                enabled={state.isInSlide}
                setEnabled={() => setValue("isInSlide", !state.isInSlide)}
              />
            </div>
          </div>
        </div>
        <br />
        <Input
          label="Offer Title"
          value={state.offerTitle}
          onChange={(e) => setValue("offerTitle", e.target.value)}
        />
        <br />
        <br />
        <TextArea
          label="Offer Description"
          value={state.aboutOffer}
          onChange={(e) => setValue("aboutOffer", e.target.value)}
        />
        <br />

        <Input
          label="Offer Btn Text"
          value={state.linkText}
          onChange={(e) => setValue("linkText", e.target.value)}
        />
        <br />
        <br />
        <Input
          label="Offer Link"
          value={state.link}
          onChange={(e) => setValue("link", e.target.value)}
        />
        <br />
        <br />
        <Select
          label="Offer Provider"
          className="uppercase"
          value={state.provider}
          onChange={(e) => setValue("provider", e.target.value)}
          options={[
            {
              label: "",
              value: "",
            },
            ...commissionProvider,
          ]}
        />
      </div>
    </TitleCard>
  );
}

export default OfferBasicInfo;
