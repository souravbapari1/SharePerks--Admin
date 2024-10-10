import { BrandData } from "@/interface/brand";
import { CategoryType } from "@/interface/categoty";
import { CouponData } from "@/interface/coupon";
import { client } from "@/lib/request/actions";
import React from "react";
import UpdateCouponForm from "./UpdateCouponForm";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";

export const revalidate = 0;
async function page({ params }: { params: { id: string } }) {
  try {
    // Fetch categories
    const categories = await client
      .get("/api/v1/categories")
      .send<CategoryType[]>();

    // Fetch brands
    const brands = await client.get("/api/v1/brand/all").send<BrandData[]>();

    // Fetch specific coupon
    const coupon = await client
      .get("/api/v1/coupon/" + params.id)
      .send<CouponData>();

    return (
      <WorkSpace menuGroups={menuGroups}>
        <UpdateCouponForm
          Coupon={coupon}
          brands={brands}
          categories={categories}
        />
      </WorkSpace>
    );
  } catch (error) {
    console.error("An error occurred while fetching data:", error);

    // You can return an error message or UI
    return (
      <WorkSpace menuGroups={menuGroups}>
        <div>Error loading data. Please try again later.</div>
      </WorkSpace>
    );
  }
}

export default page;
