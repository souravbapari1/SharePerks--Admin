"use client";
import Switcher from "@/components/Inputs/Switcher";
import { BrandData } from "@/interface/brand";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { toast } from "material-react-toastify";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";

function ListItem({
  data,
  loadBrands,
}: {
  data: BrandData;
  loadBrands: Function;
}) {
  const [loadingTask, setLoadingTask] = useState(false);
  const deleteBrands = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        setLoadingTask(true);
        await client.delete("/api/v1/brand/" + id).send(AdminAuthToken());
        setLoadingTask(false);
        loadBrands();
        Swal.fire({
          title: "Deleted!",
          text: "Your Brand has been deleted.",
          icon: "success",
        });
      } catch (error) {
        console.log(error);
        setLoadingTask(false);
      }
    }
  };

  const updateStatusBrands = async (status: boolean) => {
    try {
      toast.dismiss();

      toast.info("Updating... brand status");

      setLoadingTask(true);
      console.log(data._id);

      const brands = await client
        .put("/api/v1/brand/" + data._id)
        .form({ isActive: status })
        .send<any>(AdminAuthToken());
      loadBrands();
      toast.dismiss();
      toast.success(brands.message);

      setLoadingTask(false);
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response.message || error.message);
      console.log(error);
      setLoadingTask(false);
    }
  };

  return (
    <div
      key={data._id}
      className={`grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark`}
    >
      <div className="flex items-center gap-3 p-2.5 xl:p-5">
        <div className="flex-shrink-0">
          <Image
            src={`${client.baseUrl}/${data.brandImage}`}
            alt="Brand"
            width={48}
            height={48}
            className="w-14 h-14 bg-gray object-cover "
          />
        </div>
        <p className="hidden text-black dark:text-white sm:block">
          {data.name}
        </p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">{data.clicks}</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-meta-3">{data.categoryData?.length}</p>
      </div>

      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-black dark:text-white uppercase">{data.provider}</p>
      </div>

      <div className=" items-center text-xl gap-6 justify-center p-2.5 flex xl:p-5">
        <Link href={"/admin/brands/" + data._id}>
          <AiOutlineEdit />
        </Link>
        <RiDeleteBinLine
          onClick={() => (loadingTask ? null : deleteBrands(data._id!))}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}

export default ListItem;
