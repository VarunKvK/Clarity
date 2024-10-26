"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { useToast } from '@/hooks/use-toast'
import { CheckCircle } from "lucide-react";


export function FileUploader({ uploaded, setFiles }) {
  const { toast } = useToast()

  const handleFileUpload = async (f) => {
    setFiles(f);
    try {
      if (f[0].type === "application/pdf") {
        const formData = new FormData();
        formData.append("file", f[0]); 
  
        const response = await fetch("http://127.0.0.1:8000/newuploads/", { 
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          uploaded(true); 
          toast(
            {
              icon: <CheckCircle size={24} />,
              title: "File uploaded successfully!",
              description: "You can now convert this PDF into your desired study materials.",
            },
          );
        } else {
          throw new Error("Failed to upload file");
        }
      } else {
        uploaded(false);
        toast(
          {
            variant: "destructive",
            icon: <CheckCircle size={24} />,
            title: "Invalid file type!",
            description: "Please upload a PDF file.",
          },
        );
      }
    } catch (err) {
      console.log("Oops there was some error: ", err);
      toast(
        {
          variant: "destructive",
          icon: <CheckCircle size={24} />,
          title: "Upload failed!",
          description: "There was an error uploading the file.",
        },
      );
    }
  };
  

  return (
    <div
      className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-black border-[#cf0] rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}
