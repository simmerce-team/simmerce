"use client"

import { useAuth } from '@/context/AuthContext'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProfilePage() {
  const { user, profile, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to auth page if not logged in and loading is complete
    if (!isLoading && !user) {
      router.push('/auth?redirect=/profile')
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium">Personal Information</h2>
            <div className="mt-2 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="mt-1">{profile?.full_name || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="mt-1">{user.email}</p>
              </div>
              {profile?.phone && (
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="mt-1">{profile.phone}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}