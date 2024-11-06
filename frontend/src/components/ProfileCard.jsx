import React from 'react'
import { Profile } from './mini_components/Avatar'
import { Badge } from "@/components/ui/badge"


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
        profileInitial={userData?.name ? getInitials(userData.name) : ''}
      />
      <div className="flex flex-col leading-tight">
        <div className="flex items-start gap-1">
        <h1 className="text-[2rem]">{userData?.name}</h1>
        {userData && userData?.notionIntegrationStatus &&
        <Badge variant="outline" className="border border-[#cf0] rounded-full text-[#cf0]">Notion Integrated</Badge>
        }
        </div>
        <p className="text-[.7rem] opacity-50">User Id-{userData?._id}</p>
      </div>
    </div>
  )
}

export default ProfileCard