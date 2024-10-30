'use client'
import { AiLoader } from '@/components/mini_components/AI_Genration_Loader';
import GeneratedContent from '@/components/mini_components/GeneratedContent';
import { FileUploader } from '@/components/mini_components/Upload';
import { Button } from '@/components/ui/button';
import { FileQuestion, NotepadText, PenTool, RotateCcw } from 'lucide-react';
import { useState } from 'react';

const NewUploads = () => {
    const [fileUploaded, setuploaded] = useState(false); // For button visibility
    const [files, setFiles] = useState([]);
    const [aiContent, setAi] = useState();
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [task,setTask]=useState();

    const handleRedo = () => {
        setuploaded(false);
        setFiles([]);
        setAi(null);
        setIsLoading(false);
    };

    const handleTask = async (selectedTask) => {
        setIsLoading(true); // Start loader
        setTask(selectedTask)
        const formData = new FormData();
        formData.append('task', selectedTask);
        console.log(formData)
        const response = await fetch("http://127.0.0.1:8000/newtask/", {
            method: "POST",
            body: formData,
        });
    
        const data = await response.json();
        
        if (response.ok) {
            // Select the correct key based on the selectedTask
            let content = "";
            if (selectedTask === "summarize") {
                content = data.SummarizedContent;
            } else if (selectedTask === "notes") {
                content = data.Notes;
            } else if (selectedTask === "questions") {
                content = data.Questions;
            }
    
            // Set aiContent with the string content
            setAi(content);
        } else {
            console.error("Task submission failed");
        }
    
        setIsLoading(false); // Stop loader
    };


    return (
        <div className="xl:max-w-6xl lg:max-w-4xl md:max-w-2xl max-w-2xl flex items-center w-full flex-col px-4 h-auto relative">
            <div className="h-full flex items-center relative z-100">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1 md:gap-2 lg:gap-2.5 xl:gap-4">
                        <h1 className="header xl:text-[2.5rem] lg:text-[2rem] md:text-[1.5rem] sm:text-[1.2rem] text-[1.2rem] text-center xl:leading-[4rem] lg:leading-[3.5rem] md:leading-[3rem] sm:leading-[2.5rem] leading-[2rem]">
                            Drop your <span className="text-[#cf0] font-bold">PDFs</span> here and watch magic happen!
                        </h1>
                        <FileUploader setuploaded={setuploaded} setFiles={setFiles} files={files} />
                    </div>

                    {/* Show Loader */}
                    {isLoading && <AiLoader />}

                    {!isLoading && fileUploaded && files[0]?.type === "application/pdf" && (
                        <div className="flex md:flex-row flex-wrap gap-2 justify-between">
                            <Button onClick={() => handleTask("summarize")} className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md hover:bg-[#cf0] flex items-center gap-1">
                                <PenTool />
                                Summarize it
                            </Button>

                            <Button onClick={() => handleTask("notes")} className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md hover:bg-[#cf0] flex items-center gap-1">
                                <NotepadText />
                                Turn it into notes
                            </Button>

                            <Button onClick={() => handleTask("questions")} className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md hover:bg-[#cf0] flex items-center gap-1">
                                <FileQuestion />
                                Make questions from it
                            </Button>

                            <Button onClick={handleRedo} className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-neutral-300 text-neutral-300 rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 flex items-center gap-1">
                                <RotateCcw />
                                Redo
                            </Button>
                        </div>  
                    )}

                    {files?.length > 0 && files[0]?.type !== "application/pdf" && fileUploaded && (
                        <Button
                            className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-white text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
                            onClick={handleRedo}
                        >
                            <RotateCcw />Try again
                        </Button>
                    )}

                    {/* Display AI content if available */}
                    {aiContent && (
                        <GeneratedContent aiContent={aiContent} task={task}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewUploads;
