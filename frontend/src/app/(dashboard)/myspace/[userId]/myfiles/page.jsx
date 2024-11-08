'use client'
import Loading from '@/components/mini_components/Loader';
import { TableContent } from '@/components/mini_components/TableContent';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const MyFiles = () => {
    const { userId } = useParams();
    const { toast } = useToast();
    const [notionData, setNotionData] = useState(null);
    const [loadingNotionData, setLoadingNotionData] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user data
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
                    description: `Failed to load recent uploads. Please try again.Error is: ${error}`,
                })
            } finally {
                setLoadingNotionData(false);
            }
        };

        fetchNotionData();
    }, [userId]);

    if (loadingNotionData) {
        return <Loading />;
    }

    return (
        <div className="w-full">
            <div className="pt-8 px-6 pb-4">
                <h1 className="text-[3rem]">
                    My Files
                </h1>
                <p className="text-gray-200">This is where all the files you had uploaded is visible.</p>
            </div>
            <Separator/>
            <div className="p-4">
                <TableContent
                    notionData={notionData}
                />
            </div>
        </div>
    )
}

export default MyFiles