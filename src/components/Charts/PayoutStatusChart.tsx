"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#e8c92d", "#6cb56f", "#c9415a", "#ea7a9b"],
  labels: ["Pending", "Complete", "Cancel", "Failed"],
  legend: {
    show: false,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const PayoutStatusPi = ({
  cancel,
  complete,
  failed,
  pending,
}: {
  pending: number;
  complete: number;
  cancel: number;
  failed: number;
}) => {
  const series = [pending, complete, cancel, failed];
  function convertToPercent(status: {
    pending: number;
    complete: number;
    cancel: number;
    failed: number;
  }) {
    const total =
      status.pending + status.complete + status.cancel + status.failed;

    if (total === 0) {
      // Avoid division by zero; return all percentages as 0
      return {
        pending: 0,
        complete: 0,
        cancel: 0,
        failed: 0,
      };
    }

    return {
      pending: ((status.pending / total) * 100).toFixed(2),
      complete: ((status.complete / total) * 100).toFixed(2),
      cancel: ((status.cancel / total) * 100).toFixed(2),
      failed: ((status.failed / total) * 100).toFixed(2),
    };
  }

  const percent = convertToPercent({ cancel, complete, failed, pending });
  return (
    <>
      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#e8c92d]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Pending </span>
              <span> {percent.pending}% </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6cb56f]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Complete </span>
              <span> {percent.complete}% </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#c9415a]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Cancel </span>
              <span> {percent.cancel}% </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#ea7a9b]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Failed </span>
              <span> {percent.failed}% </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayoutStatusPi;
