"use client";

import FilesList from '@/components/FilesList';
import ProfileCard from '@/components/ProfileCard';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Separator } from "@/components/ui/separator"
import ResourcesList from '@/components/ResourcesList';
import { Settings2 } from 'lucide-react';



const Dashboard = () => {

  const { userId } = useParams()
  const [userData, setUserData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
        const data = await response.json();
        setUserData(data?.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [])
  return (
    <div className="flex items-center w-full flex-col px-4 h-[90vh] relative pt-10">
      <div className="flex items-center justify-between w-full">
        <ProfileCard userData={userData} />
        <Settings2 />
      </div>
      <Separator />
      <div className="flex flex-col gap-8 w-full">
        <FilesList />
        <ResourcesList />
      </div>
    </div>
  )
}

export default Dashboard