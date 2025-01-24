"use client";
import React, { useState } from "react";
import Button from "@/components/buttons/Button";
import TitleCard from "@/components/cards/TitleCard";
import Input from "@/components/Inputs/Input";
import MultiSelect from "@/components/Inputs/MultiSelect";
import { useManageAdminsState } from "../state";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { permissionList } from "@/data/sidebardata";

function AddNewAdmin() {
  const { state, setState } = useManageAdminsState();
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const validate = () => {
    const newErrors: any = {};

    if (!state.name) newErrors.name = "Name is required.";
    if (!state.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(state.email))
      newErrors.email = "Enter a valid email address.";
    if (!state.password) newErrors.password = "Password is required.";
    if (!state.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required.";
    else if (state.password !== state.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!state.permissions || state.permissions.length === 0)
      newErrors.permissions = "At least one permission must be selected.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Admin Data:", state);
      // Add your API call or form submission logic here
      handelMutateAdmin.mutate();
    }
  };

  const createNewAdminUser = async () => {
    const response = client.post("/api/v1/auth/admin").form({
      name: state.name,
      email: state.email,
      password: state.password,
      permissions: JSON.stringify(state.permissions),
      role: "MANAGEMENT",
    });
    if (state.image) {
      response.append("image", state.image);
    }
    return await response.send(AdminAuthToken());
  };

  const handelMutateAdmin = useMutation({
    mutationKey: ["admin"],
    mutationFn: createNewAdminUser,
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "Admin created successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
      router.back();
    },
    onError: (error: any) => {
      Swal.fire({
        title: "Error",
        text: error.response.message || "Something went wrong",
        icon: "error",
        confirmButtonText: "Ok",
      });
    },
  });

  return (
    <TitleCard title="Create New Admin">
      <div className="p-4 flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="">
            <label>Image</label>
            <Input
              type="file"
              placeholder="Upload Image"
              onChange={(e) => {
                if (e.target?.files) {
                  setState({ image: e.target?.files[0] });
                }
              }}
            />
          </div>
          <div className="">
            <label>Name</label>
            <Input
              type="text"
              placeholder="Enter Name"
              value={state.name || ""}
              onChange={(e) => setState({ name: e.target.value })}
            />
            {errors.name && <p className="text-red text-sm">{errors.name}</p>}
          </div>
        </div>
        <div className="">
          <label>Email</label>
          <Input
            type="email"
            placeholder="Enter Email"
            value={state.email || ""}
            onChange={(e) => setState({ email: e.target.value })}
          />
          {errors.email && <p className="text-red text-sm">{errors.email}</p>}
        </div>
        <div className="">
          <label htmlFor="permissions">Permissions</label>
          <MultiSelect
            availableOptions={permissionList as any}
            id="permissions"
            selectedOptions={state.permissions || []}
            onChange={(selectedOptions) =>
              setState({ permissions: selectedOptions })
            }
          />
          {errors.permissions && (
            <p className="text-red text-sm">{errors.permissions}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="">
            <label>Password</label>
            <Input
              type="password"
              placeholder="Enter Password"
              value={state.password || ""}
              onChange={(e) => setState({ password: e.target.value })}
            />
            {errors.password && (
              <p className="text-red text-sm">{errors.password}</p>
            )}
          </div>
          <div className="">
            <label>Confirm Password</label>
            <Input
              type="password"
              placeholder="Confirm Password"
              value={state.confirmPassword || ""}
              onChange={(e) => setState({ confirmPassword: e.target.value })}
            />
            {errors.confirmPassword && (
              <p className="text-red text-sm">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <div className="">
          <Button disabled={handelMutateAdmin.isLoading} onClick={handleSubmit}>
            Create Admin
          </Button>
        </div>
      </div>
    </TitleCard>
  );
}

export default AddNewAdmin;
