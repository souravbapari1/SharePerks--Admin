"use client";
import TitleCard from "@/components/cards/TitleCard";
import FileInput from "@/components/Inputs/FilesInput";

import { CategoryType } from "@/interface/categoty";
import {
  resetManageBrand,
  setMangeBrand,
  useManageBrand,
} from "@/redux/slice/brandSlice";
import OfferTerms from "./cards/OfferTerms";
import CashBackRates from "./cards/CashBackRates";
import { useEffect, useState } from "react";

import { BrandData } from "@/interface/brand";
import { toast } from "material-react-toastify";
import { AdminAuthToken, client } from "@/lib/request/actions";
import BrandBasicInfo from "./cards/BrandBasicInfo";
import BrandLinks from "./cards/BrandLinks";
import Loader from "@/app/loading";
import { Campaign } from "@/interface/cuelinks";
import { removeHtmlTags } from "@/helper/helper";
function AddBrandForm({
  categories,
  campaign,
}: {
  categories: CategoryType[];
  campaign?: Campaign;
}) {
  const { setValue, state, validateState, dispatch } = useManageBrand();
  const [brandImage, setBrandImage] = useState<File | undefined>();
  const [brandBannerImage, setBrandBannerImage] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);

  const saveBrand = async () => {
    if (!validateState()) {
      return false;
    }

    if (!brandBannerImage) {
      toast.error("Select a Banner Image File");
      return false;
    }

    if (!brandImage) {
      toast.error("Select a Brand Image File");
      return false;
    }
    alert(state.provider);
    const data: BrandData = {
      name: state.name,
      aboutBrand: state.aboutBrand,
      btnText: state.btnText,
      cashBackRates: state.cashBackRates,
      category: JSON.stringify(
        state.category.map(
          (e: { text: string; value: string }) => e.value as any
        )
      ),

      isActive: state.isActive,
      linkUrl: state.linkUrl,
      offerTerms: state.offerTerms,
      provider: state.provider,
      stockISIN: state.stockISIN.value as any,
    };
    try {
      setLoading(true);
      const res = await client
        .post("/api/v1/brand")
        .form(data)
        .append("bannerImage", brandBannerImage)
        .append("brandImage", brandImage)
        .send<any>(AdminAuthToken());
      console.log(res);
      toast.success(res.message);
      dispatch(resetManageBrand());
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response?.message || error.message);
      console.log(error?.response?.message || error);
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(resetManageBrand());
    if (campaign) {
      const stateData: BrandData = {
        ...state,
        name: campaign.name,
        aboutBrand: removeHtmlTags(campaign.important_info_html || ""),
        cashBackRates: "",
      };
      dispatch(setMangeBrand(stateData));
    }
  }, [categories, campaign]);

  return (
    <div className="">
      {loading && (
        <div className="w-screen h-screen fixed top-0 right-0 z-99999 bg-black/65">
          <Loader />
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        <div className="">
          <BrandBasicInfo onSave={saveBrand} />
          <br />
          <OfferTerms />
        </div>
        <div className="">
          <TitleCard title="Brand Assets & Category">
            <div className="p-6">
              <div className="">
                <label>
                  Brand Logo <small>(recommended: 500 x 500)</small>
                </label>
                <FileInput
                  className="mt-2"
                  onChange={(e) => {
                    if (e.target.files) {
                      setBrandImage(e?.target?.files[0]);
                    }
                  }}
                />
              </div>
              <br />
              <div className="">
                <label>
                  Brand Banner Image <small>(recommended: 1930 x 1000)</small>
                </label>
                <FileInput
                  className="mt-2"
                  onChange={(e) => {
                    if (e.target.files) {
                      setBrandBannerImage(e?.target?.files[0]);
                    }
                  }}
                />
              </div>
            </div>
          </TitleCard>
          <br />
          <BrandLinks categories={categories} />
          <br />
          <CashBackRates />
        </div>
      </div>
    </div>
  );
}

export default AddBrandForm;
