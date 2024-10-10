import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import React from "react";
import ShowCustomers from "./ShowCustomers";

function Customers() {
  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Customers" />
      <ShowCustomers />
    </WorkSpace>
  );
}

export default Customers;
