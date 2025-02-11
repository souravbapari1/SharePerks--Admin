"use client";
import TitleCard from "@/components/cards/TitleCard";
import Input from "@/components/Inputs/Input";
import { client } from "@/lib/request/actions";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { RewardData } from "./rewards";
import { toast } from "material-react-toastify";

function ManageRewards() {
  const [refererReward, setRefererReward] = useState(0);
  const [referralReward, setReferralReward] = useState(0);

  // Fetch existing rewards
  useQuery({
    queryKey: ["referralRewards"],
    queryFn: async () => {
      const data = await client
        .get("/api/v1/transition/referral/reward")
        .send<RewardData>();
      return data;
    },
    onSuccess: (data) => {
      setRefererReward(data.refererAmount);
      setReferralReward(data.referralAmount);
    },
  });

  // Mutation for updating rewards
  const update = useMutation({
    mutationFn: async () => {
      return await client
        .put("/api/v1/transition/referral/reward")
        .json({
          refererAmount: refererReward,
          referralAmount: referralReward,
        })
        .send();
    },
    onSuccess: () => {
      toast.success("Successfully updated");
    },
    onError: () => {
      toast.error("Error updating");
    },
  });

  return (
    <TitleCard
      title="Manage Rewards"
      action={
        <button
          className="bg-primary text-white px-4 py-1"
          onClick={() => update.mutate()}
        >
          Save
        </button>
      }
    >
      <div className="p-8 grid grid-cols-2 gap-8">
        <div>
          <Input
            label="Referer Reward"
            placeholder="Enter Referer Reward"
            value={refererReward}
            onChange={(e) => setRefererReward(Number(e.target.value))}
          />
        </div>
        <div>
          <Input
            label="Referral Reward"
            placeholder="Enter Referral Reward"
            value={referralReward}
            onChange={(e) => setReferralReward(Number(e.target.value))}
          />
        </div>
      </div>
    </TitleCard>
  );
}

export default ManageRewards;
