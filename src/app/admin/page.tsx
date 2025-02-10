"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { isPermissionAllow, menuGroups } from "@/data/sidebardata";

import React, { useEffect, useState } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { LuBadgePercent, LuUser } from "react-icons/lu";
import { BsCashCoin } from "react-icons/bs";
import { GiClick } from "react-icons/gi";
import PayoutList from "./payouts/PayoutsList";
import PayoutStatusPi from "@/components/Charts/PayoutStatusChart";
import PaymentMatrixPi from "@/components/Charts/PaymentMatrix";
import CardDataStats from "@/components/cards/CardDataStats";
import TitleCard from "@/components/cards/TitleCard";
import { DashBoard } from "@/interface/dashboard";
import { AdminAuthToken, client } from "@/lib/request/actions";
import Loader from "../loading";
import { PiCardsBold } from "react-icons/pi";

function page() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashBoard>({
    inOutPi: {
      in: 0,
      out: 0,
    },
    liveUsers: 0,
    payoutPi: {
      cancel: 0,
      complete: 0,
      failed: 0,
      pending: 0,
    },
    totalClicks: 0,
    totalCommission: 0,
    totalPayoutPending: 0,
    totalSell: 0,
    totalUsers: 0,
    giftcards: {
      gifter: 0,
      whoow: 0,
      sucessOrders: 0,
    },
  });
  const loadData = async () => {
    try {
      setLoading(true);

      const dashData = await client
        .get("/api/v1/dashbord")
        .send<DashBoard>(AdminAuthToken());
      setData(dashData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="DashBoard" />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        <CardDataStats
          title="Total Users"
          total={data.totalUsers.toString()}
          icon={<LuUser />}
        />
        <CardDataStats
          title="Total Sell"
          total={data.totalSell.toString()}
          icon={<IoBagHandleOutline />}
        />
        <CardDataStats
          title="Withdraw Request"
          total={data.totalPayoutPending.toString()}
          icon={<BsCashCoin />}
        />
        <CardDataStats
          title="Total Commission"
          total={data.totalCommission.toString()}
          icon={<LuBadgePercent />}
        />
        <CardDataStats
          title="Live Users"
          total={data.liveUsers.toString()}
          icon={<LuUser />}
        />
        <CardDataStats
          title="Total Clicks"
          total={data.totalClicks.toString()}
          icon={<GiClick />}
        />
        <CardDataStats
          title="Whoow Gift Cards"
          total={data.giftcards.whoow.toString()}
          icon={<PiCardsBold />}
        />
        <CardDataStats
          title="Gifter Gift Cards"
          total={data.giftcards.gifter.toString()}
          icon={<PiCardsBold />}
        />
        <CardDataStats
          title="Total Gift Orders"
          total={data.giftcards.sucessOrders.toString()}
          icon={<PiCardsBold />}
        />
      </div>
      <br />

      <br />
      {isPermissionAllow("manage_payouts") && (
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="col-span-2">
            <PayoutList defaultStatus="pending" title="Payout Requests" />
          </div>
          <div className="">
            <TitleCard title="Pie Chart - Withdraw">
              <div className="p-5">
                <PayoutStatusPi
                  cancel={data.payoutPi.cancel}
                  complete={data.payoutPi.complete}
                  failed={data.payoutPi.failed}
                  pending={data.payoutPi.pending}
                />
              </div>
            </TitleCard>

            <br />
            <TitleCard title="Payment Matrix">
              <div className="p-5">
                <PaymentMatrixPi
                  inAmount={data.inOutPi.in}
                  out={data.inOutPi.out}
                />
              </div>
            </TitleCard>
          </div>
        </div>
      )}
      <br />
    </WorkSpace>
  );
}

export default page;
