import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import React from "react";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CouponList from "./CouponList";

function Offers() {
  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="All Coupons" />
      <CouponList />
    </WorkSpace>
  );
}

export default Offers;
