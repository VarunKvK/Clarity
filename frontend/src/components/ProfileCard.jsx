import React from 'react'
import { Profile } from './mini_components/Avatar'

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
        <h1 className="text-[2rem]">{userData?.name}</h1>
        <p className="text-[.7rem] opacity-50">User Id-{userData?._id}</p>
      </div>
    </div>
  )
}

export default ProfileCard