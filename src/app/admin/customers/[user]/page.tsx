import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import React from "react";
import ViewCustomerProfile from "./ViewCustomerProfile";

function CustomersView({ params }: any) {
  return (
    <WorkSpace menuGroups={menuGroups}>
      <ViewCustomerProfile user={params.user} />
    </WorkSpace>
  );
}

export default CustomersView;
