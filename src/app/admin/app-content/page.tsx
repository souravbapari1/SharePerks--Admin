import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TitleCard from "@/components/cards/TitleCard";
import TextEditor from "@/components/Inputs/TextEditor";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import React from "react";
import AppContentForm from "./AppContentForm";
import { client } from "@/lib/request/actions";
import { AppContentData } from "@/interface/appcontent";
import { pageData } from "./pageData";

export const revalidate = 0;
async function AppContent() {
  const privacyPolicy = await client
    .get("/api/v1/appcontent/" + pageData.privacypolicy)
    .send<AppContentData>();
  const taq = await client
    .get("/api/v1/appcontent/" + pageData.termsandconditions)
    .send<AppContentData>();
  const htr = await client
    .get("/api/v1/appcontent/" + pageData.howtoredeem)
    .send<AppContentData>();

  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="App Content" />
      <AppContentForm htr={htr} privacyPolicy={privacyPolicy} taq={taq} />
    </WorkSpace>
  );
}

export default AppContent;
