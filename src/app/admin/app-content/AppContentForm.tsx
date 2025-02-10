"use client";

import TitleCard from "@/components/cards/TitleCard";
import TextEditor from "@/components/Inputs/TextEditor";
import { AppContentData } from "@/interface/appcontent";
import React, { useState } from "react";
import { pageData } from "./pageData";
import { toast } from "material-react-toastify";
import { client } from "@/lib/request/actions";
import { cn } from "@/lib/utils";

function AppContentForm({
  htr,
  privacyPolicy,
  taq,
  faq,
}: {
  privacyPolicy: AppContentData;
  taq: AppContentData;
  htr: AppContentData;
  faq: AppContentData;
}) {
  const [privacy, setPrivacy] = useState<string>(privacyPolicy.data || "");
  const [utaq, setUtaq] = useState<string>(taq.data || "");
  const [uhtr, setUhtr] = useState<string>(htr.data || "");
  const [ufaq, setFaq] = useState<string>(faq.data || "");

  const [loading, setLoading] = useState(false);
  const updateData = async (id: string, data: string) => {
    if (loading) {
      return false;
    }
    try {
      setLoading(true);
      const userData = await client
        .post("/api/v1/appcontent/" + id)
        .json({ data: data })
        .send();
      setLoading(false);
      toast.success("Content save successfully");
    } catch (error: any) {
      console.log(error);
      setLoading(false);

      toast.error(error.message || "Error on update Data");
    }
  };

  return (
    <div>
      <TitleCard
        title="App Privacy Policy"
        action={
          <div
            onClick={() => {
              updateData(pageData.privacypolicy, privacy);
            }}
            className={cn(
              "bg-green-800 cursor-pointer  text-white py-1 flex justify-center items-center gap-2 rounded-lg text-sm px-4",
              loading && "opacity-10"
            )}
          >
            Save
          </div>
        }
      >
        <TextEditor content={privacy} onChange={setPrivacy} />
      </TitleCard>
      <br />
      <TitleCard
        title="Terms And Conditions"
        action={
          <div
            onClick={() => {
              updateData(pageData.termsandconditions, utaq);
            }}
            className={cn(
              "bg-green-800 cursor-pointer  text-white py-1 flex justify-center items-center gap-2 rounded-lg text-sm px-4",
              loading && "opacity-10"
            )}
          >
            Save
          </div>
        }
      >
        <TextEditor content={utaq} onChange={setUtaq} />
      </TitleCard>
      <br />
      <TitleCard
        title="How To Redeem"
        action={
          <div
            onClick={() => {
              updateData(pageData.howtoredeem, uhtr);
            }}
            className={cn(
              "bg-green-800 cursor-pointer  text-white py-1 flex justify-center items-center gap-2 rounded-lg text-sm px-4",
              loading && "opacity-10"
            )}
          >
            Save
          </div>
        }
      >
        <TextEditor content={uhtr} onChange={setUhtr} />
      </TitleCard>
      <br />
      <TitleCard
        title="Faq"
        action={
          <div
            onClick={() => {
              updateData(pageData.faq, ufaq);
            }}
            className={cn(
              "bg-green-800 cursor-pointer  text-white py-1 flex justify-center items-center gap-2 rounded-lg text-sm px-4",
              loading && "opacity-10"
            )}
          >
            Save
          </div>
        }
      >
        <TextEditor content={ufaq} onChange={setFaq} />
      </TitleCard>
    </div>
  );
}

export default AppContentForm;
