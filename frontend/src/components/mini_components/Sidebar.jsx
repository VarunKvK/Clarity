'use client'

import { Cable, FilePlusIcon, FolderOpen, GalleryVerticalEnd, Home, Settings, ShieldPlus } from "lucide-react"
import { Separator } from "@/components/ui/separator"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Profile from "./Avatar"
import SideBarPopover from "./SideBarPopover"
import UpgradeInfo from "./UpgradeInfo"
import { useEffect, useState } from "react"


export function AppSidebar({ userData }) {
    const [notion, setNotionData] = useState();
    const [loadingNotion, setLoadingNotionData] = useState(true);

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase();
    };
    // Menu items.
    const items = [
        {
            title: "Dashboard",
            url: `/myspace/${userData?._id}`,
            icon: Home,
        },
        {
            title: "My Files",
            url: `/myspace/${userData?._id}/myfiles`,
            icon: FolderOpen,
        },
        {
            title: "My Resources",
            url: `/myspace/${userData?._id}/myresources`,
            icon: GalleryVerticalEnd,
        },
        {
            title: "Upgrade",
            url: `/myspace/${userData?._id}/upgrade`,
            icon: ShieldPlus,
        },
        {
            title: "Integration",
            url: `/integration`,
            icon: Cable,
        },
        {
            title: "Settings",
            url: "/settings",
            icon: Settings,
        },
    ]

    useEffect(() => {

        const fetchNotionData = async () => {
            try {
                const response = await fetch("/api/notion", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch Notion data.");
                const data = await response.json();
                setNotionData(data?.pages);
            } catch (err) {
                console.error("Error fetching Notion data:", err);
                setError("Failed to load Notion data.");
                toast({
                    variant: "destructive",
                    title: "Error loading Notion data",
                    description: `Failed to load recent uploads. Please try again.Error is: ${err}`,
                })
            } finally {
                setLoadingNotionData(false);
            }
        };
        fetchNotionData();
    },[userData])

    return (
        <Sidebar>
            <SidebarContent className="bg-[#111] text-white">
                <div className="p-4 pb-2">
                    <Link href="/" className="text-[2rem] text-[#cf0] font-bold">Clarity</Link>
                </div>
                <Separator />
                <div className="">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            {/* <SidebarMenuItem> */}
                            <SidebarMenuButton asChild className="hover:bg-[#cf0] bg-[#282828] p-4">
                                <a href="/newuploads" className="flex items-center gap-1 justify-center">
                                    <FilePlusIcon />
                                    <span className="">
                                        Upload new PDF
                                    </span>
                                </a>
                            </SidebarMenuButton>
                            {/* </SidebarMenuItem> */}
                        </SidebarGroupContent>
                    </SidebarGroup>
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="hover:bg-[#cf0]">
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="bg-[#111] text-white">
                <UpgradeInfo userData={userData} notion={notion} loadingNotion={loadingNotion}/>
                <Separator />
                <div className="flex justify-between items-center py-1">
                    <div className="flex items-center gap-1">
                        <Profile profileImage={userData.image} profileInitial={getInitials(userData.name)} />
                        <p className="">{userData.name}</p>
                    </div>
                    <SideBarPopover userData={userData}/>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
