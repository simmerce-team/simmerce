"use client";

import { Images } from "@/utils/constant";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

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
  const router = useRouter();

  return (
    <header className="md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/60 h-[56px] px-4">
      <div className="flex h-full items-center justify-between w-full">
        {/* Leading area: back button > custom leading > default logo */}
        <div className="flex min-w-0 items-center gap-2">
          {isBack ? (
            <button
              type="button"
              aria-label="Go back"
              onClick={() => router.back()}
              className="-ml-2 inline-flex items-center justify-center rounded-md p-2 hover:bg-slate-100 active:opacity-80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
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
