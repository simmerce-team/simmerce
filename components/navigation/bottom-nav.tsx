import { cn } from "@/lib/utils";
import { Home, Search, User } from "lucide-react";
import Link from "next/link";

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

export function BottomNav() {
  const navItems: NavItem[] = [
    {
      name: "Home",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Search",
      href: "/search",
      icon: <Search className="h-5 w-5" />,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: <User className="h-5 w-5" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-md md:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900",
              "transition-colors duration-200"
            )}
          >
            {item.icon}
            <span className="mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
