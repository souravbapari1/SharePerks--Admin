import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import { BrandData } from "@/interface/brand";
import { CategoryType } from "@/interface/categoty";
import { client } from "@/lib/request/actions";
import React from "react";
import UpdateBrandForm from "./UpdateBrandForm";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
export const revalidate = 0;
async function page({ params }: { params: { id: string } }) {
  let categories: CategoryType[];
  let brand: BrandData;

  try {
    categories = await client.get("/api/v1/categories").send<CategoryType[]>();
    brand = await client.get("/api/v1/brand/" + params.id).send<BrandData>();
  } catch (error) {
    return (
      <>
        <p>404 Not Found</p>
      </>
    );
  }

  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Update Brand" />
      <UpdateBrandForm id={params.id} brand={brand} categories={categories} />
    </WorkSpace>
  );
}

export default page;
