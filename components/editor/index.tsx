"use client";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import { useState } from "react";

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
];

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
  ],
  clipboard: {
    matchVisual: false,
  },
};

export const Editor = () => {
  const [updatedContent, setUpdatedContent] = useState("");

  function handleEditorChange(value: string): void {
    setUpdatedContent(value);
  }

  return (
    <>
      <ReactQuill
        theme="snow"
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        value={updatedContent}
        bounds="#root"
        placeholder="Write Something"
        className="w-full h-96 border-2 border-black"
      />
      {updatedContent}
    </>
  );
};
