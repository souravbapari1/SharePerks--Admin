"use client";
import TitleCard from "@/components/cards/TitleCard";
import FileInput from "@/components/Inputs/FilesInput";

import React, { useEffect, useState } from "react";
import OfferBasicInfo from "../cards/OfferBasicInfo";
import OfferBenefits from "../cards/OfferBenefits";
import OfferAdditionalinfo from "../cards/OfferAdditionalinfo";
import { CategoryType } from "@/interface/categoty";
import { BrandData } from "@/interface/brand";

import {
  initOffer,
  resetOfferManager,
  useOfferRedux,
} from "@/redux/slice/offerSlice";
import { toast } from "material-react-toastify";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { OfferData } from "@/interface/offers";
import Loader from "@/app/loading";
import { Campaign } from "@/interface/cuelinks";
import { removeHtmlTags } from "@/helper/helper";
function NewOfferForm({
  brands,
  categories,
  campaign,
}: {
  categories: CategoryType[];
  brands: BrandData[];
  campaign?: Campaign;
}) {
  const { state, validateState, dispatch } = useOfferRedux();
  const [loading, setLoading] = useState(false);
  const [offerImage, setOfferImage] = useState<File | null>(null);
  const [offerBannerImage, setOfferBannerImage] = useState<File | null>(null);

  const onSubmit = async () => {
    const isValid = validateState();
    if (!isValid) {
      return false;
    }
    if (!offerImage) {
      toast.error("Please select valid image ");
      return false;
    }
    if (!offerBannerImage) {
      toast.error("Please select offer Banner Image");
      return false;
    }

    try {
      setLoading(true);
      const request = await client
        .post("/api/v1/offers")
        .form<OfferData>({
          ...state,
          offerKeyPoints: JSON.stringify(state.offerKeyPoints),
          stockISIN: state.stockISIN?.value,
        })
        .append("bannerImage", offerBannerImage)
        .append("offerImage", offerImage)
        .send<any>(AdminAuthToken());
      console.log(request);
      toast.success(request.message);
      dispatch(resetOfferManager());
      setOfferBannerImage(null);
      setOfferImage(null);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.message | error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(resetOfferManager());
    if (campaign) {
      const stateData: OfferData = {
        ...state,
        offerTitle: campaign.name,
        aboutOffer: removeHtmlTags(campaign.important_info_html || ""),
        commissionRate: campaign.payout,
        offerKeyPoints: Object.values(campaign.conversion_flow),
      };
      dispatch(initOffer(stateData));
    }
  }, [categories, campaign]);

  return (
    <div className="grid grid-cols-2 gap-6">
      {loading && (
        <div className="w-screen h-screen fixed top-0 right-0 z-99999 bg-black/65">
          <Loader />
        </div>
      )}
      <div className="">
        <OfferBasicInfo onSave={onSubmit} />
        <br />

        <TitleCard title="Offer  Assets">
          <div className="p-5">
            <div className="">
              <FileInput
                label="Offer Image"
                onChange={(e) => {
                  if (e.target.files) {
                    setOfferImage(e.target.files[0]);
                  }
                }}
              />
            </div>
            <br />
            <div className="">
              <FileInput
                label="Offer Banner Image"
                onChange={(e) => {
                  if (e.target.files) {
                    setOfferBannerImage(e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>
        </TitleCard>
      </div>

      <div className="">
        <OfferAdditionalinfo brands={brands} categories={categories} />
        <br />

        <div className="">
          <OfferBenefits />
        </div>
      </div>
    </div>
  );
}

export default NewOfferForm;
