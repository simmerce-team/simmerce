"use client"

import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import { useSearch } from "@/hooks/use-search"
import { Loader2, Package, Search } from "lucide-react"
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export const GlobalSearch = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  
  const { products, isLoading, isSearching } = useSearch(searchQuery)

  const toggleSearch = () => setOpen((open) => !open)
  const closeSearch = () => {
    setOpen(false)
    setSearchQuery("")
  }

  // Handle keyboard shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggleSearch()
      }
      if (e.key === "Escape") {
        closeSearch()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Handle Enter key press to navigate to products page with search query
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      e.preventDefault()
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      closeSearch()
    }
  }

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }
  }, [open])

  const handleSelectProduct = (productId: string) => {
    router.push(`/products/${productId}`)
    closeSearch()
  }

  return (
    <div className="relative w-full max-w-md">
      <div 
        onClick={toggleSearch}
        className="relative flex items-center w-full rounded-md border border-input bg-background p-2 md:px-4 md:py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-text"
      >
        <Search className="h-4 w-4 md:mr-2 text-muted-foreground" />
        <span className="hidden md:block text-muted-foreground">Search products...</span>
        <kbd className="hidden md:flex pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted-foreground opacity-100 border rounded bg-muted items-center">
          ⌘K
        </kbd>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          ref={inputRef}
          placeholder="Search products..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
          onKeyDown={handleKeyDown}
          className="border-0 focus:ring-0 focus:ring-offset-0"
        />
        <CommandList className="max-h-[400px] overflow-y-auto">
          {isLoading  ? (
            <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </div>
          ) : products.length === 0 && searchQuery ? (
            <div className="py-6 text-center">
              <p className="text-sm text-muted-foreground">No products found for "{searchQuery}"</p>
              <p className="text-xs text-muted-foreground mt-2">Press Enter to see all products</p>
            </div>
          ) : (
            <CommandGroup heading="Products">
              {products.map((product) => (
                <CommandItem
                  key={product.id}
                  onSelect={() => handleSelectProduct(product.id)}
                  className="cursor-pointer gap-3"
                >
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-muted">
                    <Package className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium truncate">{product.name}</span>
                      <span className="text-sm font-medium ml-2 whitespace-nowrap">
                        ₹{product.price?.toLocaleString?.() || '0'}/{product.unit || 'unit'}
                      </span>
                    </div>
                    {product.description && (
                      <p className="text-xs text-muted-foreground truncate">
                        {typeof product.description === 'string' 
                          ? product.description 
                          : JSON.stringify(product.description)}
                      </p>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          
          {!searchQuery && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Type to search for products...
            </div>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  )
}