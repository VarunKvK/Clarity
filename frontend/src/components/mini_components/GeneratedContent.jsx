import React from 'react';
import ReactMarkdown from 'react-markdown';
import "../../app/globals.css";
import { Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

// Utility to parse questions and answers
const parseQuestions = (content) => {
    return content.split(/(?=Q:)/).map((qa, index) => {
        const [question, answer] = qa.split(/A:/).map((text) => text.trim());
        return { question, answer, id: index };
    });
};

const GeneratedContent = ({ aiContent, task, files, date }) => {
    const formattedDate= new Date(date).toISOString().split("T")[0];
    const saveOnNotion = async () => {
        try {
            const response = await fetch('/api/notion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task, aiContent, files, formattedDate})
            });
            const data = await response.json();
            console.log("New item added to Notion database:", data);
        } catch (error) {
            console.error("Error saving item to Notion:", error);
        }
    };
    return (
        <div className="mt-4 p-8 border text-[#ffff] bg-[#111] rounded-[2rem] mb-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm opacity-50 mb-6">
                    <Sparkles />
                    <h1 className="font-semibold">Generated Content</h1>
                </div>
                <Link href={`${process.env.NEXT_PUBLIC_AUTHORIZATION_URL}`}>Save on Notion</Link>
                <Button onClick={saveOnNotion}>Save in Notion</Button>
            </div>

            {/* Conditional Rendering based on Task */}
            {task === "generate questions" ? (
                <div className="question-container space-y-4">
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
