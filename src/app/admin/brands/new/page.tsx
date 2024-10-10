import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import React from "react";
import AddBrandForm from "./AddBrandForm";
import { client } from "@/lib/request/actions";
import { CategoryType } from "@/interface/categoty";
import { Campaign } from "@/interface/cuelinks";

export const revalidate = 0;
async function AddBrand({
  searchParams,
}: {
  searchParams: { campaign?: string };
}) {
  let campaign: Campaign | undefined;
  const categories = await client
    .get("/api/v1/categories")
    .send<CategoryType[]>();

  if (searchParams.campaign) {
    try {
      const data = await client
        .get("/api/v1/cuelinks/" + searchParams.campaign)
        .send<{ data: Campaign }>();
      if (data) {
        campaign = data.data;
      } else {
        console.log("No data");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Add New Brand" />
      <AddBrandForm categories={categories} campaign={campaign} />
    </WorkSpace>
  );
}

export default AddBrand;
