"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { TbCoinRupeeFilled } from "react-icons/tb";
function TrackerView({ link }: { link: string }) {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace(link);
    }, 2000);
  }, []);

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center p-5 ">
      <div className="  md:border rounded-xl md:p-20 md:pb-0 p-5 pb-0 flex justify-center items-center flex-col gap-8 text-center">
        <TbCoinRupeeFilled className="text-8xl text-green-500" />
        <h1 className="md:text-4xl text-xl">
          Redirecting..., nothing more to do
        </h1>
        <h1 className="md:text-xl text-sm text-center text-black/60">
          Shop normally. Cashback will automatically <br />
          be added to your SharePerks account within 24 hours.
        </h1>

        <div className="flex justify-center items-center gap-10 mt-10 mb-10">
          <Image
            src="/intermediary_animation.gif"
            width={120}
            height={120}
            alt=""
            className="w-auto h-3 object-contain"
          />
        </div>

        <div className="h-14 border-t mt-10 w-full flex justify-center items-center text-xs text-center text-gray-600">
          <p>
            Hi, there. If you are not automatically re-directed, please{" "}
            <Link
              href={link}
              target="_self"
              className="text-blue-600 font-bold capitalize"
            >
              click here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TrackerView;
