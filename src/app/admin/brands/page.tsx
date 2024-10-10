import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import React from "react";
import BrandsList from "./BrandsList";

export const revalidate = 0;
function Brands() {
  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Brands" />
      <BrandsList />
    </WorkSpace>
  );
}

export default Brands;
