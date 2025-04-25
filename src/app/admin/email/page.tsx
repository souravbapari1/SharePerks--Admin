"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TitleCard from "@/components/cards/TitleCard";
import TextEditor from "@/components/Inputs/TextEditor";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import { UserProfileInfo } from "@/interface/user";
import axios from "axios";
import { toast } from "material-react-toastify";
import { useState } from "react";
import { useMutation } from "react-query";
import SelectUsersList from "../push-notification/SelectUsersList";

function page() {
  const [users, setUsers] = useState<UserProfileInfo[]>([]);
  const [content, setContent] = useState("");
  const mutate = useMutation({
    mutationFn: async () => {
      const data = await axios.post("https://worker.shareperks.in/mail", {
        body: content,
        to: users.filter((e) => e.emailAlerts == true).map((e) => e.email),
      });
      return data.data;
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
