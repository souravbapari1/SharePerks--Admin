"use client";
import Button from "@/components/buttons/Button";
import TitleCard from "@/components/cards/TitleCard";
import Input from "@/components/Inputs/Input";
import TextArea from "@/components/Inputs/TextArea";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import { UserProfileInfo } from "@/interface/user";
import { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import SelectUsersList from "./SelectUsersList";
import axios from "axios";
// Type definitions for error messages
interface Errors {
  title: string;
  body: string;
}

function Page() {
  // State management for Title, Body, and Image
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({ title: "", body: "" });
  const [users, setUsers] = useState<UserProfileInfo[]>([]);

  const pushNotificationData = useMutation({
    mutationKey: ["push_notification"],
    mutationFn: async (data: {
      title: string;
      body: string;
      users: string[];
      image: string | undefined;
    }) => {
      const req = await axios.post(
        "https://worker.shareperks.in/notification",
        {
          title: data.title,
          body: data.body,
          users: data.users,
          image: data.image,
        }
      );

      return req.data;
    },
    onSuccess: () => {
      // Success message
      console.log("Notification sent successfully.");
      Swal.fire({
        title: "Success",
        text: "Notification sent successfully.",
        icon: "success",
        confirmButtonText: "Ok",
      });
      // Reset the form
      setTitle("");
      setBody("");
      setImage(null);
    },
    onError: (error: any) => {
      // Error message
      console.log(error);
      Swal.fire({
        title: "Error",
        text: error.message || "Something went wrong",
        icon: "error",
        confirmButtonText: "Ok",
      });
    },
  });

  // Handle changes in Title input
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Handle changes in Body input
  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  // Handle file input for image
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setImage(e.target.value);
    }
  };

  // Validation logic
  const validateForm = (): boolean => {
    let formErrors: Errors = { title: "", body: "" };
    let isValid = true;

    // Validate title
    if (!title.trim()) {
      formErrors.title = "Title is required.";
      isValid = false;
    }

    // Validate body
    if (!body.trim()) {
      formErrors.body = "Body is required.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  // Handle Submit (sending the notification)
  const handleSubmit = () => {
    if (validateForm()) {
      // Here you can integrate with an API to send the notification.
      console.log("Sending Notification...");
      pushNotificationData.mutate({
        title,
        body: body,
        image: image || undefined,
        users: users.map((e) => e._id),
      });
    }
  };

  return (
    <WorkSpace menuGroups={menuGroups}>
      <div className="grid grid-cols-2 gap-5">
        <TitleCard title="Push Notification">
          <div className="p-8">
            <div className="flex flex-col gap-6">
              <div className="">
                <label>Title</label>
                <Input
                  placeholder="Enter Title"
                  type="text"
                  value={title} // Binding the input value to state
                  onChange={handleTitleChange} // Updating the state on change
                />
                {errors.title && (
                  <p className="text-red text-sm">{errors.title}</p>
                )}
              </div>
              <div className="">
                <label>Body</label>
                <TextArea
                  placeholder="Enter Body"
                  value={body} // Binding the textarea value to state
                  onChange={handleBodyChange} // Updating the state on change
                />
                {errors.body && (
                  <p className="text-red text-sm">{errors.body}</p>
                )}
              </div>
              <div className="">
                <label>Image</label>
                <Input
                  placeholder="Enter Image Url"
                  onChange={handleImageChange} // Updating the state on file selection
                />
              </div>
            </div>
            <br />
            <br />

            <Button
              onClick={handleSubmit}
              disabled={pushNotificationData.isLoading}
              loading={pushNotificationData.isLoading}
            >
              Send Notification
            </Button>
          </div>
        </TitleCard>
        <SelectUsersList setUsers={setUsers} users={users} />
      </div>
    </WorkSpace>
  );
}

export default Page;
