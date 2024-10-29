import React from 'react'
import ReactMarkdown from 'react-markdown';
import "../../app/globals.css"
import { Sparkles } from 'lucide-react';

const GeneratedContent = ({ aiContent }) => {
    return (
        <div className="mt-4 p-8 border text-[#ffff] bg-[#111] rounded-[2rem]">
            <div className="flex items-center gap-1 text-sm opacity-50 mb-6">
            <Sparkles/>
            <h1 className="font-semibold">Generated Content</h1>
            </div>
            <div className="markdown-content">
                <ReactMarkdown>
                    {aiContent}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export default GeneratedContent