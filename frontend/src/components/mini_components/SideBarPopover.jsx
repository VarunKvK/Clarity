import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Ellipsis, LogOut } from 'lucide-react'
import { SignOutButton } from '@clerk/nextjs'
import EditProfile from './EditProfile'
import { Button } from '../ui/button'


const SideBarPopover = ({ userData }) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Ellipsis />
            </PopoverTrigger>
            <PopoverContent className="bg-[#111] w-auto p-2">
                <div className="flex flex-col gap-2">
                    <EditProfile userData={userData} />
                    <Button asChild className="text-white text-sm opacity-50 hover:opacity-100">
                        <div className="flex items-center gap-1">
                            <LogOut />
                            <SignOutButton />
                        </div>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default SideBarPopover