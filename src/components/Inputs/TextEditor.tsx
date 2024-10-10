"use client";
import React, { useState, useRef, memo } from "react";
import JoditEditor, { IJoditEditorProps } from "jodit-react";

const TextEditor = ({
  onChange,
  content,
}: {
  onChange: (newContent: string) => void;
  content: string;
}) => {
  const editor = useRef(null);

  const config: IJoditEditorProps["config"] = {
    height: 500,
    theme: "light",
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      onBlur={(newContent) => onChange(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => {}}
    />
  );
};

export default memo(TextEditor);
