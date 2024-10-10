import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import { GyftrBrands } from "@/interface/gyftr";
import { client } from "@/lib/request/actions";
import React from "react";
import GyfterBrandsList from "./GyfterBrandsList";

export const revalidate = 0;
async function page() {
  const data = await client
    .get("/api/v1/giftcard/vouchagram/brands")
    .send<GyftrBrands[]>();
  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Gyftr Brands" />
      <GyfterBrandsList data={data} />
    </WorkSpace>
  );
}

export default page;
