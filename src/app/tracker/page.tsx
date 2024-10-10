import { client } from "@/lib/request/actions";
import React from "react";
import TrackerView from "./TrackerView";

export const revalidate = 0;
async function page({
  searchParams,
}: {
  searchParams: { type: string; id: string; user: string };
}) {
  try {
    const link = await client
      .get(
        "/api/v1/tracker/" +
          searchParams.id +
          "/" +
          searchParams.type +
          "/" +
          searchParams.user
      )
      .send<string>();
    return <TrackerView link={link} />;
  } catch (error) {
    console.log(error);

    return <div>Invalid Tracking Link....</div>;
  }
}

export default page;
