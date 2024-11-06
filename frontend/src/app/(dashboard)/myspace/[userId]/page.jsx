"use client";

import FilesList from '@/components/FilesList';
import ProfileCard from '@/components/ProfileCard';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Separator } from "@/components/ui/separator"
import ResourcesList from '@/components/ResourcesList';
import { Settings2 } from 'lucide-react';
import { AlertContainer } from '@/components/mini_components/AlertContainer';



const Dashboard = () => {

  const { userId } = useParams()
  const [userData, setUserData] = useState()
  const [notion,setNotionData]=useState()

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

    const fetchNotion=async()=>{
      const response=await fetch("/api/notion",
        {
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
          },
        }
      )
      const data=await response.json()
      setNotionData(data?.pages)
      console.log(data?.pages)
    }

    fetchNotion()
  }, [userId])

  return (
    <div className="xl:max-w-8xl lg:max-w-6xl md:max-w-4xl max-w-2xl flex items-center w-full flex-col px-4 h-[90vh] relative pt-10">
      <div className="flex items-center justify-between w-full">
        <ProfileCard userData={userData} />
        <Settings2 />
      </div>
      <Separator />
      {userData && !userData?.notionIntegrationStatus &&
        <div className="py-4 w-full">
          <AlertContainer />
        </div>
      }
      {userData && !userData?.notionIntegrationStatus &&
        <Separator />
      }
      <div className="flex flex-col gap-8 w-full">
        <FilesList data={notion}/>
        <ResourcesList data={notion}/>
      </div>
    </div>
  )
}

export default Dashboard
