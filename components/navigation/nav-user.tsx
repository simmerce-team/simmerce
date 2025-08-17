"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/AuthContext"
import { ChevronDown, LogOut, UserIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function NavUser() {
  const [isClient, setIsClient] = useState(false)
  const { user, profile, signOut } = useAuth()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Show loading state or nothing during SSR/hydration
  if (!isClient) {
    return (
      <Button
        variant="outline"
        className="flex items-center gap-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
        disabled
      >
        <UserIcon className="w-4 h-4 text-slate-600" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
        >
          <UserIcon className="w-4 h-4 text-slate-600" />
          {profile?.full_name || user?.email?.split('@')[0]}
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="w-full cursor-pointer">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="w-full cursor-pointer">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="text-red-600 focus:text-red-700 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
