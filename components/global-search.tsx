"use client"

import { Badge } from "@/components/ui/badge"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { MapPin, Package, Search, TrendingUp } from "lucide-react"
import { useEffect, useRef, useState } from 'react'

interface SearchCategory {
  name: string
  items: {
    id: number
    name: string
    href: string
    type?: 'product' | 'supplier' | 'category'
    location?: string
    verified?: boolean
  }[]
}

const categories: any[] = [
  {
    id: 1,
    name: "Industrial Motors",
    href: "/products/industrial-motors",
    type: 'product',
    location: "Mumbai"
  },
  {
    id: 2,
    name: "LED Light Panels",
    href: "/products/led-lights",
    type: 'product',
    location: "Delhi"
  },
  {
    id: 3,
    name: "Cotton Fabric Rolls",
    href: "/products/cotton-fabric",
    type: 'product',
    location: "Ahmedabad"
  },
  {
    id: 4,
    name: "Steel Pipes",
    href: "/products/steel-pipes",
    type: 'product',
    location: "Chennai"
  },
  {
    id: 5,
    name: "PLC Controllers",
    href: "/products/plc-controllers",
    type: 'product',
    location: "Bangalore"
  },
];

const cities: any[] = [
  {
    id: 1,
    name: "Mumbai",
    href: "/cities/mumbai",
    type: 'city'
  },
  {
    id: 2,
    name: "Delhi",
    href: "/cities/delhi",
    type: 'city'
  },
  {
    id: 3,
    name: "Ahmedabad",
    href: "/cities/ahmedabad",
    type: 'city'
  },
  {
    id: 4,
    name: "Chennai",
    href: "/cities/chennai",
    type: 'city'
  },
  {
    id: 5,
    name: "Bangalore",
    href: "/cities/bangalore",
    type: 'city'
  },
];

const popularSearches: any[] = [
  "Industrial Motors",
  "LED Light Panels",
  "Cotton Fabric Rolls",
  "Steel Pipes",
  "PLC Controllers",
];

// Enhanced search categories with more B2B-focused content
const searchCategories: SearchCategory[] = [
  // {
  //   name: "Products",
  //   items: [
  //     { id: 1, name: "Industrial Motors", href: "/products/industrial-motors", type: 'product', location: "Mumbai" },
  //     { id: 2, name: "LED Light Panels", href: "/products/led-lights", type: 'product', location: "Delhi" },
  //     { id: 3, name: "Cotton Fabric Rolls", href: "/products/cotton-fabric", type: 'product', location: "Ahmedabad" },
  //     { id: 4, name: "Steel Pipes", href: "/products/steel-pipes", type: 'product', location: "Chennai" },
  //     { id: 5, name: "PLC Controllers", href: "/products/plc-controllers", type: 'product', location: "Bangalore" },
  //   ],
  // },
  // {
  //   name: "Verified Suppliers",
  //   items: [
  //     { id: 6, name: "Techtronix India", href: "/suppliers/techtronix-india", type: 'supplier', location: "Mumbai", verified: true },
  //     { id: 7, name: "Textile World", href: "/suppliers/textile-world", type: 'supplier', location: "Ahmedabad", verified: true },
  //     { id: 8, name: "Machino Works", href: "/suppliers/machino-works", type: 'supplier', location: "Chennai", verified: true },
  //     { id: 9, name: "ChemPro Solutions", href: "/suppliers/chempro-solutions", type: 'supplier', location: "Pune", verified: true },
  //   ],
  // },
  {
    name: "Categories",
    items: categories.map(cat => ({
      id: parseInt(cat.id) + 100,
      name: cat.name,
      href: `/categories/${cat.slug}`,
      type: 'category' as const
    }))
  },
  {
    name: "Cities",
    items: cities.slice(0, 6).map(city => ({
      id: parseInt(city.id) + 200,
      name: city.name,
      href: `/cities/${city.slug}`,
      type: 'category' as const,
      location: city.name
    }))
  }
]

export const GlobalSearch = () => {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  

  const toggleSearch = () => setOpen((open) => !open)
  const closeSearch = () => setOpen(false)

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

  // Filter search results
  const filteredResults = searchCategories.map((category) => ({
    ...category,
    items: category.items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }))

  const getItemIcon = (type?: string) => {
    switch (type) {
      case 'product':
        return <Package className="h-4 w-4 text-blue-600" />
      case 'supplier':
        return <div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-emerald-600 rounded-full" />
        </div>
      case 'category':
        return <Search className="h-4 w-4 text-slate-500" />
      default:
        return <Search className="h-4 w-4 text-slate-500" />
    }
  }

  return (
    <div className="relative w-full">
      <div 
        onClick={toggleSearch}
        className="relative mx-auto w-full cursor-pointer"
      >
        <Input
          ref={inputRef}
          readOnly
          className="hidden md:block h-11 pl-10 pr-20 cursor-pointer bg-slate-50/50 border-slate-200 hover:border-slate-300 hover:bg-white transition-all duration-200 focus:bg-white"
          placeholder="Search products, suppliers, categories..."
          type="search"
        />
        <div className="text-slate-500 absolute left-3 top-1/2 -translate-y-1/2">
          <Search className="h-4 w-4" />
        </div>
        <div className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-2">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-slate-100 px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>

      <CommandDialog 
        open={open} 
        onOpenChange={setOpen}
        className="max-w-3xl"
      >
        <CommandInput 
          placeholder="Search products, suppliers, categories..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          className="h-12"
        />
        <CommandList className="max-h-[500px]">
          <CommandEmpty>
            <div className="text-center py-6">
              <Search className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600">No results found for "{searchQuery}"</p>
              <p className="text-sm text-slate-500 mt-1">Try searching for products, suppliers, or categories</p>
            </div>
          </CommandEmpty>
          
          {!searchQuery && (
            <CommandGroup heading="Popular Searches">
              {popularSearches.slice(0, 4).map((search, index) => (
                <CommandItem
                  key={index}
                  value={search}
                  onSelect={() => {
                    window.location.href = `/search?q=${encodeURIComponent(search)}`
                    closeSearch()
                  }}
                  className="flex items-center gap-3 py-3"
                >
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                  <span>{search}</span>
                  <Badge variant="outline" className="ml-auto text-xs">Popular</Badge>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {filteredResults.map((category) => (
            category.items.length > 0 && (
              <CommandGroup key={category.name} heading={category.name}>
                {category.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${category.name} ${item.name}`}
                    onSelect={() => {
                      window.location.href = item.href
                      closeSearch()
                    }}
                    className="flex items-center gap-3 py-3"
                  >
                    {getItemIcon(item.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.verified && (
                          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      {item.location && (
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </div>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )
          ))}

          {searchQuery && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Search Actions">
                <CommandItem
                  onSelect={() => {
                    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
                    closeSearch()
                  }}
                  className="flex items-center gap-3 py-3"
                >
                  <Search className="h-4 w-4 text-red-600" />
                  <span>Search for "<strong>{searchQuery}</strong>"</span>
                </CommandItem>
                
                <CommandItem
                  onSelect={() => {
                    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}&type=suppliers`
                    closeSearch()
                  }}
                  className="flex items-center gap-3 py-3"
                >
                  <div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                  </div>
                  <span>Find suppliers for "<strong>{searchQuery}</strong>"</span>
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  )
}