import { OfferData } from "@/interface/offers";
import { formatDate } from "@/lib/formateTime";
import { AdminAuthToken, client } from "@/lib/request/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";

function OffersItem({ data, reload }: { data: OfferData; reload: Function }) {
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
          .delete("/api/v1/offers/" + data._id)
          .send<OfferData[]>(AdminAuthToken());
        Swal.fire({
          title: "Deleted!",
          text: "Your Offer has been deleted.",
          icon: "success",
        });
        reload();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div
      className={`grid grid-cols-3 sm:grid-cols-6 border-b border-stroke dark:border-strokedark ${
        data.isExpired == true && "bg-red/5 opacity-45"
      } ${data.isEnable == false && "opacity-15"} `}
    >
      <div className="flex items-center gap-3 p-2.5 xl:p-5">
        <div className="flex-shrink-0">
          <Image
            src={`${client.baseUrl}/${data.offerImage}`}
            alt="Brand"
            width={48}
            height={48}
            className="w-14 h-14 bg-gray object-cover "
          />
        </div>
        <p className="hidden text-black dark:text-white sm:block">
          {data.offerTitle}
        </p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">{data.clicks || 0}</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-meta-3">{data?.categoryData?.name}</p>
      </div>
      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-meta-3 uppercase">{data.provider}</p>
      </div>
      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-black dark:text-white uppercase">
          {formatDate(data.expDate)}
        </p>
      </div>

      <div className=" items-center text-xl gap-6 justify-center p-2.5 flex xl:p-5">
        <Link href={"/admin/offers/" + data._id}>
          <AiOutlineEdit />
        </Link>
        <RiDeleteBinLine onClick={onDelete} className="cursor-pointer" />
      </div>
    </div>
  );
}

export default OffersItem;
