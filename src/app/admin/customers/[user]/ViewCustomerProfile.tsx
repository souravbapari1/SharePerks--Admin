"use client";

import { LogType, statusColors } from "@/constents";
import Loader from "@/app/loading";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TitleCard from "@/components/cards/TitleCard";
import { UserProfileFullData, UserProfileInfo } from "@/interface/user";
import { formatDate } from "@/lib/formateTime";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { toast } from "material-react-toastify";
import Image from "next/image";
import { useEffect, useState } from "react";
import { JsonView, darkStyles, collapseAllNested } from "react-json-view-lite";
import { CommotionData } from "@/interface/commition";

function ViewCustomerProfile({ user }: { user: string }) {
  const [loading, setLoading] = useState(true);
  const [loadingTask, setLoadingTask] = useState(false);

  const [data, setdata] = useState<UserProfileFullData | null>(null);
  const [commition, setCommition] = useState<CommotionData[]>([]);
  const loadUsers = async () => {
    try {
      const usesData = await client
        .get("api/v1/user/" + user)
        .send<UserProfileFullData>(AdminAuthToken());

      const commitionData = await client
        .get("api/v1/transition/" + user)
        .send<CommotionData[]>(AdminAuthToken());
      setCommition(commitionData);
      setdata(usesData);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updatePayout = async (id: string, status: string) => {
    try {
      setLoadingTask(true);
      const task = await client
        .put("/api/v1/payout/" + id)
        .json({ status })
        .send<{ status: boolean; message: string }>(AdminAuthToken());

      // Add A Log
      await client
        .post("/api/v1/log")
        .json({
          title: `${data?.user.name} payout ${status}`,
          type: LogType.PAYOUT_ACTIVITY,
          description: `${data?.user.mobile} Update Payment By Admin`,
          user: data?.user._id,
          data: task,
        })
        .send(AdminAuthToken());
      setLoadingTask(false);
      toast.success(task.message);
      await loadUsers(); //for refresh data
      console.log(task);
    } catch (error: any) {
      console.log(error);
      setLoadingTask(false);
      toast.error(error?.response.message || error.message);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!loading && data == null) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <h1>No User Found!</h1>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb pageName={data?.user.name || ""} />
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="">
          <TitleCard title="Profile Info">
            <div className="p-6 flex flex-col gap-2">
              <Image
                src={client.baseUrl + "/" + data?.user.image}
                width={120}
                height={120}
                alt=""
                className="mb-4 w-20 h-20"
              />
              <p className="capitalize">Name: {data?.user.name}</p>
              <p>Email: {data?.user.email}</p>
              <p>Mobile No: {data?.user.mobile}</p>
              <p>Refer Code: {data?.user.referCode}</p>
              <p>Balance: {data?.user.walletAmount}</p>
              <p>
                Broker Connected: {data?.user.brokerConnected ? "YES" : "NO"}
              </p>
              <p>
                Join At:{" "}
                {formatDate(data?.user.createdAt || Date.now().toString())}{" "}
              </p>
            </div>
          </TitleCard>
          <br />
          <TitleCard title="Bank Accounts">
            <div className="p-6">
              {data?.banks.map((e) => {
                return (
                  <div
                    key={e._id}
                    className="  px-4 py-3 rounded-md mb-3 bg-gray dark:bg-slate-700"
                  >
                    <p>Bank Name: {e.name}</p>
                    <p>Bank Ifsc: {e.ifscCode}</p>
                    <p>Account Number: {e.accountNumber}</p>
                  </div>
                );
              })}
            </div>
          </TitleCard>
          <br />
          <TitleCard title="Holdings">
            <div className="p-3 bg-[#002b36]">
              <JsonView
                data={data?.holdings?.data || {}}
                shouldExpandNode={collapseAllNested}
                style={darkStyles}
              />
            </div>
          </TitleCard>
          <br />
          <div className="">
            <TitleCard title="User Communions">
              <div className="p-5">
                {commition.map((e) => {
                  return (
                    <div
                      key={e._id}
                      className="px-4 py-3 rounded-md mb-3 bg-gray dark:bg-slate-700"
                    >
                      <p className="text-xl font-bold"> {e?.title}</p>
                      <p>{e?.subtitle}</p>
                      <p>Amount: {e?.amount.toFixed(2)}</p>
                      <p className="uppercase font-bold">{e?.status}</p>

                      <p className="text-sm">{formatDate(e.createdAt)}</p>
                    </div>
                  );
                })}
              </div>
            </TitleCard>
          </div>
        </div>
        <div className="">
          <TitleCard title="Payout Request">
            <div className="p-5">
              {data?.payouts.map((e) => {
                return (
                  <div
                    key={e._id}
                    className="  px-4 py-3 rounded-md mb-3 bg-gray "
                    style={{ backgroundColor: statusColors[e.status] }}
                  >
                    <div className="flex justify-between ">
                      <div className="">
                        <p className="capitalize">status: {e.status}</p>
                        <p className="mb-4">
                          <b>Amount: {e.amount}</b>
                        </p>
                      </div>
                      <select
                        className="h-7 px-2 rounded-lg text-sm"
                        disabled={loadingTask}
                        onChange={(s) => updatePayout(e._id, s.target.value)}
                      >
                        <option
                          value="pending"
                          selected={e.status == "pending"}
                        >
                          Pending
                        </option>
                        <option
                          value="complete"
                          selected={e.status == "complete"}
                        >
                          Complete
                        </option>
                        <option value="failed" selected={e.status == "failed"}>
                          Failed
                        </option>
                        <option value="cancel" selected={e.status == "cancel"}>
                          Cancel
                        </option>
                      </select>
                    </div>
                    <p>Bank Name: {e.bank.name}</p>
                    <p>Bank Ifsc: {e.bank.ifscCode}</p>
                    <p>Account Number: {e.bank.accountNumber}</p>
                    <p>Request Date: {formatDate(e.createdAt)}</p>
                  </div>
                );
              })}
            </div>
          </TitleCard>
          <br />
          <TitleCard title="User Activity Logs">
            <div className="p-5 ">
              {data?.logs.map((e) => {
                return (
                  <div
                    key={e._id}
                    className="p-4 rounded-xl bg-gray/50 dark:bg-slate-700 mb-3"
                  >
                    <p className="capitalize font-bold">{e.title}</p>
                    <p className="text-sm mb-2 capitalize">{e.description}</p>
                    <p className="text-xs">{formatDate(e.createdAt)}</p>
                  </div>
                );
              })}
            </div>
          </TitleCard>
        </div>
      </div>
    </div>
  );
}

export default ViewCustomerProfile;
