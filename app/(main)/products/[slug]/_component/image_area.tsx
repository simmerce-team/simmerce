'use client';

import { Product } from "@/actions/product";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Images } from "@/utils/constant";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

interface YouTubeThumbnailProps {
  videoId: string;
  onClick: () => void;
}

const YouTubeThumbnail = ({ videoId, onClick }: YouTubeThumbnailProps) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  
  return (
    <div 
      className="aspect-square bg-slate-50 border border-slate-200 rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors relative group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label="Play video"
    >
      <Image
        src={thumbnailUrl}
        alt="YouTube video thumbnail"
        width={80}
        height={80}
        className="w-full h-full object-cover"
        loading="lazy"
        unoptimized
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
          <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const getYoutubeEmbedUrl = (url: string | null): string | null => {
  if (!url) return null;
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = (match && match[2].length === 11) ? match[2] : null;
  
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
};

export const ImageArea = ({ product }: { product: Product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showYoutubeDialog, setShowYoutubeDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Memoize filtered files to prevent unnecessary recalculations
  const { images, pdfs } = useMemo(() => ({
    images: product?.files?.filter((img) => img.file_type === "image") || [],
    pdfs: product?.files?.filter((img) => img.file_type === "pdf") || []
  }), [product?.files]);
  
  const youtubeUrl = product?.youtube_url;
  const embedUrl = useMemo(() => getYoutubeEmbedUrl(youtubeUrl), [youtubeUrl]);
  const videoId = useMemo(() => embedUrl?.match(/embed\/([^?]+)/)?.[1], [embedUrl]);
  
  const currentImage = useMemo(() => 
    images[selectedImageIndex] || images[0], 
  [images, selectedImageIndex]);

  const handleThumbnailClick = useCallback((index: number) => {
    setSelectedImageIndex(index);
    setIsLoading(true);
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Reset loading state when image changes
  useEffect(() => {
    setIsLoading(true);
  }, [currentImage]);

  if (!product) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Main Image */}
      <div className="aspect-square relative bg-gradient-to-br from-slate-50/50 to-slate-100/30">
        <div className={`absolute inset-0 flex items-center justify-center ${isLoading ? 'block' : 'hidden'}`}>
          <div className="animate-pulse bg-slate-200 w-full h-full" />
        </div>
        <Image
          src={currentImage?.url || Images.placeholder}
          alt={product?.name || 'Product image'}
          fill
          className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={selectedImageIndex === 0}
          onLoad={handleImageLoad}
          onError={() => setIsLoading(false)}
        />
      </div>

      {/* Thumbnail Gallery */}
      {(images.length > 1 || pdfs.length > 0 || videoId) && (
        <div className="m-5 grid grid-cols-4 gap-3" role="list" aria-label="Product thumbnails">
          {images.map((img, index) => (
            <div
              key={img.id || index}
              className={`aspect-square border rounded-lg overflow-hidden cursor-pointer transition-colors ${
                index === selectedImageIndex 
                  ? 'border-primary ring-2 ring-primary' 
                  : 'border-slate-200 hover:border-primary'
              }`}
              onClick={() => handleThumbnailClick(index)}
              onKeyDown={(e) => e.key === 'Enter' && handleThumbnailClick(index)}
              role="listitem"
              tabIndex={0}
              aria-label={`View image ${index + 1} of ${images.length}`}
              aria-current={index === selectedImageIndex ? 'true' : 'false'}
            >
              <Image
                src={img?.url || Images.placeholder}
                alt={`${product?.name} ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
                loading="lazy"
                sizes="80px"
              />
            </div>
          ))}

          {pdfs.map((file) => (
            <a
              key={`pdf-${file.id}`}
              href={file?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square bg-slate-50 border border-slate-200 rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors flex items-center justify-center"
              aria-label="Open PDF document"
            >
              <div className="text-center p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-xs mt-1 block">PDF</span>
              </div>
            </a>
          ))}

          {videoId && (
            <YouTubeThumbnail 
              videoId={videoId} 
              onClick={() => setShowYoutubeDialog(true)} 
            />
          )}
        </div>
      )}

      {/* YouTube Dialog */}
      <Dialog open={showYoutubeDialog} onOpenChange={setShowYoutubeDialog}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
          <div className="relative w-full aspect-video">
            <button 
              onClick={() => setShowYoutubeDialog(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 z-10 focus:outline-none focus:ring-2 focus:ring-white rounded"
              aria-label="Close video"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {embedUrl && (
              <iframe
                src={embedUrl}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${product.name} video`}
                loading="lazy"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
