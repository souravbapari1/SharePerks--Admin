"use client";

import TitleCard from "@/components/cards/TitleCard";
import React, { useEffect, useState } from "react";
import CouponItem from "./CouponItem";
import { OfferData } from "@/interface/offers";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { CouponData } from "@/interface/coupon";
import Loader from "@/app/loading";

function CouponList() {
  const [data, setdata] = useState<CouponData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const loadOffers = async () => {
    try {
      setLoading(true);
      const request = await client
        .get("/api/v1/coupon/all")
        .send<CouponData[]>(AdminAuthToken());
      setdata(request);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <TitleCard title="All Coupon Codes">
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Clicks
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Category
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Provider
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Expired Date
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>
        {data.map((e) => {
          return <CouponItem key={e._id} data={e} reload={loadOffers} />;
        })}
      </div>
    </TitleCard>
  );
}

export default CouponList;
