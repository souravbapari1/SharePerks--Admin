import Link from "next/link";
import React from "react";
export const revalidate = 0;
function page() {
  return (
    <div className="flex justify-center items-center w-full h-screen flex-col gap-4 text-2xl">
      Welcome To SharePerks Admin
      <Link href="/admin" className="underline text-primary text-title-xsm">
        Access Panel
      </Link>
    </div>
  );
}

export default page;
