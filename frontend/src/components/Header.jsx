import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const Header = () => {
    return (
        <div className='flex items-center h-[86vh]'>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col leading-tight">
                    <h1 className="header text-[4rem]">
                        Clarity for Your Study Workflow
                    </h1>
                    <p className="body text-lg opacity-50">Organize notes, PDFs, and study materials in one place with AI-powered insights.</p>
                </div>
                <div className="flex items-center gap-8">
                    <button className="relative inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#007bff_0%,#40E0D0_50%,#ffffff_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-[#111111] px-4 py-2 text-sm font-medium text-white backdrop-blur-3xl">
                            Start Uploading
                        </span>
                    </button>
                    <Link href={"/about"} className='opacity-30'>
                        Learn more
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header