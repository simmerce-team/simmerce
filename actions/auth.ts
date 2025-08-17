"use server"

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'

const signInSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

export async function signIn(formData: FormData) {
  const supabase = await createClient()
  
  const result = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!result.success) {
    return { error: result.error.message }
  }
  
  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

const signUpSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
})

export async function signUp(formData: FormData) {
  const supabase = await createClient()
  
  const result = signUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
    phone: formData.get('phone'),
  })

  if (!result.success) {
    return { error: result.error.message }
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: {
        full_name: result.data.name,
      },
    },
  })

  if (authError) {
    return { error: authError.message }
  }

  if (authData.user) {
    const { error: userError } = await supabase
      .from('users')
      .insert([
        { 
          id: authData.user.id,
          email: result.data.email,
          full_name: result.data.name,
          phone: result.data.phone,
          role: 'buyer',
        },
      ])

    if (userError) {
      // Attempt to delete the auth user if user creation fails
      await supabase.auth.admin.deleteUser(authData.user.id)
      return { error: 'Failed to create user profile' }
    }
  }

  return { success: true, email: result.data.email }
}

export async function signOut() {
  'use server'
  
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Error signing out:', error)
    throw error
  }
  
  // Clear any session cookies by setting an expired cookie
  const response = new Response(null, {
    headers: {
      'Set-Cookie': `sb-${process.env.NEXT_PUBLIC_SUPABASE_REF_ID}-auth-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax`
    }
  })
  
  return response
}

export async function getSession() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getUserRole(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching user role:', error)
    return { role: 'buyer' } // Default role
  }

  return { role: data?.role || 'buyer' }
}

export async function checkEmailExists(email: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('users')
    .select('email')
    .eq('email', email)
    .single()

  if (error && error.code !== 'PGRST116') { // Ignore 'not found' error
    console.error('Error checking email:', error)
    return { exists: false }
  }

  return { exists: !!data }
}
