"use client";
import { GiftCardData } from "@/interface/giftcard";
import { formatDate } from "@/lib/formateTime";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { cn } from "@/lib/utils";
import { toast } from "material-react-toastify";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";

function GiftCardItem({ data }: { data: GiftCardData }) {
  const [isDelete, setIsDelete] = useState(false);
  const onDelete = async () => {
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
        const request = await client
          .delete("/api/v1/giftcard/" + data._id)
          .send(AdminAuthToken());
        Swal.fire({
          title: "Deleted!",
          text: "Your Offer has been deleted.",
          icon: "success",
        });
        setIsDelete(true);
      } catch (error: any) {
        toast.error(error?.response?.message || error.message.toString());
        console.log(error);
      }
    }
  };
  if (isDelete) {
    return <></>;
  }
  return (
    <div
      key={data._id}
      className={`grid grid-cols-3 sm:grid-cols-6 border-b border-stroke dark:border-strokedark `}
    >
      <div className="flex items-center gap-3 p-2.5 xl:p-5">
        <div className="flex-shrink-0">
          <Image
            src={
              data.data.BrandImage ||
              "https://www.tea-tron.com/antorodriguez/blog/wp-content/uploads/2016/04/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
            }
            alt="Brand"
            width={348}
            height={448}
            className="w-14 h-14 bg-gray object-contain"
          />
        </div>
        <p className="hidden text-black dark:text-white sm:block">
          {data.data.BrandName}
        </p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">{data.data.Brandtype}</p>
      </div>
      <div className="flex items-center p-2.5 xl:p-5">
        <p className="text-meta-3 flex flex-wrap gap-1 text-xs font-bold">
          {data.data.denominationList.split(",").map((e, i) => {
            return <span key={i}>₹{e}, </span>;
          })}
        </p>
      </div>
      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p
          className={cn(
            "  uppercase text-meta-3",
            data.isEnable ? "" : "text-red"
          )}
        >
          {data.isEnable ? "Active Now" : "Deactivate"}
        </p>
      </div>
      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-black dark:text-white uppercase">
          {formatDate((data.updatedAt || "")?.toString())}
        </p>
      </div>

      <div className=" items-center text-xl gap-6 justify-center p-2.5 flex xl:p-5">
        <Link href={"/admin/giftcards/" + data._id}>
          <AiOutlineEdit />
        </Link>
        <RiDeleteBinLine className="cursor-pointer" onClick={onDelete} />
      </div>
    </div>
  );
}

export default GiftCardItem;
