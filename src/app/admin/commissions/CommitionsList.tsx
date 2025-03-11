"use client";
import TitleCard from "@/components/cards/TitleCard";
import { downloadExcel } from "@/helper/exceel";
import { CommotionData } from "@/interface/commition";
import { formatDate } from "@/lib/formateTime";
import Link from "next/link";
import { FaFileExcel } from "react-icons/fa";

const CommitionsList = ({
  title,
  data,
}: {
  title?: string;
  data: CommotionData[];
}) => {
  return (
    <TitleCard
      title={title || "All Commissions"}
      action={
        <div
          onClick={() => {
            downloadExcel(data, "commissions-shareperks");
          }}
          className="bg-green-800  text-white py-1 w-30 flex cursor-pointer justify-center items-center gap-2 rounded-lg text-sm px-4"
        >
          <FaFileExcel /> Export
        </div>
      }
    >
      <div className="max-w-full overflow-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                User
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Info
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                User CashBack
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Provider CashBack
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Order Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="text-xs">Date: {formatDate(item.createdAt)}</p>
                  <Link
                    href={"/admin/customers/" + item.userData._id}
                    className="font-medium text-black dark:text-white capitalize"
                  >
                    {item.userData.name}
                  </Link>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white text-sm">
                    <span className="font-extrabold"> {item.title}</span>
                    <br />
                    <span className="text-xs font-medium text-slate-400">
                      {item.subtitle}
                    </span>
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium  uppercase`}
                  >
                    {item.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {item.payAmount.toFixed(2)}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {(item.providerCommotion || 0).toFixed(2)}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {item.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
};

export default CommitionsList;
