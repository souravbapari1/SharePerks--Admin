"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TitleCard from "@/components/cards/TitleCard";
import TextEditor from "@/components/Inputs/TextEditor";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { sendEmail } from "./actions";
import { toast } from "material-react-toastify";
import SelectUsersList from "../push-notification/SelectUsersList";
import { UserProfileInfo } from "@/interface/user";

function page() {
  const [users, setUsers] = useState<UserProfileInfo[]>([]);
  const [content, setContent] = useState("");
  const mutate = useMutation({
    mutationFn: async () => {
      const req = await fetch("http://worker.shareperks.in/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: users,
          body: content,
          users: users.map((e) => e._id),
        }),
      });
      const res = await req.json();
      return res;
    },
    onSuccess: () => {
      toast.success("Email Sent Successfully");
      setContent("");
    },
    onError: () => {
      toast.error("Failed to send email");
    },
  });

  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Email Alerts" />
      <div className="grid grid-cols-2 gap-5">
        <TitleCard
          title="Email Alerts"
          action={
            <button
              disabled={mutate.isLoading}
              className="bg-primary px-4 py-1 text-white rounded-xl"
              onClick={() => {
                mutate.mutate();
              }}
            >
              {mutate.isLoading ? "Sending..." : "Send Email"}
            </button>
          }
        >
          <TextEditor content={content} onChange={setContent} />
        </TitleCard>
        <SelectUsersList setUsers={setUsers} users={users} />
      </div>
    </WorkSpace>
  );
}

export default page;
