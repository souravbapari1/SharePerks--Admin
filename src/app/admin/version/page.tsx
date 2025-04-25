"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/buttons/Button";
import TitleCard from "@/components/cards/TitleCard";
import Input from "@/components/Inputs/Input";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import { client, versionClient } from "@/lib/request/actions";
import { toast } from "material-react-toastify";
import React, { useState } from "react";
import { useMutation, useQueries, useQuery } from "react-query";

function page() {
  const [version, setversion] = useState("");

  const getversion = useQuery({
    queryKey: ["appVersion"],
    queryFn: async () => {
      const appVersion = await versionClient.get("/api/version/").send<{
        id: number;
        code: string;
        createdAt: string;
        updatedAt: string;
      }>();

      return { appVersion };
    },
    onSuccess(data) {
      setversion(data.appVersion.code);
    },
  });

  const update = useMutation({
    mutationKey: ["updateVersion"],
    mutationFn: async (data: { code: string }) => {
      const appVersion = await versionClient
        .post("/api/version")
        .json({ code: data.code })
        .send<{ status: boolean }>();

      return { appVersion };
    },
    onSuccess(data) {
      toast.success("Version Updated Successfully");
      getversion.refetch();
      console.log(data);
    },
    onError(error: any) {
      console.log(error);
      toast.error(error?.response?.message || error.message);
    },
  });

  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Version" />
      <TitleCard title="Version">
        <div className="p-5">
          <p>Current Version: {getversion.data?.appVersion.code}</p>
          <p>Last Updated: {getversion.data?.appVersion.updatedAt}</p>
          <br />
          <Input
            label="Version"
            value={version}
            onChange={(e) => setversion(e.target.value)}
          />
          <br />
          <br />

          <Button
            loading={update.isLoading}
            onClick={() => {
              update.mutate({ code: version });
            }}
          >
            Update Version
          </Button>
        </div>
      </TitleCard>
    </WorkSpace>
  );
}

export default page;
