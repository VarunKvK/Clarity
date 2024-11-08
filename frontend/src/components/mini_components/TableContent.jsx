import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "../ui/badge"
import Link from "next/link"
import { Button } from "../ui/button"

export function TableContent({ notionData }) {
    console.log("Notion", notionData.properties)
    return (
        <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead className="">Pdf</TableHead>
                    <TableHead>Content Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Uploaded On</TableHead>
                    <TableHead className="text-right">Link</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {notionData?.map((notion) => (
                    <TableRow key={notion.properties?.properties.SlugId?.rich_text[0].plain_text}>
                        <TableCell className="font-medium truncate">{notion.properties?.properties.FileName?.title[0].plain_text}</TableCell>
                        <TableCell className="font-medium truncate">{notion.properties?.properties.FileTitle?.rich_text[0].plain_text}</TableCell>
                        <TableCell>
                            <Badge variant="outline" className={`bg-${notion?.properties?.properties.Type?.select?.color}-400 text-white`}>
                                {notion?.properties?.properties.Type?.select?.name}
                            </Badge>

                        </TableCell>
                        <TableCell className="text-right">{notion.properties?.properties.UploadDate?.date.start}</TableCell>
                        <TableCell className="text-right">
                            <Button asChild className="rounded-md border border-white text-white text-xs hover:-translate-y-1 transform transition duration-200 hover:shadow-md hover:bg-[#cf0] hover:text-[#111] px-2 py-2">
                                <Link href={notion.properties?.url} target="_blank">
                                    Visit Notion
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
