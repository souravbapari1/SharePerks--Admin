import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import React from "react";
import ManageRewards from "./ManageRewards";
import ManageReferStep from "./ManageReferlStep";

function page() {
  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Manage Rewards" />
      <ManageRewards />
      <br />
      <ManageReferStep />
    </WorkSpace>
  );
}

export default page;
