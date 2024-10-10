import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TitleCard from "@/components/cards/TitleCard";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import { TCampaign } from "@/interface/cuelinks";
import { client } from "@/lib/request/actions";
import React from "react";
import CueLinks from "./CueLinks";

export const revalidate = 0;
async function page() {
  const data: TCampaign[] = await client.get("/api/v1/cuelinks").send();
  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Cuelinks Companies" />
      <CueLinks data={data} />
    </WorkSpace>
  );
}

export default page;
