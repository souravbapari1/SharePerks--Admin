import TitleCard from "@/components/cards/TitleCard";
import { WhoowProduct } from "@/interface/whoowProducts";
import { formatDate } from "@/lib/formateTime";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

function ListWhoowProducts({ data }: { data: WhoowProduct[] }) {
  return (
    <TitleCard title="All Brands">
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>

          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Price
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
          return (
            <div
              key={e.sku}
              className={`grid grid-cols-3 sm:grid-cols-4 border-b border-stroke dark:border-strokedark `}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0">
                  <Image
                    src={
                      e.images.mobile ||
                      "https://www.tea-tron.com/antorodriguez/blog/wp-content/uploads/2016/04/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
                    }
                    alt="Brand"
                    width={348}
                    height={448}
                    className="w-14 h-14 bg-gray object-contain"
                  />
                </div>
                <p className="hidden text-black dark:text-white sm:block">
                  {e.name}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">
                  {e.currency.symbol}
                  {e.minPrice} - {e.currency.symbol}
                  {e.maxPrice}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white uppercase">
                  {formatDate((e.updatedAt || "")?.toString())}
                </p>
              </div>

              <div className=" items-center text-xl gap-6 justify-center p-2.5 flex xl:p-5">
                <Link href={"/admin/whoow/new/" + e.sku}>
                  <AiOutlineEdit />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </TitleCard>
  );
}

export default ListWhoowProducts;
