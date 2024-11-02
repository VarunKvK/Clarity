import { Cable, Calendar, FolderOpen, GalleryVerticalEnd, Home, Inbox, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"


export function AppSidebar({userData}) {
    // Menu items.
    const items = [
        {
            title: "Home",
            url: "/",
            icon: Home,
        },
        {
            title: "My Files",
            url: `/myfiles`,
            icon: FolderOpen,
        },
        {
            title: "My Resources",
            url: `/myresources`,
            icon: GalleryVerticalEnd,
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
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Clarity Dashboard
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
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
        </Sidebar>
    )
}
