"use client";
import { client } from "@/lib/request/actions";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { LogData } from "./logs";
import { JsonView } from "react-json-view-lite";
import Image from "next/image";
import { BiLoader } from "react-icons/bi";

function ClicksLogs() {
  const [page, setPage] = useState(1);
  const query = useQuery(["clicksLogs", page], async () => {
    return await client
      .get("/api/v1/tracker/click-activity", {
        page: page,
      })
      .send<LogData>();
  });

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-4">
        {query.data?.data.map((e, i) => (
          <div className="">
            <LogDataView data={e} key={e._id} />
          </div>
        ))}
      </div>
      {query.data?.totalPages != 1 && (
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
            {Array.from(Array(query.data?.totalPages).keys()).map((e) => {
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
            })}
          </ul>
          {(query.data?.totalPages || 0) > page && (
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
      )}
    </div>
  );
}

export default ClicksLogs;

function LogDataView({ data }: { data: LogData["data"][number] }) {
  const [open, setOpen] = useState(false);
  const e = data;
  return (
    <div className="bg-white w-full p-4 mb-2">
      <div
        className="flex justify-between items-center"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="capitalize flex justify-start items-center gap-5">
          <Image
            alt=""
            src={client.baseUrl + "/" + e.userData.image}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full border-2 shadow-1"
          />
          <div className="">
            <p>{e.title}</p>
            <p>{e.description}</p>
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <p>
            {e.timeQuery.dayOfMonth}-{e.timeQuery.monthName.short}-
            {e.timeQuery.year}
          </p>
          <p>
            {e.timeQuery.hour}:{e.timeQuery.minute} {e.timeQuery.ampm}
          </p>
        </div>
      </div>
      {open && (
        <div className="bg-white w-full py-4 mb-2">
          <JsonView data={e.data} clickToExpandNode />
        </div>
      )}
    </div>
  );
}
