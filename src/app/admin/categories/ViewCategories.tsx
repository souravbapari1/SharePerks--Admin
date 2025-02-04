import { downloadExcel } from "@/helper/exceel";
import { CategoryType } from "@/interface/categoty";
import { formatDate } from "@/lib/formateTime";
import { client } from "@/lib/request/actions";
import { toast } from "material-react-toastify";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { SiMicrosoftexcel } from "react-icons/si";
import Swal from "sweetalert2";

function ViewCategories({
  data,
  onAction,
  setUpdate,
}: {
  data: CategoryType[];
  onAction: Function;
  setUpdate: Function;
}) {
  const onDelete = async (id: string) => {
    setUpdate(null);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await client
            .delete("/api/v1/categories/" + id)
            .json({})
            .send({
              Authorization: "Bearer " + localStorage.getItem("token") || "",
            });
          onAction();
          Swal.fire({
            title: "Deleted!",
            text: "Your Category has been deleted.",
            icon: "success",
          });
        } catch (error: any) {
          console.log(error);
          toast.error(error.response.message || error.message);
        }
      }
    });
  };

  return (
    <div className="rounded-sm border lg:col-span-2 border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div
        onClick={() => {
          downloadExcel(data, "category-shareperks");
        }}
        className="bg-green-800  text-white py-1 w-30 flex cursor-pointer justify-center items-center gap-2 rounded-lg text-sm px-4"
      >
        <SiMicrosoftexcel /> Export
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Package
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                CreateAt
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => {
              return (
                <tr key={e._id}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {e.name}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {formatDate(e.createdAt)}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-6">
                      <button
                        className="hover:text-primary"
                        onClick={() => {
                          setUpdate(e);
                        }}
                      >
                        <AiOutlineEdit />
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() => onDelete(e._id)}
                      >
                        <RiDeleteBin5Line />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <br />
    </div>
  );
}

export default ViewCategories;
