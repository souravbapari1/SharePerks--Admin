import Button from "@/components/buttons/Button";
import { TCampaign } from "@/interface/cuelinks";
import { formatDate } from "@/lib/formateTime";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ListItem({ data }: { data: TCampaign }) {
  return (
    <div
      key={data._id}
      className={`grid grid-cols-3 sm:grid-cols-6 border-b border-stroke dark:border-strokedark`}
    >
      <div className="flex items-center gap-3 p-2.5 xl:p-5">
        <div className="flex-shrink-0">
          <Image
            src={`${data.data.image}`}
            alt="Brand"
            width={48}
            height={48}
            className="w-14 h-14 bg-gray object-contain "
          />
        </div>
        <p className="hidden text-black dark:text-white sm:block">
          {data.data.id}
        </p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">{data.data.name}</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-meta-3">{data.data.payout_type}</p>
      </div>

      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-black dark:text-white uppercase">
          {data.data.payout.toFixed(2)}
        </p>
      </div>
      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-black dark:text-white uppercase">
          {formatDate(data.updatedAt)}
        </p>
      </div>
      <div className=" items-center text-sm gap-6 justify-center p-2.5 flex xl:p-5">
        <Link
          href={"/admin/brands/new?campaign=" + data.data.id}
          className="bg-primary text-white px-3 py-2 rounded-md"
        >
          Add Brand
        </Link>
        <Link
          href={"/admin/offers/new?campaign=" + data.data.id}
          className="bg-secondary text-white px-3 py-2 rounded-md"
        >
          Add Offer
        </Link>
      </div>
    </div>
  );
}

export default ListItem;
