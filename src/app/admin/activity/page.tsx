import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import React from "react";
import ClicksLogs from "./ClicksLogs";

function page() {
  return (
    <WorkSpace menuGroups={menuGroups}>
      <ClicksLogs />
    </WorkSpace>
  );
}

export default page;
