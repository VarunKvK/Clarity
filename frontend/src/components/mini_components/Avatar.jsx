import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export default function Profile({profileImage,profileInitial, className}) {
    return (
      <Avatar className={`${className}`}>
        <AvatarImage src={profileImage} alt="@shadcn"/>
        <AvatarFallback>{profileInitial}</AvatarFallback>
      </Avatar>
    )
  }
  