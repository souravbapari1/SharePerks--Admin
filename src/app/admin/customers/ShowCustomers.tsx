"use client";

import Loader from "@/app/loading";
import TitleCard from "@/components/cards/TitleCard";
import { downloadExcel } from "@/helper/exceel";
import { UserProfileInfo } from "@/interface/user";
import { formatDate } from "@/lib/formateTime";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { tree } from "next/dist/build/templates/app-page";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { SiMicrosoftexcel } from "react-icons/si";

const ShowCustomers = () => {
  const [loading, setLoading] = useState(true);
  const [data, setdata] = useState<UserProfileInfo[]>([]);
  const loadUsers = async () => {
    try {
      const usesData = await client
        .get("api/v1/user/all")
        .send<UserProfileInfo[]>(AdminAuthToken());
      setdata(usesData);
      console.log(usesData);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <TitleCard
      title="All Customers"
      action={
        <div
          onClick={() => {
            downloadExcel(data, "users-shareperks");
          }}
          className="bg-green-800  text-white py-1 flex justify-center items-center gap-2 rounded-lg text-sm px-4"
        >
          <SiMicrosoftexcel /> Export
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

        {data.map((e) => {
          return (
            <div
              key={e._id}
              className={`grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark`}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0 sm:flex hidden">
                  <Image
                    src={`${client.baseUrl}/${e.image}`}
                    alt="Brand"
                    className="w-full h-full object-cover rounded-full"
                    width={48}
                    height={48}
                  />
                </div>
                <p className=" text-black capitalize dark:text-white ">
                  {e.name}
                </p>
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
    </TitleCard>
  );
};

export default ShowCustomers;
