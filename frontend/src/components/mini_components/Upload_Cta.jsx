"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

export function FileUploadDemo() {
  const [files, setFiles] = useState([]);
  const handleFileUpload = (files) => {
    setFiles(files);
    console.log(files);
  };

  return (
    (<div
      className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-black border-[#cf0] rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>)
  );
}
