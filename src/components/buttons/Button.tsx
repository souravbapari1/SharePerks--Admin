import { cn } from "@/lib/utils";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { ImSpinner3 } from "react-icons/im";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  className?: string;
  children?: ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  loading,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled || loading} // Disable the button if loading
      className={cn(
        "inline-flex cursor-pointer rounded-md transition-all items-center justify-center bg-primary disabled:bg-primary/80 dark:disabled:bg-black disabled:text-white/50 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10",
        className
      )}
    >
      {loading && (
        <span>
          <ImSpinner3 className="spin mr-3" size={18} />
        </span>
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;
