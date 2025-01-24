"use client";
import Loader from "@/app/loading";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import { AdminUser } from "@/interface/admin";
import { AdminAuthToken, client } from "@/lib/request/actions";
import React from "react";
import { useQuery } from "react-query";
import UpdateAdmin from "./UpdateAdmin";

function page({ params }: { params: { id: string } }) {
  const id = params.id;
  const query = useQuery({
    queryKey: ["admins_update", id],
    queryFn: async () => {
      return await client
        .get("/api/v1/auth/admin/" + id)
        .send<AdminUser["user"]>(AdminAuthToken());
    },
  });
  console.log(query.data);

  if (query.isLoading) {
    return (
      <WorkSpace menuGroups={menuGroups}>
        <Loader />
      </WorkSpace>
    );
  }

  if (query.isError) {
    return <p>Error on load admins list</p>;
  }

  return (
    <WorkSpace menuGroups={menuGroups}>
      {query.data && <UpdateAdmin data={query.data} />}
    </WorkSpace>
  );
}

export default page;
