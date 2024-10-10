"use client";
import React, { ReactNode, useState } from "react";
import { IoEarthOutline } from "react-icons/io5";
import { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextProps = TextareaHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  icon?: ReactNode;
};
const Select = (
  props: TextProps & {
    options?: { label: string; value: string }[];
  }
) => {
  return (
    <div>
      {props.label && (
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          {props.label}
        </label>
      )}

      <div className="relative z-20 bg-white dark:bg-form-input">
        {props.icon && (
          <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
            {props.icon}
          </span>
        )}

        <select
          {...props}
          className={cn(
            `relative z-20 w-full appearance-none rounded disabled:bg-whiter dark:disabled:bg-black border border-stroke bg-transparent  py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
              props.value ? "text-black dark:text-white" : ""
            } ${props.icon ? "px-12" : "px-6"}`,
            props.className
          )}
        >
          <option
            value={props.defaultValue}
            disabled
            className="text-body dark:text-bodydark"
          >
            {props.defaultValue}
          </option>
          {props.options?.map((e, i) => {
            return (
              <option
                value={e.value}
                className="text-body dark:text-bodydark"
                key={`${e}-${i}`}
              >
                {e.label}
              </option>
            );
          })}
        </select>

        <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill="#637381"
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Select;
