"use client"

import { checkEmailExists } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

function AuthForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectedFrom = searchParams.get('redirectedFrom') || '/'

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  // Update form when redirectedFrom changes
  useEffect(() => {
    // This effect ensures we have the latest redirectedFrom value
    // when the form is submitted
  }, [searchParams])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { exists } = await checkEmailExists(values.email)
      
      if (!exists) {
        // New user, redirect to signup with email
        router.push(`/auth/signup?email=${encodeURIComponent(values.email)}&redirectedFrom=${encodeURIComponent(redirectedFrom)}`)
      } else {
        // Existing user, redirect to login with email and redirect back
        router.push(`/auth/login?email=${encodeURIComponent(values.email)}&redirectedFrom=${encodeURIComponent(redirectedFrom)}`)
      }
    } catch (error) {
      console.error("Error checking email:", error)
      toast.error("An error occurred. Please try again.")
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome to Simmerce</CardTitle>
        <CardDescription>
          Enter your email to sign in or create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Checking..." : "Continue"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Suspense fallback={
        <Card className="w-full max-w-md p-8">
          <div className="space-y-4">
            <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
            <div className="space-y-2 pt-4">
              <div className="h-10 w-full animate-pulse rounded bg-gray-200"></div>
              <div className="h-10 w-full animate-pulse rounded bg-gray-200"></div>
            </div>
          </div>
        </Card>
      }>
        <AuthForm />
      </Suspense>
    </div>
  )
}
