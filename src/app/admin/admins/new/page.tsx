"use client";

import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import React from "react";
import AddNewAdmin from "./AddNewAdmin";

function page() {
  return (
    <WorkSpace menuGroups={menuGroups}>
      <AddNewAdmin />
    </WorkSpace>
  );
}

export default page;
