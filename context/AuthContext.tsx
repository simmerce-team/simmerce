"use client"

import { createClient } from '@/utils/supabase/client'
import { Session, User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type UserRole = 'buyer' | 'seller' | 'admin' | null

type Profile = {
  id: string
  full_name: string | null
  email: string | null
  phone: string | null
  role: UserRole
  avatar_url: string | null
  created_at: string
  updated_at: string
}

type AuthContextType = {
  session: Session | null
  user: User | null
  profile: Profile | null
  role: UserRole
  isLoading: boolean
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ 
  children,
  initialSession = null 
}: { 
  children: ReactNode
  initialSession?: Session | null 
}) {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(initialSession)
  const [user, setUser] = useState<User | null>(initialSession?.user ?? null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isMounted, setIsMounted] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const fetchProfile = async (userId: string) => {
    if (!isMounted) return null
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      
      if (isMounted) {
        setProfile(data)
      }
      return data
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    }
  }

  const refreshSession = async () => {
    if (!isMounted) return
    
    try {
      setIsLoading(true)
      const { data: { session: freshSession } } = await supabase.auth.getSession()
      
      if (isMounted) {
        setSession(freshSession)
        setUser(freshSession?.user ?? null)
        
        if (freshSession?.user) {
          await fetchProfile(freshSession.user.id)
        } else {
          setProfile(null)
        }
      }
    } catch (error) {
      console.error('Error refreshing session:', error)
    } finally {
      if (isMounted) {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    if (!isMounted) return
    
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession()
        
        if (isMounted) {
          setSession(currentSession)
          setUser(currentSession?.user ?? null)
          
          if (currentSession?.user) {
            await fetchProfile(currentSession.user.id)
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    initializeAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (isMounted) {
        setSession(session)
        setUser(session?.user ?? null)
        
        if (event === 'SIGNED_IN' && session?.user) {
          await fetchProfile(session.user.id)
        } else if (event === 'SIGNED_OUT') {
          setProfile(null)
        }
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [isMounted])

  const signOut = async () => {
    if (!isMounted) return
    
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      if (isMounted) {
        setSession(null)
        setUser(null)
        setProfile(null)
      }
      
      // Use window.location to ensure a full page reload and clear all state
      window.location.href = '/auth'
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const value = {
    session,
    user,
    profile,
    role: profile?.role || null,
    isLoading,
    signOut,
    refreshSession,
  } as const

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
