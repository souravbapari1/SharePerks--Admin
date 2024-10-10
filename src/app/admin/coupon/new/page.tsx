import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import { BrandData } from "@/interface/brand";
import { CategoryType } from "@/interface/categoty";
import { client } from "@/lib/request/actions";
import React from "react";
import NewCouponForm from "./NewCouponForm";

export const revalidate = 0;

async function page() {
  try {
    // Fetch categories
    const categories = await client
      .get("/api/v1/categories")
      .send<CategoryType[]>();

    // Fetch brands
    const brands = await client.get("/api/v1/brand/all").send<BrandData[]>();

    return (
      <WorkSpace menuGroups={menuGroups}>
        <Breadcrumb pageName="Create New Coupon" />
        <NewCouponForm brands={brands} categories={categories} />
      </WorkSpace>
    );
  } catch (error) {
    console.error("An error occurred while fetching data:", error);

    // Return an error UI
    return (
      <WorkSpace menuGroups={menuGroups}>
        <Breadcrumb pageName="Create New Coupon" />
        <div>Error loading data. Please try again later.</div>
      </WorkSpace>
    );
  }
}

export default page;
