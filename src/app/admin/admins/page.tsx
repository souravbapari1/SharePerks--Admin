"use client";
import Loader from "@/app/loading";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TitleCard from "@/components/cards/TitleCard";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import { AdminUser } from "@/interface/admin";
import { formatDate } from "@/lib/formateTime";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";

function page() {
  const session = useSession();

  const adminsData = useQuery({
    initialData: [],
    queryKey: ["admins"],
    queryFn: async () => {
      return await client
        .get("/api/v1/auth/admin")
        .send<AdminUser["user"][]>(AdminAuthToken());
    },
  });

  const deleteMutate = useMutation({
    mutationKey: ["admins_delete"],
    mutationFn: async (id: string) => {
      return await client
        .delete("/api/v1/auth/admin/" + id)
        .send(AdminAuthToken());
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "Admin Delete successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
      adminsData.refetch();
    },
    onError: (error: any) => {
      Swal.fire({
        title: "Error",
        text: error.response.message || "Something went wrong",
        icon: "error",
        confirmButtonText: "Ok",
      });
    },
  });

  if (adminsData.isLoading) {
    return (
      <WorkSpace menuGroups={menuGroups}>
        <Loader />
      </WorkSpace>
    );
  } else if (adminsData.isError) {
    return <p>Error on load admins list</p>;
  }

  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Admin Management" />
      <TitleCard title="Admins">
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
                Create At
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Permissions
              </h5>
            </div>

            <div className=" p-2.5 text-center  xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div>

          {adminsData.data?.map((e) => {
            return (
              <div
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
                  <p className="text-meta-3">{formatDate(e.createdAt || "")}</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">
                    {e.role == "ADMIN" ? "Supper" : e?.permissions?.length}{" "}
                    Permissions
                  </p>
                </div>

                <div className=" items-center justify-center p-2.5 flex xl:p-5 gap-8">
                  <Link
                    href={`/admin/admins/update/${e._id}`}
                    className="text-meta-5"
                  >
                    <BiEdit size={30} />
                  </Link>
                  {e.role != "ADMIN" && (
                    <>
                      {session.data?.user?.email != e.email && (
                        <p
                          className="text-red cursor-pointer"
                          onClick={() => {
                            const cinfirm = window.confirm("Are you sure?");
                            if (cinfirm) {
                              deleteMutate.mutate(e!._id!);
                            }
                          }}
                        >
                          <MdDeleteForever size={30} />
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}

          <br />
        </div>
      </TitleCard>
    </WorkSpace>
  );
}

export default page;
