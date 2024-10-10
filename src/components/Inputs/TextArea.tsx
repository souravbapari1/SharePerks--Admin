import { cn } from "@/lib/utils";
import React, { TextareaHTMLAttributes } from "react";

// Define the type for the props
type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

const TextArea: React.FC<TextAreaProps> = (props) => {
  return (
    <div>
      {props.label && (
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          {props.label}
        </label>
      )}
      <textarea
        rows={6}
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
    </div>
  );
};

export default TextArea;
