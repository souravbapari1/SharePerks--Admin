import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import React from "react";
import GiftCardsList from "./GiftCardsList";
import { client } from "@/lib/request/actions";
import { GiftCardData } from "@/interface/giftcard";

export const revalidate = 0;
async function page() {
  const data = await client.get("/api/v1/giftcard/all").send<GiftCardData[]>();
  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Gift Cards" />
      <GiftCardsList data={data} />
    </WorkSpace>
  );
}

export default page;
