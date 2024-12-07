'use client'
import Profile from '@/components/mini_components/Avatar';
import Loading from '@/components/mini_components/Loader';
import { TableContent } from '@/components/mini_components/TableContent';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const MyFiles = () => {
    const { userId } = useParams();
    const { toast } = useToast();
    const [userData, setUserData] = useState(null);
    const [notionData, setNotionData] = useState(null);
    const [loadingUserData, setLoadingUserData] = useState(true);
    const [loadingNotionData, setLoadingNotionData] = useState(true);
    const [error, setError] = useState(null);

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase();
    };

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("/api/user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch user data.");
                const data = await response.json();
                setUserData(data?.user);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Failed to load user data.");
            } finally {
                setLoadingUserData(false);
            }
        };
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
                    description: `Failed to load recent uploads. Please try again.Error is: ${error}`,
                })
            } finally {
                setLoadingNotionData(false);
            }
        };

        fetchNotionData();
        fetchUserData();
    }, [userId]);

    if (loadingUserData || loadingNotionData) {
        return <Loading />;
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between pt-8 px-6 pb-4">
                <div className="leading-tight">
                    <h1 className="text-[3rem] font-medium">
                        My Files
                    </h1>
                    <p className="text-gray-200 font-normal opacity-50">This is where all the files you had uploaded is visible.</p>
                </div>
                <Profile profileImage={userData?.image} profileInitial={userData?.name ? getInitials(userData.name) : ''} />
            </div>
            <div className="p-4 hidden md:block">
                <TableContent
                    notionData={notionData}
                />
            </div>
            <div className="block md:hidden grid p-6 gap-4">
                {notionData?.map((notion) => (
                    <FileCard key={notion.id} notion={notion} />
                ))}
            </div>
        </div>
    )
}

export default MyFiles

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