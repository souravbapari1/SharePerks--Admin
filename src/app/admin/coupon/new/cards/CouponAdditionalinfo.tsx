"use client";
import TitleCard from "@/components/cards/TitleCard";
import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select";
import { SelectBrokerInput } from "@/components/models/SearchBroker";
import { commissionProvider } from "@/constents";
import { BrandData } from "@/interface/brand";
import { CategoryType } from "@/interface/categoty";
import { useCouponRedux } from "@/redux/slice/couponSlice";
import React from "react";

function CouponAdditionalinfo({
  brands,
  categories,
}: {
  categories: CategoryType[];
  brands: BrandData[];
}) {
  const { setValue, state } = useCouponRedux();
  return (
    <TitleCard title="Additional info">
      <div className="p-5">
        <Input
          label="Coupon Code"
          type="text"
          value={state.code}
          onChange={(e) => setValue("code", e.target.value)}
        />
        <br />
        <br />
        <Input
          label="Coupon Expire Date"
          type="date"
          value={state.expDate}
          onChange={(e) => setValue("expDate", e.target.value)}
        />
        <br />
        <br />
        <div className="grid  grid-cols-2 gap-5">
          <div className="">
            <Select
              label="Communion Type"
              className="uppercase"
              value={state.commissionType}
              onChange={(e) => setValue("commissionType", e.target.value)}
              options={[
                {
                  label: "",
                  value: "",
                },
                {
                  label: "Percent",
                  value: "PERCENT",
                },
                {
                  label: "amount",
                  value: "AMOUNT",
                },
              ]}
            />
          </div>
          <div className="">
            <Input
              label="Rate"
              type="number"
              value={state.commissionRate}
              onChange={(e) => setValue("commissionRate", e.target.value)}
            />
          </div>
        </div>

        <br />
        <div className="">
          <label>Broker Provider</label>
          <SelectBrokerInput
            className="mt-2 cursor-pointer"
            value={state.stockISIN}
            onChange={(e) => setValue("stockISIN", e)}
          />
        </div>

        <br />
        <Select
          label="Provider Brand"
          className="uppercase"
          value={state.brandId}
          onChange={(e) => setValue("brandId", e.target.value)}
          options={[
            {
              label: "",
              value: "",
            },
            ...brands.map((e) => {
              return {
                label: e.name,
                value: e._id!,
              };
            }),
          ]}
        />
        <br />
        <Select
          label="Coupon Category"
          className="uppercase"
          value={state.category}
          onChange={(e) => setValue("category", e.target.value)}
          options={[
            {
              label: "",
              value: "",
            },
            ...categories.map((e) => {
              return {
                label: e.name,
                value: e._id!,
              };
            }),
          ]}
        />
      </div>
    </TitleCard>
  );
}

export default CouponAdditionalinfo;
