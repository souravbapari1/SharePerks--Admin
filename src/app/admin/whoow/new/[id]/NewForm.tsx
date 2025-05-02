"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TitleCard from "@/components/cards/TitleCard";
import Checkbox from "@/components/Inputs/CheckBox";
import FileInput from "@/components/Inputs/FilesInput";
import Input from "@/components/Inputs/Input";
import TextArea from "@/components/Inputs/TextArea";
import { SelectBrokerInput } from "@/components/models/SearchBroker";
import { BrandData } from "@/interface/brand";
import { WhoowProduct } from "@/interface/whoowProducts";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { on } from "events";
import { toast } from "material-react-toastify";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
const TextEditor = dynamic(() => import("@/components/Inputs/TextEditor"), {
  ssr: false, // This option disables server-side rendering for this component
});
function NewForm({
  product,
  brands,
}: {
  product: WhoowProduct;
  brands: BrandData[];
}) {
  console.log(product);

  const router = useRouter();
  const [isEnable, setIsEnable] = useState(false);
  const [showOnBanner, setShowOnBanner] = useState(false);
  const [showOnHome, setShowOnHome] = useState(false);
  const [redeemSteps, setRedeemSteps] = useState("");

  const [onlineOfflineBoth, setOnlineOfflineBoth] = useState("");
  const [redemption, setRedemption] = useState("");
  const [maximumGiftCard, setMaximumGiftCard] = useState("");

  const [description, setDescription] = React.useState("");
  const [content, setContent] = React.useState("");
  const [bannerImage, setBannerImage] = React.useState<File | null>(null);
  const [brokerName, setBrokerName] = useState("");
  const [brokerProvider, setBrokerProvider] = React.useState<{
    label: string;
    value: string;
  }>();
  const [pricing, setPricing] = React.useState<Record<string, number>[]>([
    {
      amount: 0,
      withBroker: 0,
      withOutBroker: 0,
    },
  ]);

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
      setBannerImage(e.target.files[0]);
    }
  };
  const handleBrokerProviderChange = (e: { label: string; value: string }) => {
    setBrokerName(e.label);
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

    // Validate banner image
    if (!bannerImage) {
      toast.error("Please upload a banner image.");
      return false;
    }

    // Validate pricing entries
    for (let i = 0; i < pricing.length; i++) {
      const pricingItem = pricing[i];
      if (
        pricingItem.amount <= 0 ||
        pricingItem.amount < parseInt(product.minPrice) ||
        pricingItem.amount > parseInt(product.maxPrice)
      ) {
        toast.error(
          `Amount for pricing ${i + 1} is invalid. It should be between ${
            product.minPrice
          } and ${product.maxPrice}.`
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

  const resetAll = () => {
    setDescription("");
    setContent("");
    setBannerImage(null);
    setBrokerProvider(undefined);
    setBrokerName("");
    setPricing([{ amount: 0, withBroker: 0, withOutBroker: 0 }]);
  };

  const handelSubmit = async () => {
    const isValid = validate();
    if (isValid) {
      try {
        const res = await client
          .post("/api/v1/whoow")
          .form({
            isEnable: isEnable,
            previewImage: product.images.mobile,
            brandName: product.name,
            description: description,
            pricing: JSON.stringify(pricing),
            stockISIN: brokerProvider?.value,
            data: JSON.stringify(product),
            taq: content,
            showOnBanner,
            showOnHome,
            redeemSteps,
            onlineOfflineBoth,
            redemption,
            maximumGiftCard,
            brokerName: brokerName,
          })
          .append("file", bannerImage!)
          .send(AdminAuthToken());

        toast.success("GiftCard Created Successfully");
        resetAll();
        router.back();
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div>
      <Breadcrumb pageName="Create New Pinelabs GiftCard" />
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
                  <p>Save Card</p>
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
                    src={product.images.mobile}
                    alt="Brand"
                    width={48}
                    height={48}
                  />
                </div>

                <div className="">
                  <p>Brand Name</p>
                  <p className="font-bold text-graydark">{product.name}</p>
                </div>
                <div className="">
                  <p>Product Code</p>
                  <p className="font-bold text-graydark">{product.sku}</p>
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
                label="Banner Image (recommended: 1930 x 1000)"
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
                        min={product.minPrice}
                        max={product.maxPrice}
                        value={e.amount}
                        label={`Amount (${product.minPrice} - ${product.maxPrice})`}
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

        <div className="col-span-2 my-3">
          <TitleCard title="Card Information">
            <div className="p-5 flex  gap-5">
              <div className="w-full">
                <Input
                  label="Online/ Offline/ Both"
                  value={onlineOfflineBoth}
                  onChange={(e) => {
                    setOnlineOfflineBoth(e.target.value);
                  }}
                />
              </div>
              <div className="w-full">
                <Input
                  label="Multiple/ One time redemption"
                  value={redemption}
                  onChange={(e) => {
                    setRedemption(e.target.value);
                  }}
                />
              </div>
              <div className="w-full">
                <Input
                  label="Maximum Gift Cards"
                  value={maximumGiftCard}
                  onChange={(e) => {
                    setMaximumGiftCard(e.target.value);
                  }}
                />
              </div>
            </div>
          </TitleCard>
        </div>

        {/* // Redeem Steps */}

        <div className="col-span-2">
          <TitleCard title="Information">
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

export default NewForm;
