"use client";

import Loader from "@/app/loading";
import { BrandData } from "@/interface/brand";
import { CategoryType } from "@/interface/categoty";
import { CouponData } from "@/interface/coupon";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { resetCouponManager, useCouponRedux } from "@/redux/slice/couponSlice";
import { toast } from "material-react-toastify";
import { useState } from "react";
import CouponBasicInfo from "./cards/CouponBasicInfo";
import TitleCard from "@/components/cards/TitleCard";
import FileInput from "@/components/Inputs/FilesInput";
import CouponAdditionalinfo from "./cards/CouponAdditionalinfo";
import CouponBenefits from "./cards/CouponBenefits";

function NewCouponForm({
  brands,
  categories,
}: {
  categories: CategoryType[];
  brands: BrandData[];
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
    if (!CouponImage) {
      toast.error("Please select valid image ");
      return false;
    }
    if (!CouponBannerImage) {
      toast.error("Please select coupon Banner Image");
      return false;
    }

    try {
      setLoading(true);
      const request = await client
        .post("/api/v1/coupon")
        .form<CouponData>({
          ...state,
          couponKeyPoints: JSON.stringify(state.couponKeyPoints),
          stockISIN: state.stockISIN?.value,
        })
        .append("bannerImage", CouponBannerImage)
        .append("couponImage", CouponImage)
        .send<any>(AdminAuthToken());
      console.log(request);
      toast.success(request.message);
      dispatch(resetCouponManager());
      setCouponBannerImage(null);
      setCouponImage(null);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.message | error.message);
      setLoading(false);
    }
  };

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

          <TitleCard title="Coupon  Assets">
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
                  label="Coupon Banner Image"
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

export default NewCouponForm;
