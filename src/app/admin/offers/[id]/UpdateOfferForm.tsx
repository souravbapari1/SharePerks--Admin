"use client";
import Loader from "@/app/loading";
import { initOffer, useOfferRedux } from "@/redux/slice/offerSlice";
import React, { useEffect, useState } from "react";
import OfferBasicInfo from "../cards/OfferBasicInfo";
import TitleCard from "@/components/cards/TitleCard";
import FileInput from "@/components/Inputs/FilesInput";
import OfferAdditionalinfo from "../cards/OfferAdditionalinfo";
import OfferBenefits from "../cards/OfferBenefits";
import { BrandData } from "@/interface/brand";
import { CategoryType } from "@/interface/categoty";
import { toast } from "material-react-toastify";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { OfferData } from "@/interface/offers";
import { stocks } from "@/data/stocks";

function UpdateOfferForm({
  brands,
  categories,
  offer,
}: {
  categories: CategoryType[];
  brands: BrandData[];
  offer: OfferData;
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
    const requestPayload = client
      .put("/api/v1/offers/" + offer._id)
      .form<OfferData>({
        ...state,
        offerKeyPoints: state.offerKeyPoints,
        stockISIN: state.stockISIN?.value,
      });
    if (offerImage) {
      requestPayload.append("offerImage", offerImage);
    }
    if (offerBannerImage) {
      requestPayload.append("bannerImage", offerBannerImage);
    }

    try {
      setLoading(true);

      const request = await requestPayload.send<any>(AdminAuthToken());
      console.log(request);
      toast.success(request.message);

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
    const date = new Date(offer.expDate);
    const updateOffer: OfferData = {
      ...offer,
      expDate: date.toISOString().split("T")[0],
      stockISIN: stocks.find(
        (e) => e.value == offer.stockISIN.toString()
      ) as any,
    };
    dispatch(initOffer(updateOffer));
  }, [offer]);

  return (
    <div>
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
                  label="Offer Image  (recommended: 500 x 500)"
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
                  label="Offer Banner Image  (recommended: 1930 x 1000)"
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
    </div>
  );
}

export default UpdateOfferForm;
