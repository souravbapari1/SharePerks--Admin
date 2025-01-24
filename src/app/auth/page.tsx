"use client";

import Button from "@/components/buttons/Button";
import TitleCard from "@/components/cards/TitleCard";
import Input from "@/components/Inputs/Input";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "material-react-toastify";

import { useRouter } from "next/navigation";
import { AdminUser } from "@/interface/admin";
import { client } from "@/lib/request/actions";
function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const makeLogin = async () => {
    if (!email || !password) {
      toast.error("Invalid credentials. try again");
      return false;
    }
    try {
      setLoading(true);
      const admin: AdminUser = await client
        .post("/api/v1/auth/admin/login")
        .json({ email: email, password: password })
        .send();
      localStorage.setItem("token", admin.token);
      localStorage.setItem("admin", JSON.stringify(admin.user));
      localStorage.setItem(
        "permission",
        JSON.stringify(admin.user.permissions)
      );
      localStorage.setItem("role", admin.user.role || "");

      const res = await signIn("credentials", {
        username: email,
        password: password,
        redirect: false,
      });
      if (!res?.ok) {
        toast.error("Invalid credentials. try again");
        setLoading(false);
      } else {
        toast.success("Logged in successful . Redirect...");
        window.location.replace("/admin");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Invalid Email & Password");
    }
  };

  return (
    <div className="h-screen w-full bg-primary/5 flex justify-center items-center">
      <div className="max-w-[500px] w-full">
        <TitleCard title="Login Your Account">
          <div className="p-8">
            <div className="">
              <label>Email ID</label>
              <Input
                className="mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
            <div className="">
              <label>Password</label>
              <Input
                className="mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <br />
            <Button
              className="w-full rounded-md"
              disabled={loading}
              loading={loading}
              onClick={makeLogin}
            >
              Login Admin Panel
            </Button>
          </div>
        </TitleCard>
      </div>
    </div>
  );
}

export default page;
