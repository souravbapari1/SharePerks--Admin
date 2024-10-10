"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/buttons/Button";
import TitleCard from "@/components/cards/TitleCard";
import FileInput from "@/components/Inputs/FilesInput";
import Input from "@/components/Inputs/Input";
import Switcher from "@/components/Inputs/Switcher";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import { AdminUser, UpdatedAdmin } from "@/interface/admin";
import Loader from "@/app/loading";
import { client } from "@/lib/request/actions";
import { toast } from "material-react-toastify";
import { HttpError } from "@/lib/request/errror";

function Page() {
  const [user, setUser] = useState<AdminUser["user"]>();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileName, setProfileName] = useState("");
  const [updatePassword, setUpdatePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const userData = localStorage.getItem("admin");
    const data: AdminUser["user"] = JSON.parse(userData || "");
    setUser(data);
    setProfileName(data?.name || "");
  }, []);
  if (!user) {
    return <Loader />;
  }

  const handleProfileUpdate = async () => {
    if (!profileName) {
      toast.error("Please Enter your name");
      return false;
    }

    if (updatePassword) {
      if (!password && !newPassword) {
        toast.error("Please Enter Current & New Passwords");
        return false;
      }
    }

    let updateRequest = client
      .put("/api/v1/user/admin/update")
      .form({ name: profileName });

    if (profileImage) {
      updateRequest.append("image", profileImage);
    }

    if (password) {
      if (!newPassword) {
        toast.error("Please Enter new password");
        return false;
      }
      updateRequest.append("password", password);
      updateRequest.append("newpassword", newPassword);
    }
    try {
      setLoading(true);
      const res: UpdatedAdmin = await updateRequest.send({
        Authorization: "Bearer " + localStorage.getItem("token") || "",
      });
      setUser(res.user);
      localStorage.setItem("admin", JSON.stringify(res.user));
      toast.success("Profile Update Successfully");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.message || error.message);
    }
  };

  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Profile Update" />

      <TitleCard title="Update Profile">
        <div className="grid lg:grid-cols-2 gap-10 p-8">
          <div>
            <label>Profile Image</label>
            <FileInput
              className="mt-2"
              onChange={(e) => {
                if (e.target.files) {
                  setProfileImage(e.target.files[0]);
                }
              }}
            />
          </div>
          <div>
            <label>Profile Name</label>
            <Input
              className="mt-2"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <div className="flex justify-normal items-center gap-6">
              <Switcher
                enabled={updatePassword}
                setEnabled={setUpdatePassword}
              />
              <p>Update Password</p>
            </div>
          </div>
          {updatePassword && (
            <>
              <div>
                <label>Current Password</label>
                <Input
                  className="mt-2"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label>New Password</label>
                <Input
                  className="mt-2"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </>
          )}
          <div>
            <Button
              loading={loading}
              disabled={loading}
              onClick={handleProfileUpdate}
            >
              Update Profile
            </Button>
          </div>
        </div>
      </TitleCard>
    </WorkSpace>
  );
}

export default Page;
