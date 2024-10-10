"use client";

import TitleCard from "@/components/cards/TitleCard";
import Checkbox from "@/components/Inputs/CheckBox";
import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select";
import Switcher from "@/components/Inputs/Switcher";
import TextArea from "@/components/Inputs/TextArea";
import { commissionProvider } from "@/constents";
import { useCouponRedux } from "@/redux/slice/couponSlice";

function CouponBasicInfo({ onSave }: { onSave: Function }) {
  const { setValue, state } = useCouponRedux();
  return (
    <TitleCard
      title="Basic Info"
      action={
        <button
          onClick={() => onSave()}
          className="py-2 w-auto bg-primary disabled:bg-slate-500 disabled:opacity-20 px-4 text-white rounded-lg text-xs font-bold"
        >
          Save Coupon
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
          </div>
        </div>
        <br />
        <Input
          label="Coupon Title"
          value={state.couponTitle}
          onChange={(e) => setValue("couponTitle", e.target.value)}
        />
        <br />
        <br />
        <TextArea
          label="Coupon Description"
          value={state.aboutCoupon}
          onChange={(e) => setValue("aboutCoupon", e.target.value)}
        />
        <br />

        <Input
          label="Coupon Btn Text"
          value={state.linkText}
          onChange={(e) => setValue("linkText", e.target.value)}
        />
        <br />
        <br />
        <Input
          label="Coupon Link"
          value={state.link}
          onChange={(e) => setValue("link", e.target.value)}
        />
        <br />
        <br />
        <Select
          label="Coupon Provider"
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

export default CouponBasicInfo;
