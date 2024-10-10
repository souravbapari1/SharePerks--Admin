"use client";

import TitleCard from "@/components/cards/TitleCard";
import { GyftrBrands } from "@/interface/gyftr";
import { formatDate } from "@/lib/formateTime";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineEdit } from "react-icons/ai";

function GyfterBrandsList({ data }: { data: GyftrBrands[] }) {
  return (
    <div>
      <TitleCard title="All Brands">
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Name
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Brand Type
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Denomination List
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Stock Available
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
                key={e._id}
                className={`grid grid-cols-3 sm:grid-cols-6 border-b border-stroke dark:border-strokedark `}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        e.data.BrandImage ||
                        "https://www.tea-tron.com/antorodriguez/blog/wp-content/uploads/2016/04/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
                      }
                      alt="Brand"
                      width={348}
                      height={448}
                      className="w-14 h-14 bg-gray object-contain"
                    />
                  </div>
                  <p className="hidden text-black dark:text-white sm:block">
                    {e.data.BrandName}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">
                    {e.data.Brandtype}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">{e.data.denominationList}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p
                    className={cn(
                      "  uppercase text-meta-3",
                      e.data.stockAvailable == "true" ? "" : "text-red"
                    )}
                  >
                    {e.data.stockAvailable == "true" ? "Stock IN" : "Stock out"}
                  </p>
                </div>
                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white uppercase">
                    {formatDate((e.data.updated_at || "")?.toString())}
                  </p>
                </div>

                <div className=" items-center text-xl gap-6 justify-center p-2.5 flex xl:p-5">
                  <Link href={"/admin/giftcards/new/" + e._id}>
                    <AiOutlineEdit />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </TitleCard>
    </div>
  );
}

export default GyfterBrandsList;
