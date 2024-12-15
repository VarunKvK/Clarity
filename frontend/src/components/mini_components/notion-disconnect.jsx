'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export function NotionDisconnect() {
  const [isConnected, setIsConnected] = useState()
  const { toast } = useToast()

  const handleDisconnect = async () => {
    try {
      const response = await fetch("/api/notion/disconnect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to disconnect Notion");
      }

      setIsConnected(false);
      toast({
        title: "Success",
        description: "Notion disconnected successfully",
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error("Error disconnecting Notion:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to disconnect Notion",
      });
      // Reset the switch state if there's an error
      setIsConnected(true);
    }
  }

  return (
    <div className="flex items-center justify-between bg-[#16666]">
      <span className="font-medium">Notion Connection</span>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Switch className="bg-[#161616] transition-colors" checked={isConnected} />
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-gray-900 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              This action will disconnect your Notion integration. You can always reconnect later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDisconnect} className="bg-[#cf0] text-black hover:bg-[#cf0]/80">
              Disconnect
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

