"use client";
import Button from "@/components/buttons/Button";
import TitleCard from "@/components/cards/TitleCard";
import Input from "@/components/Inputs/Input";
import EmojiPicker from "emoji-picker-react";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "material-react-toastify";
import { client } from "@/lib/request/actions";
import { CategoryType } from "@/interface/categoty";

function AddCategories({
  onAction,
  setUpdate,
  update,
}: {
  onAction: Function;
  update: CategoryType | null;
  setUpdate: Function;
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [ShowEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  const createNew = async () => {
    // For Update
    if (update != null) {
      onUpdateCategory();
      return false;
    }
    if (!name.trim()) {
      toast.info("Please Enter Category Name");
      return false;
    }
    try {
      setLoading(true);
      const newCategory = await client
        .post("/api/v1/categories")
        .json({
          name,
        })
        .send({
          Authorization: "Bearer " + localStorage.getItem("token") || "",
        });
      console.log(newCategory);
      toast.success("New Category Create Successfully");
      setName("");
      onAction();
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.message || error.message);
    }
  };

  const onUpdateCategory = async () => {
    if (!name.trim()) {
      toast.info("Please Enter Category Name");
      return false;
    }
    try {
      setLoading(true);
      await client
        .put("/api/v1/categories/" + update?._id)
        .json({
          name,
        })
        .send({
          Authorization: "Bearer " + localStorage.getItem("token") || "",
        });

      toast.success("Category Update Successfully");
      setName("");
      setUpdate(null);
      onAction();
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.message || error.message);
    }
  };

  useEffect(() => {
    setName(update?.name || "");
  }, [update]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    if (ShowEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ShowEmojiPicker, setShowEmojiPicker]);

  return (
    <div>
      {ShowEmojiPicker && (
        <div className="w-screen h-screen fixed top-0 right-0 z-99999 bg-black/40 flex justify-center items-center">
          <div ref={emojiPickerRef}>
            <EmojiPicker
              onEmojiClick={(e: any) => {
                setShowEmojiPicker(false);
                setName((prev) => prev + e.emoji);
              }}
            />
          </div>
        </div>
      )}
      <TitleCard
        title={update != null ? "Update Category" : "Create New Category"}
      >
        <div className="p-6">
          <div className="">
            <div className="flex justify-between items-center">
              <label>Category Name</label>
              <p
                className="text-xs cursor-pointer select-none"
                onClick={() => setShowEmojiPicker(true)}
              >
                Add Icon
              </p>
            </div>

            <Input
              className="mt-2"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <Button
            className="mt-6"
            disabled={loading}
            loading={loading}
            onClick={createNew}
          >
            {update != null ? "Update Name" : "Add New"}
          </Button>
        </div>
      </TitleCard>
    </div>
  );
}

export default AddCategories;
