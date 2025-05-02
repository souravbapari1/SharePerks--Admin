import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import React from "react";
import GiftCardsList from "./GiftCardsList";

function page() {
  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Pinelabs GiftCards Cards" />
      <GiftCardsList />
    </WorkSpace>
  );
}

export default page;
