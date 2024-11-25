"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";

import { useEffect, useState } from "react";

import { DashBoard } from "@/interface/dashboard";
import { AdminAuthToken, client } from "@/lib/request/actions";
import Loader from "@/app/loading";
import { WhoowProduct } from "@/interface/whoowProducts";
import ListWhoowProducts from "./ListWhoowProducts";

function page() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<WhoowProduct[]>([]);
  const loadData = async () => {
    try {
      setLoading(true);

      const dashData = await client
        .get("/api/v1/whoow/products")
        .send<WhoowProduct[]>(AdminAuthToken());
      setData(dashData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Whoow Products" />
      <ListWhoowProducts data={data} />
    </WorkSpace>
  );
}

export default page;
