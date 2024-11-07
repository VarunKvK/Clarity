"use client";

import FilesList from '@/components/FilesList';
import ProfileCard from '@/components/ProfileCard';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Separator } from "@/components/ui/separator";
import ResourcesList from '@/components/ResourcesList';
import { Settings2 } from 'lucide-react';
import { AlertContainer } from '@/components/mini_components/AlertContainer';
import Loading from '@/components/mini_components/Loader';
import { useToast } from '@/hooks/use-toast';
import EmptyState from '@/components/mini_components/EmptyState';

const Dashboard = () => {
  const { userId } = useParams();
  const { toast } = useToast();
  const [userData, setUserData] = useState(null);
  const [notionData, setNotionData] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [loadingNotionData, setLoadingNotionData] = useState(true);
  const [error, setError] = useState(null);

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

    fetchUserData();
    fetchNotionData();
  }, [userId]);

  if (loadingUserData || loadingNotionData) {
    return <Loading />;
  }

  return (
    <div className="flex items-center w-full flex-col px-4 h-[90vh] relative pt-10">
      <div className="flex items-center justify-between w-full">
        <ProfileCard userData={userData} />
        <Settings2 />
      </div>
      <Separator />

      {userData && !userData?.notionIntegrationStatus && (
        <>
          <div className="py-4 w-full">
            <AlertContainer />
          </div>
          <Separator />
        </>
      )}

      <div className="flex flex-col gap-8 w-full">
        {notionData?.length > 0 ? (
          <>
            <ResourcesList data={notionData} />
            <FilesList data={notionData} />
          </>
        ) : (
          <EmptyState
            title="No recent uploads found"
            message="You haven't uploaded any files yet. Start adding some content to see it here!"
            buttonText="Upload Now"
            link="/newuploads"
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
