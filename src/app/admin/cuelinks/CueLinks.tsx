"use client";
import TitleCard from "@/components/cards/TitleCard";
import { TCampaign } from "@/interface/cuelinks";
import React, { memo, useState } from "react";
import ListItem from "./ListItem";
import Input from "@/components/Inputs/Input";

function CueLinks({ data }: { data: TCampaign[] }) {
  const [cuelinkData, setCuelinkData] = useState(data);
  const searchCampaignByName = (
    campaigns: TCampaign[],
    campaignName: string
  ): TCampaign[] => {
    // Split the input string into words and convert to lowercase
    const searchWords = campaignName.toLowerCase().split(" ");

    return campaigns.filter((campaign) =>
      searchWords.some((word) =>
        campaign.data.name.toLowerCase().includes(word)
      )
    );
  };

  return (
    <TitleCard
      title="All Companies"
      action={
        <>
          <Input
            className="w-60 h-10"
            placeholder="Search By Brand.."
            onChange={(e) => {
              if (e.target.value.trim().length == 0) {
                setCuelinkData(data);
              } else {
                const searchData = searchCampaignByName(
                  data,
                  e.target.value.trim()
                );
                setCuelinkData(searchData || []);
              }
            }}
          />
        </>
      }
    >
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">ID</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Brand Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Payout Type
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Payout
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Last Update
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {cuelinkData.map((e) => {
          return <ListItem data={e} key={e._id} />;
        })}
      </div>
    </TitleCard>
  );
}

export default memo(CueLinks);
