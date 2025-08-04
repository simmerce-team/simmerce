"use client"

import Link from "next/link";

export function SectionHeader({ title, linkText, linkHref }: { title: string; linkText: string; linkHref: string }) {
    return (
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg md:text-2xl font-medium text-slate-800">{title}</h2>
        <Link href={linkHref} className="text-slate-500 hover:text-primary text-sm font-medium transition-colors">
          {linkText}
        </Link>
      </div>
    );
}
  