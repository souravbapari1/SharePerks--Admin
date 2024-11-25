"use client";

import { useState } from "react";
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
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState(data.data.Descriptions || "");
  const [termsAndConditions, setTermsAndConditions] = useState(
    data.data.tnc || ""
  );
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
  }) => setBrokerProvider(selectedBroker);
  const handlePayUserHaveHoldingChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setPayUserHaveHolding(e.target.value);
  const handlePayUserNoHoldingChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setPayUserNoHolding(e.target.value);

  const validateStates = () => {
    // Dismiss any previous toast messages
    toast.dismiss();

    // Validate brand name
    if (brandName.trim().length === 0) {
      toast.error("Please select the brand name.");
      return false;
    }

    // Validate description
    if (description.trim().length === 0) {
      toast.error("Please enter the description.");
      return false;
    }

    // Validate terms and conditions
    if (termsAndConditions.trim().length === 0) {
      toast.error("Please enter the terms and conditions.");
      return false;
    }

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
          brandId: brandName,
          denominationList: data.data.denominationList,
          isEnable: activeStatus,
          stockISIN: brokerProvider.value,
          description: description,
          taq: termsAndConditions,
          redeemSteps: data.data.redeemSteps,
          OnlineRedemptionUrl: data.data.OnlineRedemptionUrl,
          inStockPercent: payUserHaveHolding,
          withoutStockPercent: payUserNoHolding,
          data: JSON.stringify(data.data),
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
            <div className="flex justify-start items-center gap-5">
              <p>Active Status: </p>
              <Switcher
                enabled={activeStatus}
                setEnabled={handleActiveStatusChange}
              />
            </div>
            <br />
            <Select
              label="Provider Brand"
              className="uppercase"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
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

            <TextArea
              value={description}
              onChange={handleDescriptionChange}
              label="Description"
            />
            <br />
          </div>
        </TitleCard>
      </div>

      {/* Right Column */}
      <div className="">
        <TitleCard title="Basic Info">
          <div className="p-5">
            <FileInput
              label="Banner Image"
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
    </div>
  );
}

export default CreateGiftCardForm;
