"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function ReferrerCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Skip check if we have a valid redirectedFrom param or if we're on the main auth page
    if (searchParams.get('redirectedFrom')) {
      return;
    }

    // Check if we came from the auth page
    const referrer = document.referrer;
    const isFromAuthPage = referrer.includes('/auth') && !referrer.includes('/auth/login') && !referrer.includes('/auth/signup');
    
    // If not from auth page and not already on auth page, redirect to auth page
    if (!isFromAuthPage && pathname !== '/auth') {
      router.replace('/auth');
    }
  }, [pathname, searchParams, router]);

  return <>{children}</>;
}
