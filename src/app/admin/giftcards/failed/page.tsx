import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TitleCard from "@/components/cards/TitleCard";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import { downloadExcel } from "@/helper/exceel";
import React from "react";
import { SiMicrosoftexcel } from "react-icons/si";
import { OrderCoupons } from "./order";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { client } from "@/lib/request/actions";
import Export from "./expor";

export const revalidate = 0;
async function page() {
  const data = await client
    .get("/api/v1/giftcardorder/errors")
    .send<OrderCoupons[]>();
  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Failed Coupon Orders" />
      <TitleCard title="Failed Orders" action={<Export error={data} />}>
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Order Id
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Provider
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Amount
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Retry
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Refund
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Payment Id
              </h5>
            </div>
          </div>
          {data.map((e) => {
            return <CouponOrdersList data={e} key={e._id} />;
          })}
        </div>
      </TitleCard>
    </WorkSpace>
  );
}

export default page;

function CouponOrdersList({ data }: { data: OrderCoupons }) {
  return (
    <div
      className={`grid grid-cols-3 sm:grid-cols-6 border-b border-stroke dark:border-strokedark `}
    >
      <div className="flex items-center gap-3 p-2.5 xl:p-5">
        <div className="flex-shrink-0">
          <p>{data.orderID || data._id}</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">{data.provider}</p>
      </div>
      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">{data.amount}</p>
      </div>
      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black">{data.retry ? "Yes" : "No"}</p>
      </div>
      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p
          className={cn(
            "  uppercase text-meta-3",
            data.refund ? "" : "text-red"
          )}
        >
          {data.refund ? "Yes" : "No"}
        </p>
      </div>
      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-black dark:text-white uppercase">{data.paymentID}</p>
      </div>
    </div>
  );
}
