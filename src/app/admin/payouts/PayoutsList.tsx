"use client";
import { LogType, statusColors } from "@/constents";
import Loader from "@/app/loading";
import TitleCard from "@/components/cards/TitleCard";
import { PayoutData } from "@/interface/payout";
import { UserProfileInfo } from "@/interface/user";
import { formatDate } from "@/lib/formateTime";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { toast } from "material-react-toastify";
import Link from "next/link";
import { useEffect, useState } from "react";

const PayoutList = ({
  defaultStatus = "all",
  title,
}: {
  defaultStatus?: string;
  title?: string;
}) => {
  const [status, setStatus] = useState(defaultStatus);
  const [loading, setLoading] = useState(true);
  const [loadingTask, setLoadingTask] = useState(false);

  const [data, setData] = useState<PayoutData[]>([]);

  const updatePayout = async (
    id: string,
    status: string,
    user?: UserProfileInfo
  ) => {
    try {
      setLoadingTask(true);
      const task = await client
        .put("/api/v1/payout/" + id)
        .json({ status })
        .send<{ status: boolean; message: string }>(AdminAuthToken());

      // Add A Log
      if (user) {
        await client
          .post("/api/v1/log")
          .json({
            title: `${user.name} payout ${status}`,
            type: LogType.PAYOUT_ACTIVITY,
            description: `${user.mobile} Update Payment By Admin`,
            user: user._id,
            data: task,
          })
          .send(AdminAuthToken());
      }
      setLoadingTask(false);

      toast.success(task.message);
      await loadBy();
      console.log(task);
    } catch (error: any) {
      console.log(error);
      setLoadingTask(false);
      toast.error(error?.response.message || error.message);
    }
  };

  useEffect(() => {
    loadBy();
  }, [status]);

  const loadPayoutsFilter = async () => {
    try {
      const usesData = await client
        .get("api/v1/payout/all/filter/" + status)
        .send<PayoutData[]>(AdminAuthToken());
      setData(usesData);
      console.log(usesData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getAllPayoutsRequest = async () => {
    try {
      const res = await client
        .get("api/v1/payout/all")
        .send<PayoutData[]>(AdminAuthToken());
      setData(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const loadBy = async () => {
    console.log(status);

    if (status == "all") {
      await getAllPayoutsRequest();
    } else {
      await loadPayoutsFilter();
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <TitleCard
      title={title || "All Requests"}
      action={
        <div className="flex justify-center items-center gap-2">
          <p>Filter By:</p>
          <select
            className="h-8 px-2 rounded-lg text-sm border bg-transparent border-gray dark:border-white/20"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
            <option value="failed">Failed</option>
            <option value="cancel">Cancel</option>
          </select>
        </div>
      }
    >
      <div className="max-w-full overflow-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                User Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Bank Info
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length == 0 ? (
              <div className=" p-10">No Requests Found</div>
            ) : null}
            {data.map((e) => (
              <tr key={e._id}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="text-xs">Date: {formatDate(e.createdAt)}</p>
                  <Link
                    href={"/admin/customers/" + e.userData?._id}
                    className="font-medium text-black dark:text-white capitalize"
                  >
                    {e.userData?.name}
                  </Link>
                  <p className="text-sm font-extrabold">
                    ₹ {e.amount.toFixed(2)}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white text-sm">
                    {e.bank.name}
                    <br />
                    <span className="font-bold">{e.bank.accountNumber}</span>
                    <br />
                    <span className="text-xs font-medium text-slate-600">
                      {e.bank.ifscCode}
                    </span>
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium dark:text-black uppercase`}
                    style={{ backgroundColor: statusColors[e.status] }}
                  >
                    {e.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <select
                    disabled={loadingTask}
                    className="h-8 px-2 rounded-lg text-sm border bg-transparent border-gray dark:border-white/20"
                    onChange={(s) =>
                      updatePayout(e._id, s.target.value, e.userData)
                    }
                  >
                    <option value="pending" selected={e.status == "pending"}>
                      Pending
                    </option>
                    <option value="complete" selected={e.status == "complete"}>
                      Complete
                    </option>
                    <option value="failed" selected={e.status == "failed"}>
                      Failed
                    </option>
                    <option value="cancel" selected={e.status == "cancel"}>
                      Cancel
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
};

export default PayoutList;