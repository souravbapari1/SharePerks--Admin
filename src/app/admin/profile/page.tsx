"use client";

import Loader from "@/app/loading";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import { AdminUser } from "@/interface/admin";
import { client } from "@/lib/request/actions";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function page() {
  const [user, setUser] = useState<AdminUser["user"]>();

  useEffect(() => {
    const userData = localStorage.getItem("admin");
    setUser(JSON.parse(userData || ""));
  }, []);
  if (!user) {
    return <Loader />;
  }
  return (
    <WorkSpace menuGroups={menuGroups}>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Profile" />
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="relative z-20 h-35 md:h-65">
            <Image
              src={"/images/cover/cover-01.png"}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
              width={970}
              height={260}
              style={{
                width: "auto",
                height: "auto",
              }}
            />
          </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2 w-full h-full">
                <Image
                  src={`${client.baseUrl}/${user?.image}`}
                  width={1600}
                  height={1600}
                  className="w-full h-full object-cover rounded-full"
                  alt="profile"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {user?.name}
              </h3>
              <p className="font-medium">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </WorkSpace>
  );
}

export default page;
