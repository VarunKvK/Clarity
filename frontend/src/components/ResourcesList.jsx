import { LayoutGrid } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import FileInfo from './mini_components/FileInfo'

const ResourcesList = ({data}) => {
    // console.log(data)
    return (
        <div className="flex flex-col w-full p-4 gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-[2rem]">
                    Your Resources
                </h1>
                <Link href={"/"} className="flex items-center gap-1 p-1.5 px-2 text-sm border border-[#ffffffa0] rounded-lg opacity-50">
                    <LayoutGrid className='h-4 w-4' />
                    <span className="">
                        View All
                    </span>
                </Link>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                {data?.slice(0, 3).map((notion) => (
                    <FileInfo key={notion.properties.id} title={notion?.properties.properties.FileTitle?.rich_text[0]}
                    desc={notion?.content[2].paragraph?.rich_text[0]}
                    notionurl={notion?.properties?.url}
                    />
                ))}
            </div>
        </div>
    )
}

export default ResourcesList