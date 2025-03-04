"use client";
import TitleCard from "@/components/cards/TitleCard";
import { formatDate } from "@/lib/formateTime";
import { client } from "@/lib/request/actions";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { BiLoader } from "react-icons/bi";
import { useQuery } from "react-query";
import Export from "./expor";
import { OrderCouponsRoot } from "./order";

function FailedList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const query = useQuery({
    queryKey: ["failedCouponCodes", page, search],
    queryFn: async () => {
      return await client
        .get("/api/v1/giftcardorder/errors", {
          page,
          search,
          limit: 6,
        })
        .send<OrderCouponsRoot>();
    },
  });
  return (
    <TitleCard
      title="Failed Orders"
      action={
        <div className="flex justify-end items-center gap-3">
          <input
            className="border-gray border px-4 py-1 rounded-md"
            placeholder="Search.."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Export error={query.data} />
        </div>
      }
    >
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-100">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-left">
              <th className="p-3 border border-gray">User Info</th>
              <th className="p-3 border border-gray">Order ID</th>
              <th className="p-3 border border-gray">Provider</th>
              <th className="p-3 border border-gray">Amount</th>
              <th className="p-3 border border-gray">Retry</th>
              <th className="p-3 border border-gray">Refund</th>
              <th className="p-3 border border-gray">Payment ID</th>
              <th className="p-3 border border-gray text-center">Resolved</th>
              <th className="p-3 border border-gray">Date</th>
            </tr>
          </thead>
          <tbody>
            {query.data?.data.map((order) => (
              <tr key={order._id} className="border border-gray">
                <td className="p-3 border border-gray text-xs">
                  <p> {order.userData.name}</p>
                  <p>{order.userData.email}</p>
                  {order.userData.mobile}
                </td>

                <td className="p-3 border border-gray">
                  {order.orderID || order._id}
                </td>
                <td className="p-3 border border-gray">{order.provider}</td>
                <td className="p-3 border border-gray">{order.amount}</td>
                <td className="p-3 border text-center border-gray">
                  {order.retry ? "Yes" : "No"}
                </td>
                <td
                  className={cn(
                    "p-3 border text-center border-gray",
                    order.refund ? "text-green-500" : "text-red-500"
                  )}
                >
                  {order.refund ? "Yes" : "No"}
                </td>
                <td className="p-3 border border-gray">{order.paymentID}</td>
                <td
                  className={cn(
                    "p-3 border text-center border-gray",
                    order.resolved ? "text-green-500" : "text-red-500"
                  )}
                >
                  {order.resolved ? "Yes" : "No"}
                </td>
                <td className="p-3 border border-gray">
                  {formatDate(order.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-2">
        {page != 1 && (
          <button
            onClick={() => {
              setPage(page - 1);
            }}
            className="bg-gray-2 dark:bg-meta-4 text-sm rounded-lg px-4 py-2"
          >
            Prev
          </button>
        )}
        <ul className="flex justify-center items-center gap-4 py-4">
          {Array.from(Array(query.data?.metadata.totalPages).keys()).map(
            (e) => {
              return (
                <li
                  key={e}
                  onClick={() => {
                    setPage(e + 1);
                  }}
                  className={`${
                    page == e + 1 ? "bg-blue-600 text-white " : ""
                  } text-sm rounded-lg px-4 py-2 cursor-pointer`}
                >
                  {page == e + 1 ? (
                    <>
                      {query.isLoading ? (
                        <BiLoader className="animate-spin" size={14} />
                      ) : (
                        e + 1
                      )}
                    </>
                  ) : (
                    e + 1
                  )}
                </li>
              );
            }
          )}
        </ul>
        {(query.data?.metadata?.totalPages || 0) > page && (
          <button
            onClick={() => {
              setPage(page + 1);
            }}
            className="bg-gray-2 dark:bg-meta-4 text-sm rounded-lg px-4 py-2"
          >
            Next
          </button>
        )}
      </div>
    </TitleCard>
  );
}

export default FailedList;
