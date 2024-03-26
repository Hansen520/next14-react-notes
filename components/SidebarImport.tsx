/*
 * @Date: 2024-01-29 15:07:31
 * @Description: description
 */
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { importFile } from "@/actions";

export default function SidebarImport() {
  const router = useRouter();

  const onChange = async (e: any) => {
    const fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("No files selected.");
      return;
    }
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const data = await importFile(formData);
      router.push(`/note/${data.uid}`);
    } catch (error) {
      console.error("Error importing note:", error);
    }

    // reset file input
    e.target.type = "text";
    e.target.type = "file";
  };

  return (
    <div style={{ textAlign: "center" }}>
      <label htmlFor="file" style={{ cursor: "pointer" }}>
        请快速导入以 .md 结尾的文件哦
      </label>
      <input
        type="file"
        id="file"
        name="file"
        style={{ position: "absolute", clip: "rect(0 0 0 0)" }}
        onChange={onChange}
        accept=".md"
      />
    </div>
  );
}
