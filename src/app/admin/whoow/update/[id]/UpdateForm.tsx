"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TitleCard from "@/components/cards/TitleCard";
import Checkbox from "@/components/Inputs/CheckBox";
import FileInput from "@/components/Inputs/FilesInput";
import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select";
import Switcher from "@/components/Inputs/Switcher";
import TextArea from "@/components/Inputs/TextArea";

import { SelectBrokerInput } from "@/components/models/SearchBroker";
import { stocks } from "@/data/stocks";
import { BrandData } from "@/interface/brand";
import { Pricing, WhoowCard } from "@/interface/whoowCards";
import { WhoowProduct } from "@/interface/whoowProducts";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { toast } from "material-react-toastify";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const TextEditor = dynamic(() => import("@/components/Inputs/TextEditor"), {
  ssr: false, // This option disables server-side rendering for this component
});

function UpdateForm({
  product,
  brands,
}: {
  product: WhoowCard;
  brands: BrandData[];
}) {
  const [isEnable, setIsEnable] = useState(product.isEnable);
  const [showOnBanner, setShowOnBanner] = useState(
    product.showOnBanner || false
  );
  const [showOnHome, setShowOnHome] = useState(product.showOnHome || false);

  const [description, setDescription] = React.useState(product.description);
  const [content, setContent] = React.useState(product.taq || "");
  const [bannerImage, setBannerImage] = React.useState<File | null>(null);
  const [redeemSteps, setRedeemSteps] = useState(product.redeemSteps || "");

  const [brokerProvider, setBrokerProvider] = React.useState<
    | {
        label: string;
        value: string;
      }
    | undefined
  >(stocks.find((s) => s.value === product.stockISIN) || undefined);
  const [pricing, setPricing] = React.useState<Pricing[]>(
    product.pricing || [
      {
        amount: 0,
        withBroker: 0,
        withOutBroker: 0,
      },
    ]
  );

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };
  const handleContentChange = (content: string) => {
    setContent(content);
  };
  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      alert(e.target.files[0].name);
      setBannerImage(e.target.files[0]);
    }
  };
  const handleBrokerProviderChange = (e: { label: string; value: string }) => {
    setBrokerProvider(e);
  };
  const handlePricingChange = (
    index: number,
    key: "amount" | "withBroker" | "withOutBroker",
    value: number
  ) => {
    const tmpPricing = [...pricing];
    tmpPricing[index] = {
      ...tmpPricing[index],
      [key]: value,
    };
    setPricing(tmpPricing);
  };

  const handleAddPricing = () => {
    setPricing([...pricing, { amount: 0, withBroker: 0, withOutBroker: 0 }]);
  };

  const validate = () => {
    toast.dismiss();

    // Check if description is provided
    if (!description) {
      toast.error("Please enter a description.");
      return false;
    }

    if (!brokerProvider) {
      toast.error("Please select a broker provider.");
      return false;
    }

    // Validate pricing entries
    for (let i = 0; i < pricing.length; i++) {
      const pricingItem = pricing[i];
      if (
        pricingItem.amount <= 0 ||
        pricingItem.amount < parseInt(product.data.minPrice) ||
        pricingItem.amount > parseInt(product.data.maxPrice)
      ) {
        toast.error(
          `Amount for pricing ${i + 1} is invalid. It should be between ${
            product.data.minPrice
          } and ${product.data.maxPrice}.`
        );
        return false;
      }
      if (pricingItem.withBroker <= 0 || pricingItem.withBroker > 100) {
        toast.error(
          `With Broker percentage for pricing ${
            i + 1
          } must be between 1 and 100.`
        );
        return false;
      }
      if (pricingItem.withOutBroker <= 0 || pricingItem.withOutBroker > 100) {
        toast.error(
          `Without Broker percentage for pricing ${
            i + 1
          } must be between 1 and 100.`
        );
        return false;
      }
    }

    return true;
  };

  const handelSubmit = async () => {
    const isValid = validate();
    if (isValid) {
      try {
        const res = client.patch("/api/v1/whoow/" + product._id).form({
          isEnable: isEnable,
          description: description,
          pricing: JSON.stringify(pricing),
          stockISIN: brokerProvider?.value,
          data: JSON.stringify(product.data),
          taq: content,
          showOnBanner,
          showOnHome,
          redeemSteps,
        });

        if (bannerImage) {
          res.append("file", bannerImage!);
        }
        await res.send(AdminAuthToken());
        toast.success("GiftCard Update Successfully");
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="">
          <TitleCard
            title="Basic Info"
            action={
              <>
                <div
                  className="w-28 h-8 select-none flex justify-center items-center bg-green-700 text-white cursor-pointer"
                  onClick={handelSubmit}
                >
                  <p>Update Card</p>
                </div>
              </>
            }
          >
            <div className="p-5">
              <div className="flex justify-start items-center gap-5">
                <div className="flex justify-start items-center gap-4">
                  <p>Active Status:</p>
                  <Checkbox
                    isChecked={isEnable}
                    onClick={() => {
                      setIsEnable(!isEnable);
                    }}
                  />
                </div>
                <div className="flex justify-start items-center gap-4">
                  <p>Show On Slider:</p>
                  <Checkbox
                    isChecked={showOnBanner}
                    onClick={() => {
                      setShowOnBanner(!showOnBanner);
                    }}
                  />
                </div>
                <div className="flex justify-start items-center gap-4">
                  <p>Show On Feed:</p>
                  <Checkbox
                    isChecked={showOnHome}
                    onClick={() => {
                      setShowOnHome(!showOnHome);
                    }}
                  />
                </div>
              </div>
              <br />
              <div className="flex gap-5">
                <div className="">
                  <p>Preview Image</p>
                  <Image
                    src={product.data.images.mobile || ""}
                    alt="Brand"
                    width={48}
                    height={48}
                  />
                </div>

                <div className="">
                  <p>Brand Name</p>
                  <p className="font-bold text-graydark">{product.data.name}</p>
                </div>
                <div className="">
                  <p>Product Code</p>
                  <p className="font-bold text-graydark">{product.data.sku}</p>
                </div>
              </div>
              <br />
              <TextArea
                label="Description"
                value={description}
                onChange={handleDescriptionChange}
              />
              <br />
            </div>
          </TitleCard>
        </div>
        <div className="">
          <TitleCard title="Additional info">
            <div className="p-5">
              <FileInput
                label="Banner Image"
                onChange={handleBannerImageChange}
              />
              <br />
              <div className="">
                <label className="mb-0 block text-sm font-medium text-black dark:text-white">
                  Broker Provider
                </label>
                <SelectBrokerInput
                  value={brokerProvider}
                  onChange={handleBrokerProviderChange}
                />
              </div>
            </div>
          </TitleCard>
          <br />
          <TitleCard
            title="Pricing"
            action={<button onClick={handleAddPricing}>Add More</button>}
          >
            <div className="p-5">
              {pricing.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="grid grid-cols-3 gap-4 mt-3 relative select-none"
                  >
                    {i != 0 && (
                      <IoClose
                        className="text-red cursor-pointer absolute right-0 top-0 "
                        onClick={() => {
                          setPricing(pricing.filter((_, index) => index !== i));
                        }}
                      />
                    )}
                    <div className="">
                      <Input
                        min={product.data.minPrice}
                        max={product.data.maxPrice}
                        value={e.amount}
                        label={`Amount (${product.data.minPrice} - ${product.data.maxPrice})`}
                        type="number"
                        name="amount"
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          handlePricingChange(i, "amount", value);
                        }}
                      />
                    </div>
                    <div className="">
                      <Input
                        value={e.withBroker}
                        label="With Broker %"
                        type="number"
                        name="withBroker"
                        min={1}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          handlePricingChange(i, "withBroker", value);
                        }}
                      />
                    </div>
                    <div className="">
                      <Input
                        value={e.withOutBroker}
                        label="Without Broker %"
                        type="number"
                        name="withOutBroker"
                        min={1}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          handlePricingChange(i, "withOutBroker", value);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </TitleCard>
        </div>

        {/* // Redeem Steps */}
        <div className="col-span-2">
          <TitleCard title="Redeem Steps">
            <TextEditor
              content={redeemSteps}
              onChange={(e) => {
                setRedeemSteps(e);
              }}
            />
          </TitleCard>
        </div>
      </div>
    </div>
  );
}

export default UpdateForm;
