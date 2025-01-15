'use client'
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import "../../app/globals.css";
import { LoaderCircle, Save, Sparkles, Workflow } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';




//Need to change the button if it is not yet notion Integrated
//Need to change the button if it is not yet notion Integrated
//Need to change the button if it is not yet notion Integrated
//Need to change the button if it is not yet notion Integrated
//Need to change the button if it is not yet notion Integrated


// Utility to parse questions and answers
const parseQuestions = (content) => {
    return content.split(/(?=Q:)/).map((qa, index) => {
        const [question, answer] = qa.split(/A:/).map((text) => text.trim());
        return { question, answer, id: index };
    });
};

const GeneratedContent = ({ aiContent, task, files, date, notionIntegrate }) => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const formattedDate = new Date(date).toISOString().split("T")[0];

    //Get the length of the CONTENT GENERATED
    // console.log("Charachter length after creating by GEMINI--->>",aiContent.length)

    const saveOnNotion = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/notion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    task,
                    aiContent,
                    files,
                    formattedDate,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            toast({
                title: "Content saved successfully",
                description: "Your content has been saved to Notion.",
            });

            console.log("New item added to Notion:", data);
        } catch (error) {

            console.error("Error saving item to Notion:", error.message);
            toast({
                variant: "destructive",
                title: "Error saving content",
                description: error.message || "Something went wrong while saving to Notion. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="xl:max-w-6xl lg:max-w-4xl md:max-w-2xl max-w-2xl w-full mt-4 p-8 border text-[#ffff] bg-[#111] rounded-[2rem] mb-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm opacity-50 mb-6">
                    <Sparkles />
                    <h1 className="font-semibold">Generated Content</h1>
                </div>
                {!notionIntegrate ?
                    (
                        <Button className="flex items-center gap-2 px-6 py-2 bg-white text-[#111] rounded-lg font-medium transform hover:-translate-y-1 hover:bg-[#cf0] transition duration-400">
                            <span className="flex items-center gap-1">
                                <Workflow />
                                <Link
                                    href={process.env.NEXT_PUBLIC_AUTHORIZATION_URL}>
                                    Integrate Notion
                                </Link>
                            </span>
                        </Button>
                    ) : (<Button onClick={saveOnNotion} disabled={loading} className="flex items-center gap-2 px-6 py-2 bg-white text-[#111] rounded-lg font-medium transform hover:-translate-y-1 hover:bg-[#cf0] transition duration-400">
                        {loading ? (
                            <LoaderCircle className="animate-spin text-gray-500" size={16} />
                        ) : (
                            <span className="flex items-center gap-1">
                                <Save />
                                Save in Notion
                            </span>
                        )}
                    </Button>)}
            </div>

            {/* Conditional Rendering based on Task */}
            {task === "generate questions" ? (
                <div className="space-y-4">
                    {parseQuestions(aiContent).map(({ question, answer, id }) => (
                        <div key={id} className="bg-[#222] p-4 rounded-md shadow-md">
                            <p className="font-semibold text-[#ffcc00] mb-2">{question}</p>
                            <p className="text-gray-300">{answer}</p>
                        </div>
                    ))}
                </div>
            ) : task === "notes" ? (
                <div className="markdown-content-notes">
                    <ReactMarkdown>{aiContent}</ReactMarkdown>
                </div>
            ) : (
                <div className="markdown-content">
                    <ReactMarkdown>{aiContent}</ReactMarkdown>
                </div>
            )}
        </div>
    );
};

export default GeneratedContent;
