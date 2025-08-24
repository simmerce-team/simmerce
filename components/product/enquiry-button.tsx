"use client"

import { sendEnquiry, type SendEnquiryState } from "@/actions/conversations"
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
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState, useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"

type EnquiryButtonProps = {
  productId: string
  sellerId: string // business_id
  productName: string
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Sending..." : "Send Enquiry"}
    </Button>
  )
}

export function EnquiryButton({ productId, sellerId, productName }: EnquiryButtonProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  // Server Action state
  const initialState: SendEnquiryState = { ok: false }
  const [state, formAction] = useActionState(sendEnquiry, initialState)

  // Surface server errors (no success toast because we redirect on success)
  useEffect(() => {
    if (state?.error) {
      toast.error(state.error)
    }
  }, [state?.error])

  const handleEnquiryClick = () => {
    if (!user) {
      // Fast client redirect to login; server action also handles it as a fallback
      const returnUrl = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname
      router.push(`/auth?redirectedFrom=${encodeURIComponent(returnUrl || "/")}`)
      return
    }
    setIsOpen(true)
  }

  return (
    <>
      <Button
        onClick={handleEnquiryClick}
        className="w-full mt-4"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Enquire Now"}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send Enquiry</DialogTitle>
            <DialogDescription>
              Send a message to the seller about: <span className="font-medium">{productName}</span>
            </DialogDescription>
          </DialogHeader>

          <form action={formAction} className="grid gap-4 py-4">
            {/* Hidden fields for server action */}
            <input type="hidden" name="productId" value={productId} />
            <input type="hidden" name="sellerId" value={sellerId} />
            <input type="hidden" name="pathname" value={pathname || "/"} />
            <input type="hidden" name="search" value={searchParams.toString()} />

            <div className="grid gap-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="I'm interested in this product. Could you please provide more details about..."
                className="min-h-[120px]"
                required
                minLength={2}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsOpen(false)
                  setMessage("")
                }}
              >
                Cancel
              </Button>
              <SubmitButton />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
