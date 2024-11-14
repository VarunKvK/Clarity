import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { UserPen } from "lucide-react"
import { Button } from "../ui/button"

const EditProfile = ({userData}) => {
    return(
    <Sheet>
        <SheetTrigger>
            <Button className="bg-transparent flex items-center gap-1">
                <UserPen />
                <p className="">Edit Profile</p>
            </Button>
        </SheetTrigger>
        <SheetContent className="bg-[#111] text-white">
            <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>
    )
}

export default EditProfile;
