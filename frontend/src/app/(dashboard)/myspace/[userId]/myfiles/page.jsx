'use client'
import Profile from '@/components/mini_components/Avatar';
import Loading from '@/components/mini_components/Loader';
import { TableContent } from '@/components/mini_components/TableContent';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
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
                    <p className="text-gray-200 font-normal">This is where all the files you had uploaded is visible.</p>
                </div>
                <Profile profileImage={userData?.image} profileInitial={userData?.name ? getInitials(userData.name) : ''} />
            </div>
            <div className="p-4">
                <TableContent
                    notionData={notionData}
                />
            </div>
        </div>
    )
}

export default MyFiles