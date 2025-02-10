"use client";
import TitleCard from "@/components/cards/TitleCard";
import Input from "@/components/Inputs/Input";
import React from "react";

function ManageRewards() {
  return (
    <TitleCard
      title="Manage Rewards"
      action={<button className="bg-primary text-white px-4 py-1">Save</button>}
    >
      <div className="p-8 grid grid-cols-3 gap-8">
        <div className="">
          <Input label="Referer Reward" placeholder="Enter Referer Reward" />
        </div>
        <div className="">
          <Input label="Referral Reward" placeholder="Enter Referral Reward" />
        </div>
        <div className="">
          <Input
            label="Holding Reward %"
            placeholder="Enter Holding Reward %"
          />
        </div>
      </div>
    </TitleCard>
  );
}

export default ManageRewards;
