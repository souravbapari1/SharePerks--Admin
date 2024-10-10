"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import React, { useEffect, useState } from "react";
import ViewCategories from "./ViewCategories";
import AddCategories from "./AddCategories";
import { CategoryType } from "@/interface/categoty";
import { client } from "@/lib/request/actions";
import Loader from "@/app/loading";

function page() {
  const [onAction, setOnAction] = useState(0);
  const [data, setData] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updateCategory, setUpdateCategory] = useState<CategoryType | null>(
    null
  );

  const loadData = async () => {
    try {
      const getData: CategoryType[] = await client
        .get("/api/v1/categories")
        .send();
      setData(getData);
      setLoading(false);
    } catch (error) {
      setData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [onAction]);

  if (loading) {
    return <Loader />;
  }

  const setAction = () => {
    setOnAction(onAction + 1);
  };

  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Categories" />
      <div className="grid lg:grid-cols-3 gap-8 relative">
        <ViewCategories
          data={data}
          onAction={setAction}
          setUpdate={setUpdateCategory}
        />
        <AddCategories
          onAction={setAction}
          update={updateCategory}
          setUpdate={setUpdateCategory}
        />
      </div>
    </WorkSpace>
  );
}

export default page;
