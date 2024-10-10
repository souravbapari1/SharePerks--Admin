import React, { ReactNode } from "react";

function TitleCard({
  title,
  children,
  action,
}: {
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-sm border relative   border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke flex justify-between items-center  px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">{title}</h3>
        {action}
      </div>
      <div className=" max-h-[800px] overflow-auto">{children}</div>
    </div>
  );
}

export default TitleCard;
