'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import { cn } from '@/lib/utils';
import { playStoreUrl } from '@/utils/constant';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export function MobileAppPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(isMobile && !localStorage?.getItem('mobileAppPromptDismissed'));
    }, 3000);
    return () => clearTimeout(timer);
  }, [isMobile]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('mobileAppPromptDismissed', 'true');
  };

  if (!isMobile || !isVisible) return null;

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 bg-accent-foreground text-primary-foreground p-4 shadow-lg transition-transform duration-300',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="container mx-auto">
        <div>
          <h3 className="font-bold">Better experience on our app!</h3>
          <p className="text-xs">Download our app for a smoother experience.</p>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <Button
            variant="default"
            size="sm"
            asChild
          >
            <a href={playStoreUrl}>Download App</a>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDismiss}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
