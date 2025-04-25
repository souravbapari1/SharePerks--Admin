"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";

function page() {
  const session = useSession();
  useEffect(() => {
    if (session.status == "authenticated") {
      signOut();
      localStorage.clear();
    }
  }, [session]);
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
