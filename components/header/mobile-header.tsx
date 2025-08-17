import { Images } from "@/utils/constant";
import Link from "next/link";

export function MobileHeader() {
  return (
    <div className="flex md:hidden h-full items-center justify-between w-full px-4">
      {/* Left side - Logo */}
      <Link href="/" className="flex items-center gap-2">
        <img
          src={Images.logo}
          alt="Simmerce"
          className="w-8 h-8 bg-slate-800 rounded-lg"
        />
        <span className="text-lg font-semibold">Simmerce</span>
      </Link>
    </div>
  );
}
