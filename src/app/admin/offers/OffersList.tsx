"use client";

import TitleCard from "@/components/cards/TitleCard";
import { downloadExcel } from "@/helper/exceel";
import { OfferData } from "@/interface/offers";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { useEffect, useState } from "react";
import { BiLoader } from "react-icons/bi";
import { FaFileExcel } from "react-icons/fa";
import OffersItem from "./OffersItem";

function OffersList() {
  const [data, setdata] = useState<{
    offers: OfferData[];
    currentPage: number;
    totalPages: number;
    totalOffers: number;
  }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const loadOffers = async () => {
    try {
      setLoading(true);
      const request = await client.get(`/api/v1/offers/all/${page}/6`).send<{
        offers: OfferData[];
        currentPage: number;
        totalPages: number;
        totalOffers: number;
      }>(AdminAuthToken());
      setdata(request);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, [page]);

  return (
    <TitleCard
      title="All Brands"
      action={
        <div
          onClick={() => {
            downloadExcel(data?.offers || [], "offers-shareperks");
          }}
          className="bg-green-800  text-white cursor-pointer py-1 flex justify-center items-center gap-2 rounded-lg text-sm px-4"
        >
          <FaFileExcel /> Export
        </div>
      }
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
        {data?.offers?.map((e) => {
          return <OffersItem key={e._id} data={e} reload={loadOffers} />;
        })}
      </div>
      {data?.totalPages != 1 && (
        <div className="flex justify-center items-center gap-2">
          {page != 1 && (
            <button
              onClick={() => {
                setPage(page - 1);
              }}
              className="bg-gray-2 dark:bg-meta-4 text-sm rounded-lg px-4 py-2"
            >
              Prev
            </button>
          )}
          <ul className="flex justify-center items-center gap-4 py-4">
            {Array.from(Array(data?.totalPages).keys()).map((e) => {
              return (
                <li
                  key={e}
                  onClick={() => {
                    setPage(e + 1);
                  }}
                  className={`${
                    page == e + 1 ? "bg-blue-600 text-white " : ""
                  } text-sm rounded-lg px-4 py-2 cursor-pointer`}
                >
                  {page == e + 1 ? (
                    <>
                      {loading ? (
                        <BiLoader className="animate-spin" size={14} />
                      ) : (
                        e + 1
                      )}
                    </>
                  ) : (
                    e + 1
                  )}
                </li>
              );
            })}
          </ul>
          {(data?.totalPages || 0) > page && (
            <button
              onClick={() => {
                setPage(page + 1);
              }}
              className="bg-gray-2 dark:bg-meta-4 text-sm rounded-lg px-4 py-2"
            >
              Next
            </button>
          )}
        </div>
      )}
    </TitleCard>
  );
}

export default OffersList;
