"use client";

import Loader from "@/app/loading";
import TitleCard from "@/components/cards/TitleCard";
import Switcher from "@/components/Inputs/Switcher";
import { BrandData } from "@/interface/brand";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { toast } from "material-react-toastify";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";
import ListItem from "./ListItem";
import { downloadExcel } from "@/helper/exceel";
import { SiMicrosoftexcel } from "react-icons/si";
import { BiLoader } from "react-icons/bi";

const BrandsList = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [data, setdata] = useState<{
    brands: BrandData[];
    currentPage: number;
    totalPages: number;
    totalBrands: number;
  }>();

  const loadBrands = async () => {
    try {
      const brands = await client.get(`/api/v1/brand/all/${page}/6`).send<{
        brands: BrandData[];
        currentPage: number;
        totalPages: number;
        totalBrands: number;
      }>(AdminAuthToken());
      setdata(brands);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, [page]);

  if (loading) {
    return <Loader />;
  }

  return (
    <TitleCard
      title="All Brands"
      action={
        <div
          onClick={() => {
            downloadExcel(data?.brands || [], "brands-shareperks");
          }}
          className="bg-green-800  text-white py-1 w-30 flex cursor-pointer justify-center items-center gap-2 rounded-lg text-sm px-4"
        >
          <SiMicrosoftexcel /> Export
        </div>
      }
    >
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Clicks
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Category
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Provider
            </h5>
          </div>

          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {data?.brands?.map((e) => {
          return <ListItem data={e} loadBrands={loadBrands} key={e._id} />;
        })}
      </div>
      {data?.totalPages != 1 && (
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
                      {loading ? (
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

export default BrandsList;
