import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import React from "react";
import CommitionsList from "./CommitionsList";
import { client } from "@/lib/request/actions";
import { CommotionData } from "@/interface/commition";

export const revalidate = 0;
async function page() {
  const data = await client
    .get("/api/v1/transition/all")
    .send<CommotionData[]>();
  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Commissions" />
      <CommitionsList data={data} />
    </WorkSpace>
  );
}

export default page;
