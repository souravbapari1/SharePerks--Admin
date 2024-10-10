import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import React from "react";

function page() {
  return (
    <WorkSpace menuGroups={menuGroups}>
      <p>Coming Soon</p>
    </WorkSpace>
  );
}

export default page;
