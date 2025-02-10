"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import FailedList from "./FailedList";

export const revalidate = 0;
async function page() {
  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Failed Coupon Orders" />
      <FailedList />
    </WorkSpace>
  );
}

export default page;
