import { CircleAlert } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import Link from "next/link"

export function AlertContainer() {
    return (
        <Alert className="w-full bg-[#ffea2969] border-[#ffea29] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
                <CircleAlert className="h-6 w-6" stroke="white" />
                <div className="flex flex-col">
                    <AlertTitle className="text-base">Heads up!</AlertTitle>
                    <AlertDescription>
                        Integrate your Notion with Clarity to get an elevated experience of studying!
                    </AlertDescription>
                </div>
            </div>
            <Link className="border border-white rounded-lg px-2 py-4" href={process.env.NEXT_PUBLIC_AUTHORIZATION_URL} passHref>
                Integrate Notion
            </Link>
        </Alert>
    )
}
