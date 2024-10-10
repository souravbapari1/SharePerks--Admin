import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <WorkSpace menuGroups={menuGroups}>
      <p>Coming Soon ! Under Development</p>
      <Link href="/" className="underline text-primary mt-5 block">
        Go Home
      </Link>
    </WorkSpace>
  );
}

export default page;
