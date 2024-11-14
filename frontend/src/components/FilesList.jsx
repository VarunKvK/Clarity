import React from 'react'
import FileInfo from './mini_components/FileInfo'
import { LayoutGrid } from 'lucide-react'
import Link from 'next/link'
import { TableContent } from './mini_components/TableContent'

const FilesList = ({ data }) => {
    // console.log(data)
    return (
        <div className=" flex flex-col w-full p-4 gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-[2rem]">
                    Recent uploads
                </h1>
                <Link href={"/"} className="flex items-center gap-1 p-1.5 px-2 text-sm border border-[#ffffffa0] rounded-lg opacity-50">
                    <LayoutGrid className='h-4 w-4' />
                    <span className="">
                        View All
                    </span>
                </Link>
            </div>
            <div className="">
                <TableContent
                    notionData={data.slice(0,4)}
                />
            </div>
        </div>
    )
}

export default FilesList

// [0].content[2].paragraph.rich_text[0].plain_text