"use client";
import TitleCard from "@/components/cards/TitleCard";
import FileInput from "@/components/Inputs/FilesInput";

import { CategoryType } from "@/interface/categoty";
import {
  resetManageBrand,
  setMangeBrand,
  useManageBrand,
} from "@/redux/slice/brandSlice";

import { useEffect, useState } from "react";

import { BrandData } from "@/interface/brand";
import { toast } from "material-react-toastify";
import { AdminAuthToken, client } from "@/lib/request/actions";

import Loader from "@/app/loading";
import BrandBasicInfo from "../new/cards/BrandBasicInfo";
import OfferTerms from "../new/cards/OfferTerms";
import BrandLinks from "../new/cards/BrandLinks";
import CashBackRates from "../new/cards/CashBackRates";
import { stocks } from "@/data/stocks";
function UpdateBrandForm({
  brand,
  categories,
  id,
}: {
  brand: BrandData;
  categories: CategoryType[];
  id: string;
}) {
  const { state, validateState, dispatch } = useManageBrand();
  const [brandImage, setBrandImage] = useState<File | undefined>();
  const [brandBannerImage, setBrandBannerImage] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);

  const saveBrand = async () => {
    if (!validateState()) {
      return false;
    }

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
      commissionRate: state.commissionRate,
      commissionRateWithHolding: state.commissionRateWithHolding,
      commissionType: state.commissionType,
    };

    const updateReq = client.put("/api/v1/brand/" + id).form(data);
    if (brandBannerImage) {
      updateReq.append("", brandBannerImage);
    }

    if (brandImage) {
      updateReq.append("brandImage", brandImage);
    }
    try {
      setLoading(true);
      const res = await updateReq.send<any>(AdminAuthToken());
      console.log(res);
      toast.success(res.message);

      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response?.message || error.message);
      console.log(error?.response?.message || error);
      setLoading(false);
    }
  };
  useEffect(() => {
    dispatch(resetManageBrand());
    const updatedBrand = {
      ...brand,
      category: brand.category.map((e: string) => {
        const cat = categories.find((i) => i._id === e);
        return cat
          ? { text: cat.name, value: cat._id }
          : { text: "Not Found", value: e };
      }),
      stockISIN: stocks.find(
        (e) => e.value == brand.stockISIN.toString()
      ) as any,
    };

    dispatch(setMangeBrand(updatedBrand));
  }, [brand, categories, dispatch]);
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

export default UpdateBrandForm;
