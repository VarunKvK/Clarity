import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export function Profile({profileImage,profileInitial}) {
    return (
      <Avatar className="h-[6rem] w-[6rem]">
        <AvatarImage src={profileImage} alt="@shadcn"/>
        <AvatarFallback>{profileInitial}</AvatarFallback>
      </Avatar>
    )
  }
  