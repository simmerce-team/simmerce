"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/context/AuthContext"
import { createClient } from "@/utils/supabase/client"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

type EnquiryButtonProps = {
  productId: string
  sellerId: string  // This should be the business_id, not user_id
  productName: string
}

export function EnquiryButton({ productId, sellerId, productName }: EnquiryButtonProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const searchParams = useSearchParams()
  const supabase = createClient()

  const handleEnquiryClick = () => {
    if (!user) {
      // Redirect to login with return URL
      const returnUrl = searchParams.toString()
        ? `${window.location.pathname}?${searchParams.toString()}`
        : window.location.pathname
      router.push(`/auth?redirectedFrom=${encodeURIComponent(returnUrl)}`)
      return
    }
    setIsOpen(true)
  }

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error("Please enter your enquiry message")
      return
    }

    if (!user) {
      toast.error("Please log in to send an enquiry")
      return
    }

    try {
      setIsSubmitting(true)

      // 1. Create a new conversation
      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .insert({
          buyer_id: user.id,
          seller_business_id: sellerId,
          product_id: productId,
          status: 'open'
        })
        .select()
        .single()

      if (convError) throw convError

      // 2. Add the first message to the conversation
      const { error: msgError } = await supabase
        .from('conversation_messages')
        .insert({
          conversation_id: conversation.id,
          sender_id: user.id,
          message_type: 'text',
          message_content: message
        })

      if (msgError) throw msgError
      
      toast.success("Enquiry sent successfully!")
      setIsOpen(false)
      setMessage("")
      
      // Optionally, redirect to the messages page
      router.push('/enquiries')
      
    } catch (error) {
      console.error('Error sending enquiry:', error)
      toast.error("Failed to send enquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Button 
        onClick={handleEnquiryClick}
        className="w-full mt-4"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Enquire Now'}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send Enquiry</DialogTitle>
            <DialogDescription>
              Send a message to the seller about: <span className="font-medium">{productName}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="I'm interested in this product. Could you please provide more details about..."
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsOpen(false)
                setMessage("")
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || !message.trim()}
            >
              {isSubmitting ? 'Sending...' : 'Send Enquiry'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
