"use client"

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useAuth } from '@/context/AuthContext'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SettingsPage() {
  const { user, profile, isLoading } = useAuth()
  const router = useRouter()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Redirect to auth page if not logged in and loading is complete
    if (!isLoading && !user) {
      router.push('/auth?redirect=/setting')
    }
  }, [user, isLoading, router])

  // Show loading state
  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  const handleSaveChanges = async () => {
    // TODO: Implement save settings functionality
    console.log('Saving settings...', { notificationsEnabled, darkMode })
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 space-y-8">
        <div>
          <h2 className="text-lg font-medium mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications" className="font-normal">
                  Email Notifications
                </Label>
                <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
              </div>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode" className="font-normal">
                  Dark Mode
                </Label>
                <p className="text-sm text-gray-500">Switch between light and dark theme</p>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h2 className="text-lg font-medium mb-4">Danger Zone</h2>
          <div className="bg-red-50 p-4 rounded-md border border-red-100">
            <h3 className="font-medium text-red-700">Delete Account</h3>
            <p className="text-sm text-red-600 mt-1 mb-3">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </div>
      </div>
    </div>
  )
}