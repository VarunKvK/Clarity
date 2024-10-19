import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

const Dropmenu = ({ dropdownMenu, icon }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {icon}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {dropdownMenu.map((item) => (
                    <DropdownMenuItem asChild key={item.name}>
                        <Link href={item.href}>{item.name}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Dropmenu