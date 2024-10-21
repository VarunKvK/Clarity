"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { useToast } from '@/hooks/use-toast'
import { CheckCircle } from "lucide-react";

export function FileUploader({ uploaded }) {
  const { toast } = useToast()
  const [files, setFiles] = useState([]);

  const handleFileUpload = (files) => {
    const pdfFiles = files.filter((file) => {
      file.type === "application/pdf"
    })
    setFiles(files);
    if (pdfFiles) {
      uploaded(true);
      toast({
        title: (<div className="w-full flex items-center gap-1">
          <p className="w-full">
            <span className="truncate text-ellipsis">
              {files[0].name} 
            </span> Uploaded Successfully
          </p>
        </div>)
      });
    } else {
      uploaded(false);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "The format you uploaded is not supported. Please make sure it's a PDF file.",
      });
    }
  };

  return (
    (<div
      className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-black border-[#cf0] rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>)
  );
}
