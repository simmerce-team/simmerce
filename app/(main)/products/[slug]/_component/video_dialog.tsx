"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function VideoDialog({
  open,
  onOpenChange,
  embedUrl,
  title,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  embedUrl: string;
  title: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
        <div className="relative w-full aspect-video">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute -top-10 right-0 text-white hover:text-gray-300 z-10 focus:outline-none focus:ring-2 focus:ring-white rounded"
            aria-label="Close video"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <iframe
            src={embedUrl}
            className="w-full h-full rounded-lg"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
            loading="lazy"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
