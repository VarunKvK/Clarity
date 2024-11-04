import Link from 'next/link'
import React from 'react'

const FileInfo = () => {
    return (
        <div className="row-span-1 rounded-xl hover:shadow-xl transition duration-200 shadow-input p-4 bg-[#171717] border border-transparent justify-between flex flex-col space-y-4">
            <div className="flex flex-1 w-full h-full min-h-[2rem] rounded-xl [mask-image:radial-gradient(ellipse_at_center,white,transparent)] bg-neutral-100bg-black"></div>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <h1 className="xl:text-[1.5rem] lg:text-[1.4rem] md:text-[1.1rem] text-[1rem] font-bold">FileName</h1>
                    <p className="w-[90%] truncate text-xs font-normal opacity-50">This is the file name I am currently created and is really nice to have it</p>
                </div>
                <div className="flex items-center">
                    <Link href="/" className="rounded-lg bg-[#cf0] px-4 py-2 font-medium text-[#111] text-sm">View</Link>
                </div>
            </div>
        </div>
    )
}

export default FileInfo