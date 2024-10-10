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
  colors: ["#6cb56f", "#ea7a9b"],
  labels: ["in", "out"],
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

const PaymentMatrixPi = ({
  inAmount,
  out,
}: {
  inAmount: number;
  out: number;
}) => {
  const series = [inAmount, out];
  function convertAmountsToPercent(status: { inAmount: number; out: number }) {
    const total = status.inAmount + status.out;

    if (total === 0) {
      // Avoid division by zero; return all percentages as 0
      return {
        inAmountPercent: 0,
        outPercent: 0,
      };
    }

    return {
      inAmountPercent: ((status.inAmount / total) * 100).toFixed(2),
      outPercent: ((status.out / total) * 100).toFixed(2),
    };
  }

  const percent = convertAmountsToPercent({ inAmount, out });
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
              <span> IN </span>
              <span> {percent.inAmountPercent}% </span>
            </p>
          </div>
        </div>

        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#ea7a9b]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> OUT </span>
              <span> {percent.outPercent}% </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentMatrixPi;
