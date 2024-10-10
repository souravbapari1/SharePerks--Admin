import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import React from "react";
import UpdateOfferForm from "./UpdateOfferForm";
import { client } from "@/lib/request/actions";
import { CategoryType } from "@/interface/categoty";
import { BrandData } from "@/interface/brand";
import { OfferData } from "@/interface/offers";

export const revalidate = 0;
async function page({ params }: { params: { id: string } }) {
  const categories = await client
    .get("/api/v1/categories")
    .send<CategoryType[]>();

  const brands = await client.get("/api/v1/brand/all").send<BrandData[]>();
  const offer = await client
    .get("/api/v1/offers/" + params.id)
    .send<OfferData>();

  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Update Offer" />
      <UpdateOfferForm brands={brands} categories={categories} offer={offer} />
    </WorkSpace>
  );
}

export default page;
