"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"
import { ComponentProps, forwardRef, useState } from "react"

type InputProps = ComponentProps<typeof Input>

export interface PasswordInputProps extends Omit<InputProps, 'type'> {
  showStrength?: boolean
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showStrength = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    
    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"
