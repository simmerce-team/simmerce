import { Button } from "@/components/ui/button";
import { Images } from "@/utils/constant";
import { MessageCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GlobalSearch } from "../global-search";
import MegaMenu from "../navigation/mega-menu-server";
import NavUser from "../navigation/nav-user";

export function DesktopHeader() {
  return (
    <header className="hidden md:block sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/60 h-[60px] md:h-[70px] px-4 md:px-8">
    {/* Desktop Header - Shown on medium screens and up */}
    <div className="flex h-full items-center justify-between gap-6 max-w-7xl mx-auto w-full">
      {/* Left side - Logo */}
      <div
        className="flex items-center gap-4
      "
      >
        <Link href="/" className="flex items-center gap-3 text-slate-800">
          <Image
            src={Images.logo}
            alt="Simmerce"
            width={40}
            height={40}
            className="w-10 h-10 bg-slate-800 rounded-lg shadow-sm"
          />
          <div>
            <span className="text-lg font-semibold tracking-tight">
              Simmerce
            </span>
            <p className="text-xs text-muted-foreground">B2B Marketplace</p>
          </div>
        </Link>
      </div>

      {/* Middle area - Search */}
      <div className="flex flex-1 items-center gap-4 mx-8">
        <MegaMenu />
        <GlobalSearch />
      </div>

      {/* Right side - Action buttons */}
      <div className="flex items-center gap-3">
        <Link href="/enquiries">
          <Button variant="outline" size="icon">
            <MessageCircleIcon />
          </Button>
        </Link>
        <a
          href={process.env.NEXT_PUBLIC_SELLER_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="default"
            className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200 font-medium px-5 py-2.5"
          >
            Become Seller
          </Button>
        </a>
        <NavUser />
      </div>
    </div>
    </header>
  );
}
