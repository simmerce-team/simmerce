import { Images } from "@/utils/constant";
import Link from "next/link";
import type { ReactNode } from "react";
import { BackButton } from "../back_button";

type MobileHeaderProps = {
  isBack?: boolean;
  isLogo?: boolean;
  leading?: ReactNode;
  title?: string | ReactNode;
  trailing?: ReactNode;
};

export function MobileHeader({
  isBack = false,
  isLogo = false,
  leading,
  title,
  trailing,
}: MobileHeaderProps) {
  return (
    <header className="md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/60 h-[56px] px-4">
      <div className="flex h-full items-center justify-between w-full">
        {/* Leading area: back button > custom leading > default logo */}
        <div className="flex min-w-0 items-center gap-2">
          {isBack ? (
            <BackButton />
          ) : leading ? (
            <>{leading}</>
          ) : isLogo ? (
            <Link href="/" className="flex items-center gap-2">
              <img
                src={Images.logo}
                alt="Simmerce"
                className="h-8 w-8 rounded-lg bg-slate-800"
              />
            </Link>
          ) : null}

          {/* Title */}
          {title ? (
            <div className="ml-2 truncate text-base font-semibold text-slate-900">
              {title}
            </div>
          ) : null}
        </div>

        {/* Trailing actions */}
        <div className="flex items-center gap-1">{trailing}</div>
      </div>
    </header>
  );
}
