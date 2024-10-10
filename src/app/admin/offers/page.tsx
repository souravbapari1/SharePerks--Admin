import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import React from "react";
import OffersList from "./OffersList";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { client } from "@/lib/request/actions";
import { Campaign } from "@/interface/cuelinks";

async function Offers() {
  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="All Offers" />
      <OffersList />
    </WorkSpace>
  );
}

export default Offers;
