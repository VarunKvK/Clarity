import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import { Alert } from '../ui/alert'

const FileInfo = ({ title, desc }) => {
    const url = usePathname()
    const containskeyword = url.includes("myresources")
    const [pathname, setPathname] = useState(false);
    useEffect(() => {
        if (containskeyword) {
            setPathname(true);
        } else {
            setPathname(pathname);
        }
    }, [])
    return (
        <div className="row-span-1 rounded-xl hover:shadow-xl transition duration-200 shadow-input p-4 bg-[#171717] border border-transparent justify-between flex flex-col space-y-4">
            <div className="flex flex-1 w-full h-full min-h-[4rem] rounded-xl [mask-image:radial-gradient(ellipse_at_center,white,transparent)] bg-neutral-100bg-black"></div>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <h1 className="md:text-[1.2rem] text-[1rem] font-bold truncate">{title.plain_text}</h1>
                    <p className="truncate text-xs font-normal opacity-50">{desc?.plain_text}</p>
                </div>
                <div className="flex items-center justify-between">
                    <Link href="/" className="rounded-lg bg-[#cf0] hover:bg-[#aecc33] px-4 py-2 font-medium text-[#111] text-sm">View</Link>
                    {pathname && (
                        <Alert
                            // icon={<Trash />}
                            // title="Are you absolutely sure?"
                            // desc="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                            // action={"Continue"}
                            className="bg-red-100 hover:bg-red-500 w-auto text-[#111] hover:text-[#fff]"
                        />
                    )}

                </div>
            </div>
        </div>
    )
}

export default FileInfo