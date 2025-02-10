import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import React from "react";
import ManageRewards from "./ManageRewards";

function page() {
  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Manage Rewards" />
      <ManageRewards />
    </WorkSpace>
  );
}

export default page;
