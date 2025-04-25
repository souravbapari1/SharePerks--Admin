import React from "react";
import Dashboard from "./dashboard";
import axios from "axios";

export const revalidate = 0;
async function page() {
  const data = await axios.get(
    "https://services.shareperks.in/api/payment/stats"
  );
  return <Dashboard payment={data.data} />;
}

export default page;
