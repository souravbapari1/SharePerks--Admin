"use client";

import Loader from "@/app/loading";
import TitleCard from "@/components/cards/TitleCard";
import { downloadExcel } from "@/helper/exceel";
import { UserProfileInfo } from "@/interface/user";
import { formatDate } from "@/lib/formateTime";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { cn } from "@/lib/utils";
import { toast } from "material-react-toastify";
import { tree } from "next/dist/build/templates/app-page";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { BiLoader } from "react-icons/bi";
import { FaFileExcel } from "react-icons/fa";

import { useMutation } from "react-query";

const ShowCustomers = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setdata] = useState<{
    users: UserProfileInfo[];
    currentPage: string;
    totalPages: number;
    totalUsers: number;
  }>();
  const [search, setSearch] = useState("");
  const loadUsers = async () => {
    try {
      const usesData = await client
        .get(`api/v1/user/pagination/${page}/6`)
        .send<{
          users: UserProfileInfo[];
          currentPage: string;
          totalPages: number;
          totalUsers: number;
        }>(AdminAuthToken());
      setdata(usesData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const searchMutate = useMutation({
    mutationFn: async (search: string) => {
      return await client
        .get("api/v1/user/search/" + search)
        .send<UserProfileInfo[]>(AdminAuthToken());
    },
    onSuccess: (data) => {
      setdata({
        currentPage: 1,
        totalPages: 1,
        totalUsers: 1,
        users: data,
      } as any);
    },
    onError: (error) => {
      toast.error("Error: " + error);
      console.log(error);
    },
  });

  useEffect(() => {
    loadUsers();
  }, [page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length > 0) {
        searchMutate.mutate(search);
      } else {
        if (page != 1) {
          setPage(1);
        } else {
          loadUsers();
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  if (loading) {
    return <Loader />;
  }

  return (
    <TitleCard
      title="All Customers"
      action={
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search"
            value={search}
            className="w-full rounded-lg border border-stroke bg-gray-2 dark:bg-meta-4 p-2.5 text-sm"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <div
            onClick={() => {
              downloadExcel(data?.users || [], "users-shareperks");
            }}
            className="bg-green-800  text-white py-1 flex justify-center items-center gap-2 rounded-lg text-sm px-4"
          >
            <FaFileExcel /> Export
          </div>
        </div>
      }
    >
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Profile
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email ID
            </h5>
          </div>
          <div className="p-2.5 sm:block hidden text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Join At
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Wallet
            </h5>
          </div>
          <div className=" p-2.5 text-center  xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>

        {data?.users?.map((e) => {
          return (
            <div
              key={e._id}
              className={cn(
                `grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark`,
                e.isBlocked && "bg-red/10"
              )}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0 sm:flex hidden">
                  <Image
                    src={`${client.baseUrl}/${e.image}`}
                    alt="Brand"
                    className="w-11 h-11 object-cover rounded-full"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="">
                  <p className=" text-black capitalize dark:text-white ">
                    {e.name}
                  </p>
                  <p className="text-xs">{e.version || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{e.email}</p>
              </div>

              <div className="sm:flex hidden items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{formatDate(e.createdAt)}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{e.walletAmount}</p>
              </div>

              <div className=" items-center justify-center p-2.5 flex xl:p-5">
                <Link
                  href={`/admin/customers/${e._id}`}
                  className="text-meta-5"
                >
                  <AiFillEye size={30} />
                </Link>
              </div>
            </div>
          );
        })}
        <br />
      </div>
      {search.length == 0 && (
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
            {Array.from(Array(data?.totalPages).keys()).map((e) => {
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
                      {searchMutate.isLoading ? (
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
          {(data?.totalPages || 0) > page && (
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
    </TitleCard>
  );
};

export default ShowCustomers;
