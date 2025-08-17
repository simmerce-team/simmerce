import { Button } from "@/components/ui/button";
import { Images } from "@/utils/constant";
import Link from "next/link";
import { GlobalSearch } from "../global-search";
import NavUser from "../navigation/nav-user";

export function DesktopHeader() {
  return (
    <div className="hidden md:flex h-full items-center justify-between gap-6 max-w-7xl mx-auto w-full">
      {/* Left side - Logo */}
      <div className="flex items-center gap-4
      ">
        <Link href="/" className="flex items-center gap-3 text-slate-800">
          <img
            src={Images.logo}
            alt="Simmerce"
            className="w-10 h-10 bg-slate-800 rounded-lg shadow-sm"
          />
          <div>
            <span className="text-lg font-semibold tracking-tight">Simmerce</span>
            <p className="text-xs text-muted-foreground">B2B Marketplace</p>
          </div>
        </Link>
      </div>

      {/* Middle area - Search */}
      <div className="flex-1 mx-8">
        <GlobalSearch />
      </div>

      {/* Right side - Action buttons */}
      <div className="flex items-center gap-3">
        <a href={process.env.NEXT_PUBLIC_SELLER_URL} target="_blank" rel="noopener noreferrer">
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
  );
}
