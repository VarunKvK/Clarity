import React from 'react'
import ReactMarkdown from 'react-markdown';
import "../../app/globals.css"

const GeneratedContent = ({ aiContent }) => {
    return (
        <div className="mt-4 p-4 border rounded text-[#ffff] bg-[#111]">
            <h1 className="font-semibold text-sm">Generated Content:</h1>
            <div className="markdown-content">
                <ReactMarkdown>
                    {aiContent}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export default GeneratedContent