"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/buttons/Button";
import TitleCard from "@/components/cards/TitleCard";
import Input from "@/components/Inputs/Input";
import MultiSelect from "@/components/Inputs/MultiSelect";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { permissionList } from "@/data/sidebardata";
import { useManageAdminsState } from "../../state";
import { UserData } from "@/interface/commition";
import { AdminUser } from "@/interface/admin";

function UpdateAdmin({ data }: { data: AdminUser["user"] }) {
  const { state, setState } = useManageAdminsState();
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    setState({
      name: data.name,
      email: data.email,
      permissions: data.permissions,
    });
  }, [data]);

  const validate = () => {
    const newErrors: any = {};

    if (!state.name) newErrors.name = "Name is required.";
    if (!state.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(state.email))
      newErrors.email = "Enter a valid email address.";
    // if (!state.password) newErrors.password = "Password is required.";
    // if (!state.confirmPassword)
    //   newErrors.confirmPassword = "Confirm Password is required.";
    // else if (state.password !== state.confirmPassword)
    //   newErrors.confirmPassword = "Passwords do not match.";
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
    const response = client.post("/api/v1/auth/admin/" + data._id).json({
      name: state.name,
      email: state.email,
      permissions: state.permissions,
    });

    return await response.send(AdminAuthToken());
  };

  const handelMutateAdmin = useMutation({
    mutationKey: ["admin"],
    mutationFn: createNewAdminUser,
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "Admin Update successfully",
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
    <TitleCard title="Update Admin">
      <div className="p-4 flex flex-col gap-5">
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

        <div className="">
          <label>Email</label>
          <Input
            type="email"
            placeholder="Enter Email"
            value={state.email || ""}
            disabled
            readOnly
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

        <div className="">
          <Button disabled={handelMutateAdmin.isLoading} onClick={handleSubmit}>
            Update Admin
          </Button>
        </div>
      </div>
    </TitleCard>
  );
}

export default UpdateAdmin;
