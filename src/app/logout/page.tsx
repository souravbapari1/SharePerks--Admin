"use client";
import React, { use, useEffect } from "react";
import Loader from "../loading";
import { signOut } from "next-auth/react";

const logout = async () => {
  window.localStorage.clear();
  await signOut();
  window.location.href = "/";
};

function page() {
  useEffect(() => {
    if (window) {
      logout();
    }
  }, [window.localStorage]);
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <Loader />
    </div>
  );
}

export default page;
