'use client'
import { FileUploader } from '@/components/mini_components/Upload';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useState } from 'react';

const NewUploads = () => {
    const [fileUploaded, uploaded] = useState(false); // For button visibility
    const [files, setFiles] = useState();

    const handleRedo = () => {
        uploaded(false);  // Reset file upload state
    };

    const handleTask = async (selectedTask) => {
        const formData = new FormData();
        formData.append('task', selectedTask);

        const response = await fetch("http://127.0.0.1:8000/newtask/", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
        } else {
            console.error("Task submission failed");
        }
    };

    return (
        <div className="xl:max-w-6xl lg:max-w-4xl md:max-w-2xl max-w-2xl flex items-center w-full flex-col px-4 h-[90vh] relative">
            <div className="h-full flex items-center relative z-100">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1 md:gap-2 lg:gap-2.5 xl:gap-4">
                        <h1 className="header xl:text-[2.5rem] lg:text-[2rem] md:text-[1.5rem] sm:text-[1.2rem] text-[1.2rem] text-center xl:leading-[4rem] lg:leading-[3.5rem] md:leading-[3rem] sm:leading-[2.5rem] leading-[2rem]">
                            Drop your <span className="text-[#cf0] font-bold">PDFs</span> here and watch magic happen!
                        </h1>
                        <FileUploader uploaded={uploaded} setFiles={setFiles} />
                    </div>
                    {fileUploaded && (
                        <div className="flex justify-between">
                            <Button onClick={() => handleTask("summarize")} className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md hover:bg-[#cf0]">Summarize it</Button>

                            <Button onClick={() => handleTask("notes")} className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md hover:bg-[#cf0]">Turn it into notes</Button>

                            <Button onClick={() => handleTask("questions")} className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md hover:bg-[#cf0]">Make questions from it</Button>
                        </div>
                    )}
                    {
                        files && files[0].type !== "application/pdf" && (
                            <Button
                                className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-white text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
                                onClick={handleRedo} // The function to reset file upload
                            >
                                <RotateCcw />Try again
                            </Button>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default NewUploads;
