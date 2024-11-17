"use client";
import Loader from "@/app/loading";
import { initCoupon, useCouponRedux } from "@/redux/slice/couponSlice";
import React, { useEffect, useState } from "react";

import TitleCard from "@/components/cards/TitleCard";
import FileInput from "@/components/Inputs/FilesInput";

import { BrandData } from "@/interface/brand";
import { CategoryType } from "@/interface/categoty";
import { toast } from "material-react-toastify";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { CouponData } from "@/interface/coupon";
import { stocks } from "@/data/stocks";
import CouponBasicInfo from "../new/cards/CouponBasicInfo";
import CouponAdditionalinfo from "../new/cards/CouponAdditionalinfo";
import CouponBenefits from "../new/cards/CouponBenefits";

function UpdateCouponForm({
  brands,
  categories,
  Coupon,
}: {
  categories: CategoryType[];
  brands: BrandData[];
  Coupon: CouponData;
}) {
  const { state, validateState, dispatch } = useCouponRedux();
  const [loading, setLoading] = useState(false);
  const [CouponImage, setCouponImage] = useState<File | null>(null);
  const [CouponBannerImage, setCouponBannerImage] = useState<File | null>(null);

  const onSubmit = async () => {
    const isValid = validateState();
    if (!isValid) {
      return false;
    }
    const requestPayload = client
      .put("/api/v1/coupon/" + Coupon._id)
      .form<CouponData>({
        ...state,
        couponKeyPoints: JSON.stringify(state.couponKeyPoints),
        stockISIN: state.stockISIN?.value,
      });
    if (CouponImage) {
      requestPayload.append("couponImage", CouponImage);
    }
    if (CouponBannerImage) {
      requestPayload.append("bannerImage", CouponBannerImage);
    }

    try {
      setLoading(true);

      const request = await requestPayload.send<any>(AdminAuthToken());
      console.log(request);
      toast.success(request.message);

      setCouponBannerImage(null);
      setCouponImage(null);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.message | error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const date = new Date(Coupon.expDate);
    const updateCoupon: CouponData = {
      ...Coupon,
      expDate: date.toISOString().split("T")[0],
      stockISIN: stocks.find(
        (e) => e.value == Coupon.stockISIN.toString()
      ) as any,
    };
    dispatch(initCoupon(updateCoupon));
  }, [Coupon]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        {loading && (
          <div className="w-screen h-screen fixed top-0 right-0 z-99999 bg-black/65">
            <Loader />
          </div>
        )}
        <div className="">
          <CouponBasicInfo onSave={onSubmit} />
          <br />

          <TitleCard title="Coupon  Assets  (recommended: 1900 x 1000)">
            <div className="p-5">
              <div className="">
                <FileInput
                  label="Coupon Image"
                  onChange={(e) => {
                    if (e.target.files) {
                      setCouponImage(e.target.files[0]);
                    }
                  }}
                />
              </div>
              <br />
              <div className="">
                <FileInput
                  label="Coupon Banner Image  (recommended: 1930 x 1000)"
                  onChange={(e) => {
                    if (e.target.files) {
                      setCouponBannerImage(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
          </TitleCard>
        </div>

        <div className="">
          <CouponAdditionalinfo brands={brands} categories={categories} />
          <br />

          <div className="">
            <CouponBenefits />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateCouponForm;
