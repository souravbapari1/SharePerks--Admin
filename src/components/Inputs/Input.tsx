import { cn } from "@/lib/utils";
import React, { InputHTMLAttributes } from "react";

// Define the type for the props
type InputProps = InputHTMLAttributes<HTMLInputElement> & { label?: string };

const Input: React.FC<InputProps> = (props) => {
  return (
    <>
      {props.label && (
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          {props.label}
        </label>
      )}
      <input
        type="text"
        placeholder={props.label}
        {...props}
        className={cn(
          `
w-full rounded-lg border-[1.5px]  border-stroke dark:border-form-strokedark  bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default
${
  props.disabled
    ? "    disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
    : " bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
}`,
          props.className
        )}
      />
    </>
  );
};

export default Input;
