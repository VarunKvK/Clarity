import Link from 'next/link'
import React from 'react'

const FileInfo = ({title,desc}) => {
    // console.log(title)
    console.log(desc)
    return (
        <div className="row-span-1 rounded-xl hover:shadow-xl transition duration-200 shadow-input p-4 bg-[#171717] border border-transparent justify-between flex flex-col space-y-4">
            <div className="flex flex-1 w-full h-full min-h-[4rem] rounded-xl [mask-image:radial-gradient(ellipse_at_center,white,transparent)] bg-neutral-100bg-black"></div>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <h1 className="md:text-[1.2rem] text-[1rem] font-bold truncate">{title.plain_text}</h1>
                    <p className="truncate text-xs font-normal opacity-50">{desc?.plain_text}</p>
                </div>
                <div className="flex items-center">
                    <Link href="/" className="rounded-lg bg-[#cf0] px-4 py-2 font-medium text-[#111] text-sm">View</Link>
                </div>
            </div>
        </div>
    )
}

export default FileInfo