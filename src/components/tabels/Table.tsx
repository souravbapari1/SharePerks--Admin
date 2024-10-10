import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

function Table() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-2 dark:bg-meta-4">
          <tr>
            <th className="p-2.5 xl:p-5">Name</th>
            <th className="p-2.5 xl:p-5">Email</th>
            <th className="p-2.5 xl:p-5">Join Date</th>
            <th className="p-2.5 xl:p-5">Mobile Number</th>
            <th className="p-2.5 xl:p-5">Action</th>
            <th className="p-2.5 xl:p-5 ">Name</th>
            <th className="p-2.5 xl:p-5 ">Email</th>
            <th className="p-2.5 xl:p-5 ">Join Date</th>
            <th className="p-2.5 xl:p-5 ">Mobile Number</th>
            <th className="p-2.5 xl:p-5 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-stroke dark:border-strokedark text-center">
            <td className="text-black p-2.5 xl:p-5 dark:text-white ">
              Sourav Bapari
            </td>
            <td className="text-black p-2.5 xl:p-5 dark:text-white ">
              sourav0w@gmail.com
            </td>
            <td className="text-black p-2.5 xl:p-5 dark:text-white ">
              02/11/2001
            </td>
            <td className="text-black p-2.5 xl:p-5 dark:text-white ">
              1234567890
            </td>
            <td className="text-black p-2.5 xl:p-5 dark:text-white  flex justify-center items-center gap-5">
              <FaRegEdit />
              <MdDeleteOutline className="text-red" />
            </td>
            <td className="text-black p-2.5 xl:p-5 ">Sourav Bapari</td>
            <td className="text-black p-2.5 xl:p-5 ">sourav0w@gmail.com</td>
            <td className="text-black p-2.5 xl:p-5 ">02/11/2001</td>
            <td className="text-black p-2.5 xl:p-5 ">1234567890</td>
            <td className="text-black p-2.5 xl:p-5  flex justify-center items-center gap-5">
              <FaRegEdit />
              <MdDeleteOutline className="text-red" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
