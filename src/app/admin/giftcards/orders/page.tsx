import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import React from "react";
import GiftCardOrders from "./GiftCardOrders";

function page() {
  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Gift Card Orders" />
      <GiftCardOrders />
    </WorkSpace>
  );
}

export default page;
