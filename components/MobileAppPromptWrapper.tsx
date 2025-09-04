'use client';

import dynamic from 'next/dynamic';

// Dynamically import MobileAppPrompt with no SSR
const MobileAppPrompt = dynamic(
  () => import('@/components/MobileAppPrompt').then((mod) => mod.MobileAppPrompt),
  { ssr: false }
);

export function MobileAppPromptWrapper() {
  return <MobileAppPrompt />;
}
