'use client'

import React from 'react'
import Profile  from './mini_components/Avatar'
import { Badge } from "@/components/ui/badge"
import { Circle } from 'lucide-react'


const ProfileCard = ({ userData }) => {
  // console.log(userData)
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };
  return (
    <div className=" flex items-center gap-2 w-full p-4 pb-6">
      <Profile profileImage={userData?.image}
        profileInitial={userData?.name ? getInitials(userData.name) : '' }
        className="h-[6rem] w-[6rem]"
      />
      <div className="flex flex-col leading-tight">
        <div className="flex items-start gap-1">
        <h1 className="text-[2rem]">{userData?.name}</h1>
        {userData && userData?.notionIntegrationStatus &&
        <Badge variant="outline" className="border border-[#cf0] rounded-full text-[#cf0] flex items-center gap-1">
          <Circle fill="#cf0" className='w-2.5'/>
          <span className="hidden md:block">
          Notion Integrated
          </span>
          </Badge>
        }
        {!userData && !userData?.notionIntegrationStatus &&
        <Badge variant="outline" className="border border-[#ff8000] rounded-full text-[#ff8000] flex items-center gap-1">
          <Circle fill="#ff8000" className='w-2.5'/>
          <span className="hidden md:block">
          Notion Integrated
          </span>
          </Badge>
        }
        </div>
        <p className="text-[.7rem] opacity-50">User Id-{userData?._id}</p>
      </div>
    </div>
  )
}

export default ProfileCard