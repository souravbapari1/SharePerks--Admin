"use client";

import { useEffect, useState } from "react";
import TitleCard from "@/components/cards/TitleCard";
import FileInput from "@/components/Inputs/FilesInput";
import Input from "@/components/Inputs/Input";
import Switcher from "@/components/Inputs/Switcher";
import TextArea from "@/components/Inputs/TextArea";
import TextEditor from "@/components/Inputs/TextEditor";
import { SelectBrokerInput } from "@/components/models/SearchBroker";
import { toast } from "material-react-toastify";
import Select from "@/components/Inputs/Select";
import { BrandData } from "@/interface/brand";
import { GyftrBrands } from "@/interface/gyftr";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { useRouter } from "next/navigation";
import Loader from "@/app/loading";
import Image from "next/image";

function CreateGiftCardForm({
  brands,
  data,
}: {
  brands: BrandData[];
  data: GyftrBrands;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // State management
  const [activeStatus, setActiveStatus] = useState(false);
  const [showOnBanner, setShowOnBanner] = useState(false);
  const [showOnHome, setShowOnHome] = useState(false);
  const [onlineOfflineBoth, setOnlineOfflineBoth] = useState("");
  const [redemption, setRedemption] = useState("");
  const [maximumGiftCard, setMaximumGiftCard] = useState("");
  const [brokerName, setBrokerName] = useState("");

  const [description, setDescription] = useState(data.data.Descriptions || "");
  const [termsAndConditions, setTermsAndConditions] = useState(
    data.data.tnc || ""
  );
  const [redeemSteps, setRedeemSteps] = useState("");
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [brokerProvider, setBrokerProvider] = useState({
    label: "",
    value: "",
  });
  const [payUserHaveHolding, setPayUserHaveHolding] = useState("");
  const [payUserNoHolding, setPayUserNoHolding] = useState("");

  // Handlers
  const handleActiveStatusChange = () => setActiveStatus(!activeStatus);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);
  const handleTermsAndConditionsChange = (content: string) =>
    setTermsAndConditions(content);
  const handleBannerImageChange = (file: File) => setBannerImage(file);
  const handleBrokerProviderChange = (selectedBroker: {
    label: string;
    value: string;
  }) => {
    setBrokerName(selectedBroker.label);
    setBrokerProvider(selectedBroker);
  };
  const handlePayUserHaveHoldingChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setPayUserHaveHolding(e.target.value);
  const handlePayUserNoHoldingChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setPayUserNoHolding(e.target.value);

  const validateStates = () => {
    // Dismiss any previous toast messages
    toast.dismiss();

    // Validate description
    if (description.trim().length === 0) {
      toast.error("Please enter the description.");
      return false;
    }

    // Validate terms and conditions
    // if (termsAndConditions.trim().length === 0) {
    //   toast.error("Please enter the terms and conditions.");
    //   return false;
    // }

    // Validate banner image
    if (!bannerImage) {
      toast.error("Please upload a banner image.");
      return false;
    }

    // Validate broker provider
    if (brokerProvider.value.trim().length === 0) {
      toast.error("Please select a broker provider.");
      return false;
    }

    // Validate pay user have holding
    if (
      payUserHaveHolding.trim().length === 0 ||
      isNaN(Number(payUserHaveHolding))
    ) {
      toast.error(
        "Please enter a valid percentage for 'Pay User Have Holding'."
      );
      return false;
    }

    // Validate pay user have no holding
    if (
      payUserNoHolding.trim().length === 0 ||
      isNaN(Number(payUserNoHolding))
    ) {
      toast.error(
        "Please enter a valid percentage for 'Pay User Have No Holding'."
      );
      return false;
    }

    createNewBrand();
  };

  const createNewBrand = async () => {
    try {
      setLoading(true);
      const saveTask = await client
        .post("/api/v1/giftcard")
        .form({
          storeType: "online",
          codeType: data.data.Brandtype,
          previewImage: data.data.BrandImage,
          brandName: data.data.BrandName,
          denominationList: data.data.denominationList,
          isEnable: activeStatus,
          stockISIN: brokerProvider.value,
          description: description,
          taq: termsAndConditions,
          redeemSteps: redeemSteps,
          OnlineRedemptionUrl: data.data.OnlineRedemptionUrl,
          inStockPercent: payUserHaveHolding,
          withoutStockPercent: payUserNoHolding,
          data: JSON.stringify(data.data),
          showOnBanner: showOnBanner,
          showOnHome: showOnHome,
          onlineOfflineBoth: onlineOfflineBoth,
          redemption: redemption,
          maximumGiftCard: maximumGiftCard,
          brokerName: brokerName,
        })
        .append("file", bannerImage!)
        .send(AdminAuthToken());
      toast.success("Gift Card Added Successfully");
      setLoading(false);

      router.replace("/admin/giftcards");
      console.log(saveTask);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error(error?.response?.message || error.message.toString());
    }
  };

  const generateInformation = () => {
    const redeemSteps = JSON.parse(data.data.redeemSteps || "{}");
    const keys = Object.keys(redeemSteps);
    let redeemStepsDataHtml = `
    <h3 style=\"box-sizing: border-box; margin-top: 0px; margin-bottom: 0.5rem; font-weight: 500; line-height: 1.2; color: rgb(33, 37, 41); font-family: Rubik, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 1.5rem;\">
Redemption Steps
    </h3>
    `;
    const steps = keys.map((e) => {
      return `
      
      <div>

      <br/>

        <div >
          <h3 style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0.5rem; font-weight: 500; line-height: 1.2; color: rgb(33, 37, 41); font-family: Rubik, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 1rem;">
Step ${e}
          </h3>
          <p>${redeemSteps[e].text}</p>
        </div>
        <div>
        
       
      <img src="${redeemSteps[e].image}" alt="Brand" width="auto" height="auto" style="max-width: 100%;">
        </div>
        <br/>
      </div>
      `;
    });

    redeemStepsDataHtml = redeemStepsDataHtml + steps.join("");

    redeemStepsDataHtml =
      redeemStepsDataHtml +
      `
      <br/>
        <h3 style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0.5rem; font-weight: 500; line-height: 1.2; color: rgb(33, 37, 41); font-family: Rubik, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 1.5rem;">
  Important Instructions
        </h3>
  ${data.data.importantInstruction}
      <br/>
    <h3 style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0.5rem; font-weight: 500; line-height: 1.2; color: rgb(33, 37, 41); font-family: Rubik, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 1.5rem;">
  Terms &amp; Conditions
  </h3>
  <p>${data.data.tnc}</p>
    `;

    setRedeemSteps(`
    <div class="">
        ${redeemStepsDataHtml}
    </div>    
      `);
  };

  useEffect(() => {
    generateInformation();
  }, [data]);

  return (
    <div className="grid grid-cols-2 gap-5">
      {loading && (
        <div className="w-screen h-screen fixed top-0 right-0 z-99999 bg-black/65">
          <Loader />
        </div>
      )}
      {/* Left Column */}
      <div className="">
        <TitleCard
          title="Basic Info"
          action={
            <button
              onClick={validateStates}
              className="bg-primary text-white px-4 py-1"
            >
              Save Card
            </button>
          }
        >
          <div className="p-5">
            <div className="flex justify-start gap-8 items-center">
              <div className="flex justify-start items-center flex-col gap-5">
                <p>Active Status</p>
                <Switcher
                  enabled={activeStatus}
                  setEnabled={handleActiveStatusChange}
                />
              </div>
              <div className="flex justify-start items-center flex-col gap-5">
                <p>Show On Slider </p>
                <Switcher
                  enabled={showOnBanner}
                  setEnabled={() => {
                    setShowOnBanner(!showOnBanner);
                  }}
                />
              </div>
              <div className="flex justify-start items-center flex-col gap-5">
                <p>Show On Feed </p>
                <Switcher
                  enabled={showOnHome}
                  setEnabled={() => {
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
                  src={data.data.BrandImage || ""}
                  alt="Brand"
                  width={48}
                  height={48}
                />
              </div>

              <div className="">
                <p>Brand Name</p>
                <p className="font-bold text-graydark">{data.data.BrandName}</p>
              </div>
              <div className="">
                <p>Product Code</p>
                <p className="font-bold text-graydark">
                  {data.data.BrandProductCode}
                </p>
              </div>
            </div>
            <br />
            <TextArea
              value={description}
              onChange={handleDescriptionChange}
              label="Description"
            />
          </div>
        </TitleCard>
      </div>

      {/* Right Column */}
      <div className="">
        <TitleCard title="Basic Info">
          <div className="p-5">
            <FileInput
              label="Banner Image (recommended: 1930 x 1000)"
              onChange={(e) => {
                if (e.target.files) {
                  handleBannerImageChange(e.target.files[0]);
                }
              }}
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
            <br />
            <Input
              label="Pay User Have Holding (%)"
              value={payUserHaveHolding}
              type="number"
              onChange={handlePayUserHaveHoldingChange}
            />
            <br />
            <br />
            <Input
              label="Pay User Have No Holding (%)"
              value={payUserNoHolding}
              type="number"
              onChange={handlePayUserNoHoldingChange}
            />
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
                onChange={(e) => setOnlineOfflineBoth(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Input
                label="Multiple/ One time redemption"
                value={redemption}
                onChange={(e) => setRedemption(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Input
                label="Maximum Gift Cards"
                value={maximumGiftCard}
                onChange={(e) => setMaximumGiftCard(e.target.value)}
              />
            </div>
          </div>
        </TitleCard>
      </div>

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
  );
}

export default CreateGiftCardForm;
