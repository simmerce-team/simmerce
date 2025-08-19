"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/AuthContext"
import { Loader2, LogOut, UserIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function NavUser() {
  const [isClient, setIsClient] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const { user, profile, isLoading, signOut } = useAuth()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      await signOut()
      // The page will reload after sign out, so we don't need to reset the state
    } catch (error) {
      console.error('Error signing out:', error)
      setIsSigningOut(false)
    }
  }

  // Show loading state or nothing during SSR/hydration
  if (!isClient || isLoading) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="h-9 w-9 border-slate-200 p-0"
        disabled
      >
        <UserIcon className="h-4 w-4" />
      </Button>
    )
  }

  if (!user) {
    return (
      <Button asChild variant="outline" size="sm">
        <Link href="/auth/login">Sign in</Link>
      </Button>
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-9 border-slate-200 p-0"
          >
            <UserIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {profile?.full_name || 'User'}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
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
            disabled={isSigningOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isSigningOut} onOpenChange={setIsSigningOut}>
        <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <DialogTitle>Signing out...</DialogTitle>
            <DialogDescription className="text-center">
              Please wait while we sign you out of your account.
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
