"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { useToast } from '@/hooks/use-toast'
import { CheckCircle } from "lucide-react";

export function FileUploader({ uploaded,files,setFiles }) {
  const { toast } = useToast()

  const handleFileUpload = (f) => {
    setFiles(f);
    try {
      if (f[0].type === "application/pdf") {
        uploaded(true)
        toast(
          {
            icon: <CheckCircle size={24} />,
            title: "File uploaded successfully!",
            description: "You can now convert this PDF into your desired study materials.",
          },
          { type: "success" }
        )
      } else {
        uploaded(false)
        toast(
          {
            variant: "destructive",
            icon: <CheckCircle size={24} />,
            title: "Invalid file type!",
            description: "Please upload a PDF file.",
          },
        )
      }
    } catch (err) {
      console.log("Oops there was some error: ", err);
    }
  };

  return (
    <div
      className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-black border-[#cf0] rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}
