import TitleCard from "@/components/cards/TitleCard";
import Input from "@/components/Inputs/Input";
import MultiSelect from "@/components/Inputs/MultiSelect";
import Select from "@/components/Inputs/Select";
import { SelectBrokerInput } from "@/components/models/SearchBroker";
import { commissionProvider } from "@/constents";
import { CategoryData } from "@/interface/brand";
import { useManageBrand } from "@/redux/slice/brandSlice";
import React from "react";

function BrandLinks({ categories }: { categories: CategoryData[] }) {
  const { setValue, state } = useManageBrand();
  return (
    <TitleCard title="Brand Linkers">
      <div className="p-6">
        <div className="">
          <label>Brand Category</label>
          <MultiSelect
            id="category"
            onChange={(e) => {
              setValue("category", e);
            }}
            selectedOptions={state.category as any}
            availableOptions={[
              ...categories.map((e, i) => {
                return {
                  text: e.name,
                  value: e._id,
                };
              }),
            ]}
          />
        </div>
        <br />
        <div className="">
          <label>Commission Provider</label>
          <Select
            value={state.provider}
            defaultValue={state.provider}
            onChange={(e) => setValue("provider", e.target.value)}
            className="mt-2 uppercase"
            options={[
              {
                label: "",
                value: "",
              },
              ...commissionProvider,
            ]}
          />
        </div>
        <br />
        <div className="">
          <label>Provider Redirect Url</label>
          <Input
            className="mt-2"
            value={state.linkUrl}
            onChange={(e) => setValue("linkUrl", e.target.value)}
          />
        </div>
        <br />
        <div className="">
          <label>Button Text</label>
          <Input
            className="mt-2"
            value={state.btnText}
            onChange={(e) => setValue("btnText", e.target.value)}
          />
        </div>
        <br />
        <div className="">
          <label>Company Name Provider</label>
          <SelectBrokerInput
            className="mt-2 cursor-pointer"
            value={state.stockISIN}
            onChange={(e) => setValue("stockISIN", e)}
          />
        </div>

        <br />
        <br />
        <div className="grid  grid-cols-3 gap-5">
          <div className="">
            <Select
              label="Communion Type"
              className="uppercase"
              value={state.commissionType}
              onChange={(e) => setValue("commissionType", e.target.value)}
              options={[
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
              label="Reward WithOut Holding"
              type="number"
              value={state.commissionRate}
              onChange={(e) => setValue("commissionRate", e.target.value)}
            />
          </div>
          <div className="">
            <Input
              label="Reward With Holding"
              type="number"
              value={state.commissionRateWithHolding}
              onChange={(e) =>
                setValue("commissionRateWithHolding", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </TitleCard>
  );
}

export default BrandLinks;
