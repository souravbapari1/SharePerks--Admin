"use client";
import TitleCard from "@/components/cards/TitleCard";
import { downloadExcel } from "@/helper/exceel";
import { GiftCardData } from "@/interface/giftcard";
import { FaFileExcel } from "react-icons/fa";
import GiftCardItem from "./GiftCardItem";

function GiftCardsList({ data }: { data: GiftCardData[] }) {
  return (
    <div>
      <TitleCard
        title="All Brands"
        action={
          <div
            onClick={() => {
              downloadExcel(data, "gifter-shareperks");
            }}
            className="bg-green-800  text-white py-1 flex justify-center items-center gap-2 rounded-lg text-sm px-4"
          >
            <FaFileExcel /> Export
          </div>
        }
      >
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Brand
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Coupon Type
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Denomination List
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Active
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Updated At
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Actions
              </h5>
            </div>
          </div>
          {data.map((e) => {
            return <GiftCardItem data={e} key={e._id} />;
          })}
        </div>
      </TitleCard>
    </div>
  );
}

export default GiftCardsList;
