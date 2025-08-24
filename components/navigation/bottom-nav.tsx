"use client";

import { cn } from "@/lib/utils";
import { Home, MessageCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  matchExact?: boolean;
};

export function BottomNav() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      name: "Home",
      href: "/",
      icon: <Home className="h-5 w-5" />,
      activeIcon: <Home className="h-5 w-5 fill-current" />,
      matchExact: true,
    },
    {
      name: "Messages",
      href: "/enquiries",
      icon: <MessageCircle className="h-5 w-5" />,
      activeIcon: <MessageCircle className="h-5 w-5 fill-current" />,
    },
    {
      name: "Account",
      href: "/profile",
      icon: <User className="h-5 w-5" />,
      activeIcon: <User className="h-5 w-5 fill-current" />,
    },
  ];

  const isActive = (item: NavItem) => {
    if (item.matchExact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-md shadow-lg md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex flex-1 flex-col items-center justify-center py-2 text-xs font-medium transition-colors duration-200",
                active ? "text-primary" : "text-gray-600 hover:text-gray-900"
              )}
            >
              <div className="relative">
                {active && item.activeIcon ? item.activeIcon : item.icon}
              </div>
              <span className="mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
