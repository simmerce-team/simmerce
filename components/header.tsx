import { InfoIcon, Mail, UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Images } from "@/utils/constant";
import Link from "next/link";
import { GlobalSearch } from "./global-search";
import { MegaMenu } from "./navigation/mega-menu";

// Mobile navigation links
const mobileNavigationLinks = [
  { href: "/", label: "Home", active: true },
  { href: "/categories", label: "Categories" },
];

export default function Header() {
  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/60">
      {/* Top Bar with Trust Indicators */}
      <div className="bg-slate-50/50 border-b border-slate-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-10">
            {/* Left side - Contact info */}
            <div className="hidden md:flex items-center gap-6 text-xs text-slate-600">
              {/* <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3" />
                <span>+91 1800-123-4567</span>
              </div> */}
              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3" />
                <a href="mailto:support@simmerce.com" className="text-slate-600 hover:text-red-600 transition-colors">support@simmerce.com</a>
              </div>
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-6 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <InfoIcon className="w-3 h-3 text-red-500" />
                <span>Simmerce is now in Beta 🚀</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Clean with only logo, search, and actions */}
      <header className="h-[50px] md:h-[70px] px-6 md:px-8">
        <div className="flex h-full items-center justify-between gap-6 max-w-7xl mx-auto">
          {/* Left side - Logo and Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-9 md:hidden hover:bg-slate-100"
                  variant="ghost"
                  size="icon"
                >
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-48 p-2 md:hidden border-slate-200 shadow-lg"
              >
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {mobileNavigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink
                          href={link.href}
                          className="py-2 px-3 text-sm font-medium text-slate-700 hover:text-red-600 hover:bg-red-50/50 rounded transition-colors block w-full"
                          active={link.active}
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 text-slate-800 hover:text-red-600 transition-colors group"
            >
              <img
                src={Images.logo512}
                alt="Simmerce"
                className="w-10 h-10 rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
              />
              <div className="hidden md:block">
                <span className="text-xl font-semibold tracking-tight">
                  Simmerce
                </span>
                <div className="text-xs text-slate-500 font-medium">
                  B2B Marketplace
                </div>
              </div>
            </Link>
          </div>

          {/* Middle area - Search */}
          <div className="flex-1 mx-8 hidden md:flex">
            <MegaMenu />
            <GlobalSearch />
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center gap-3">
            {/* Become Seller */}
            <a href={process.env.NEXT_PUBLIC_SELLER_URL} target="_blank">
              <Button
                variant="default"
                className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200 font-medium px-5 py-2.5 hidden sm:flex"
              >
                Become Seller
              </Button>
            </a>

            {/* Mobile Search Bar */}
            <div className="md:hidden px-6 py-1 border-b border-slate-200">
              <GlobalSearch />
            </div>

            {/* Chat */}
            {/* <Link href="/chat">
              <Button
                variant="outline"
                size="icon"
                className="size-10 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors relative"
              >
                <MessageCircle className="w-4 h-4 text-slate-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
              </Button>
            </Link> */}

            {/* User menu */}
            <Button
              variant="outline"
              size="icon"
              className="size-10 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              <UserIcon className="w-4 h-4 text-slate-600" />
            </Button>
          </div>
        </div>

      </header> 
    </div>
  );
}
