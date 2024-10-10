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

const BrandsList = () => {
  const [loading, setLoading] = useState(true);

  const [data, setdata] = useState<BrandData[]>([]);

  const loadBrands = async () => {
    try {
      const brands = await client
        .get("/api/v1/brand/all")
        .send<BrandData[]>(AdminAuthToken());
      setdata(brands);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <TitleCard title="All Brands">
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

        {data.map((e) => {
          return <ListItem data={e} loadBrands={loadBrands} key={e._id} />;
        })}
      </div>
    </TitleCard>
  );
};

export default BrandsList;
