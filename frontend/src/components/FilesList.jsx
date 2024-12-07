import React from 'react'
import FileInfo from './mini_components/FileInfo'
import { LayoutGrid } from 'lucide-react'
import Link from 'next/link'
import { TableContent } from './mini_components/TableContent'
import { Badge } from './ui/badge'

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
            <div className="p-4 hidden md:block">
                <TableContent
                    notionData={data.slice(0,4)}
                />
            </div>
            <div className="block md:hidden grid gap-4">
                {data?.map((notion) => (
                    <FileCard key={notion.id} notion={notion} />
                ))}
            </div>
        </div>
    )
}

export default FilesList

// [0].content[2].paragraph.rich_text[0].plain_text
const FileCard = ({ notion }) => {
    return (
        <div className="w-full bg-[#171717] rounded-xl p-4">
        <div className="w-full grid grid-cols-3 gap-4">
            <div className="flex flex-col items-start justify-between col-span-2">
                <h1 className="font-semibold truncate w-[85%] text-sm">{notion.properties?.properties.FileName?.title[0].plain_text}</h1>
                <Badge variant="outline" style={{ backgroundColor: notion?.properties?.properties?.Type?.select?.color, color: "white", border:"none"}}>{notion?.properties?.properties?.Type?.select?.name}</Badge>
            </div>
            <div className="flex flex-col items-end justify-between gap-2">
                <p className="text-xs opacity-50">Date {notion.properties?.properties.UploadDate?.date.start}</p>
                <Link href={`/`} className="rounded-lg bg-[#cf0] hover:bg-[#aecc33] px-4 py-2 font-medium text-[#111] text-sm">View</Link>
            </div>
        </div>
        {/* <Link href={`/myspace/${userId}/myresources/${slugId?.plain_text}`} className="rounded-lg bg-[#cf0] hover:bg-[#aecc33] px-4 py-2 font-medium text-[#111] text-sm">View</Link> */}
    </div>
    )
}