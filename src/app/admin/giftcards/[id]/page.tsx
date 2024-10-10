import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import React from "react";
import UpdateGiftCardForm from "./UpdateGiftCardForm";
import { client } from "@/lib/request/actions";
import { GiftCardData } from "@/interface/giftcard";
import { BrandData } from "@/interface/brand";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
export const revalidate = 0;
async function page({ params }: { params: { id: string } }) {
  try {
    const data = await client
      .get("/api/v1/giftcard/" + params.id)
      .send<GiftCardData>();
    // Fetch brands
    const brands = await client.get("/api/v1/brand/all").send<BrandData[]>();
    return (
      <WorkSpace menuGroups={menuGroups}>
        <Breadcrumb pageName="Update Gift Card" />
        <UpdateGiftCardForm brands={brands} data={data} />
      </WorkSpace>
    );
  } catch (error: any) {
    return (
      <WorkSpace menuGroups={menuGroups}>
        <Breadcrumb pageName="Update Gift Card" />
        <div>Error loading data. Please try again later.</div>
        <p> {error.toString()}</p>
      </WorkSpace>
    );
  }
}

export default page;
