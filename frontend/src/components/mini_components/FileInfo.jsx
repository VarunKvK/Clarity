import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Eye, Trash } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const FileInfo = ({ title, desc,
    // notionurl,
    slugId,
    userId
 }) => {
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
                    {pathname && (<Link href={`/myspace/${userId}/myresources/${slugId?.plain_text}`} className="rounded-lg bg-[#cf0] hover:bg-[#aecc33] px-4 py-2 font-medium text-[#111] text-sm">View</Link>)}

                    {/* {pathname && (<Alert
                        className="rounded-lg bg-[#cf0] hover:bg-[#aecc33] px-4 py-2 font-medium text-[#111] text-sm"
                        icon={<Eye />}
                        title={"You want to leave the page?"}
                        description={"You are about to leave the page"}
                        actions={"Leave"}
                    />)}


                    {pathname && (
                        <Alert
                            className="bg-red-500 hover:bg-red-200 border-none"
                            icon={<Trash />}
                            title={"Are you absolutely sure?"}
                            description={"This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
                            actions={"Continue"}
                        />
                    )} */}

                </div>
            </div>
        </div>
    )
}

export default FileInfo

export function Alert({ className, icon, title, description, actions }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className={className}>
                    {icon}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#111] text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-[#cf0] text-[#111]">Cancel</AlertDialogCancel>
                    <AlertDialogAction>{actions}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
