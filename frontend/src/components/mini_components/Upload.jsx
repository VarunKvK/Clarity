"use client";
import React from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";
import { SignInButton, useAuth } from "@clerk/nextjs";

export function FileUploader({ files, setFiles, setuploaded }) {
  const { toast } = useToast();
  const { isSignedIn } = useAuth();

  const handleFileUpload = async (f) => {
    setFiles(f);
    setuploaded(true);
    try {
      if (f[0].type === "application/pdf") {
        const formData = new FormData();
        formData.append("file", f[0]);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/newuploads/`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          toast({
            icon: <CheckCircle size={24} />,
            title: "File uploaded successfully!",
            description: "You can now convert this PDF into your desired study materials.",
          });
        } else {
          throw new Error("File upload failed");
        }
      } else {
        toast({
          variant: "destructive",
          icon: <CheckCircle size={24} />,
          title: "Invalid file type!",
          description: "Please upload a PDF file.",
        });
      }
    } catch (err) {
      console.error("Error:", err);
      toast({
        variant: "destructive",
        icon: <CheckCircle size={24} />,
        title: "Upload failed!",
        description: "There was an error uploading the file.",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-black border-[#cf0] rounded-lg flex justify-center items-center">
      {isSignedIn ? (
        <FileUpload onChange={handleFileUpload} files={files} setFiles={setFiles} />
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-lg">Haven&apos;t signed in yet?</h2>
            <p className="opacity-20">Let&apos;s complete that step first!</p>
          </div>
          <SignInButton className="bg-[#cf0] rounded-md px-4 py-1.5 text-[#111]" />
        </div>
      )}
    </div>
  );
}
