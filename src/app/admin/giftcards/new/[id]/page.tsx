import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import { GyftrBrands } from "@/interface/gyftr";
import { client } from "@/lib/request/actions";
import React from "react";
import CreateGiftCardForm from "./CreateGiftCardForm";
import { BrandData } from "@/interface/brand";

export const revalidate = 0;
async function page({ params }: { params: { id: string } }) {
  try {
    const data = await client
      .get("/api/v1/giftcard/vouchagram/brands/" + params.id)
      .send<GyftrBrands>();

    // Fetch brands
    const brands = await client.get("/api/v1/brand/all").send<BrandData[]>();
    return (
      <WorkSpace menuGroups={menuGroups}>
        <Breadcrumb pageName="Create Gift Card" />
        <CreateGiftCardForm brands={brands} data={data} />
      </WorkSpace>
    );
  } catch (error: any) {
    return (
      <WorkSpace menuGroups={menuGroups}>
        <Breadcrumb pageName="Create Gift Card" />
        <div>Error loading data. Please try again later.</div>
        <p> {error.toString()}</p>
      </WorkSpace>
    );
  }
}

export default page;
