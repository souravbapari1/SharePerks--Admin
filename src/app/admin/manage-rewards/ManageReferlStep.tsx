"use client";
import Button from "@/components/buttons/Button";
import TitleCard from "@/components/cards/TitleCard";
import Input from "@/components/Inputs/Input";
import { client } from "@/lib/request/actions";
import { toast } from "material-react-toastify";
import React, { useState } from "react";
import { pageData } from "../app-content/pageData";
import { useQuery } from "react-query";
import { AppContentData } from "@/interface/appcontent";

interface ReferStep {
  value: string;
  error: string;
}

function ManageReferStep() {
  const data = useQuery({
    queryKey: ["refer"],
    queryFn: async () => {
      const data = await client
        .get("/api/v1/appcontent/" + pageData.refer)
        .send<AppContentData>();
      return data;
    },
    refetchOnWindowFocus: false,
    onSuccess(data) {
      if (data.data) {
        setReferSteps(
          data.data.map((e: any) => {
            return { value: e, error: "" };
          })
        );
      }
    },
  });

  const [referSteps, setReferSteps] = useState<ReferStep[]>([
    { value: "", error: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const updateData = async (id: string, data: any) => {
    if (loading) {
      return false;
    }
    try {
      setLoading(true);
      await client
        .post("/api/v1/appcontent/" + id)
        .json({ data: data })
        .send();
      setLoading(false);
      toast.success("Refer Content save successfully");
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error(error.message || "Error on update Data");
    }
  };

  const handleSave = () => {
    let valid = true;
    const newReferSteps = referSteps.map((step) => {
      if (step.value.trim() === "") {
        valid = false;
        return { ...step, error: "This field is required" };
      }
      return { ...step, error: "" };
    });

    setReferSteps(newReferSteps);

    if (valid) {
      // Handle save logic here
      updateData(
        pageData.refer,
        referSteps.map((e) => e.value)
      );
    }
  };

  const handleAddMore = () => {
    setReferSteps([...referSteps, { value: "", error: "" }]);
  };

  const handleChange = (index: number, value: string) => {
    const newReferSteps = referSteps.map((step, i) =>
      i === index ? { ...step, value } : step
    );
    setReferSteps(newReferSteps);
  };

  if (data.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <TitleCard
      title="Refer Steps"
      action={<button onClick={handleSave}>Save</button>}
    >
      <div className="p-5 flex flex-col gap-3">
        {referSteps.map((step, index) => (
          <div className="">
            <Input
              key={index}
              label={`Refer Step ${index + 1}`}
              placeholder={`Enter Refer Step ${index + 1}`}
              value={step.value}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
        <div className="">
          <Button onClick={handleAddMore}>Add More</Button>
        </div>
      </div>
    </TitleCard>
  );
}

export default ManageReferStep;
