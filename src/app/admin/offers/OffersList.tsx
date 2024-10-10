"use client";

import TitleCard from "@/components/cards/TitleCard";
import React, { useEffect, useState } from "react";
import OffersItem from "./OffersItem";
import { OfferData } from "@/interface/offers";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { downloadExcel } from "@/helper/exceel";
import { SiMicrosoftexcel } from "react-icons/si";

function OffersList() {
  const [data, setdata] = useState<OfferData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const loadOffers = async () => {
    try {
      setLoading(true);
      const request = await client
        .get("/api/v1/offers/all")
        .send<OfferData[]>(AdminAuthToken());
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

  return (
    <TitleCard
      title="All Brands"
      // action={
      //   <div
      //     onClick={() => {
      //       downloadExcel(data, "users-shareperks");
      //     }}
      //     className="bg-green-800  text-white py-1 flex justify-center items-center gap-2 rounded-lg text-sm px-4"
      //   >
      //     <SiMicrosoftexcel /> Export
      //   </div>
      // }
    >
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
          return <OffersItem key={e._id} data={e} reload={loadOffers} />;
        })}
      </div>
    </TitleCard>
  );
}

export default OffersList;
