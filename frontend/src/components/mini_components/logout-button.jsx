'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SignOutButton } from '@clerk/nextjs'

export function LogoutButton() {
  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...')
  }

  return (
    <Button
      onClick={handleLogout}
      className="w-full bg-[#161616] hover:bg-[#cf0] hover:text-black transition-colors"
    >
      <LogOut className="mr-2 h-4 w-4" />
      <SignOutButton/>
    </Button>
  )
}

