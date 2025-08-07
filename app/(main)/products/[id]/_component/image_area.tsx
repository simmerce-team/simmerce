'use client';

import { Product } from "@/actions/product";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Images } from "@/utils/constant";
import Image from "next/image";
import { useState } from "react";

const getYoutubeEmbedUrl = (url: string | null): string | null => {
  if (!url) return null;
  
  // Handle youtu.be short URLs and regular YouTube URLs
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = (match && match[2].length === 11) ? match[2] : null;
  
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
};

export const ImageArea = ({ product }: { product: Product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showYoutubeDialog, setShowYoutubeDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  
  const images = product?.files?.filter((img) => img.file_type === "image") || [];
  const pdf = product?.files?.filter((img) => img.file_type === "pdf") || [];
  const primaryImageIndex = images.findIndex(img => img.is_primary) || 0;
  const [mainImageIndex, setMainImageIndex] = useState(primaryImageIndex >= 0 ? primaryImageIndex : 0);
  
  const youtubeUrl = product?.youtube_url;
  const embedUrl = getYoutubeEmbedUrl(youtubeUrl);
  const videoId = embedUrl?.match(/embed\/([^?]+)/)?.[1];
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    setMainImageIndex(index);
  };

  const handleNextImage = () => {
    const nextIndex = (selectedImageIndex + 1) % images.length;
    setSelectedImageIndex(nextIndex);
  };

  const handlePrevImage = () => {
    const prevIndex = (selectedImageIndex - 1 + images.length) % images.length;
    setSelectedImageIndex(prevIndex);
  };

  const currentImage = images[selectedImageIndex] || images[0];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Main Image */}
      <div 
        className="aspect-square relative bg-gradient-to-br from-slate-50/50 to-slate-100/30 cursor-zoom-in"
        onClick={() => images.length > 0 && setShowImageDialog(true)}
      >
        <Image
          src={currentImage?.url || Images.placeholder}
          alt={product?.name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
          priority
        />
      </div>

      {/* Thumbnail Gallery */}
      {(images.length > 1 || pdf.length > 0 || thumbnailUrl) && (
        <div className="m-5 grid grid-cols-4 gap-3">
          {images.map((img, index) => (
            <div
              key={index}
              className={`aspect-square border rounded-lg overflow-hidden cursor-pointer transition-colors ${
                index === selectedImageIndex 
                  ? 'border-primary ring-2 ring-primary' 
                  : 'border-slate-200 hover:border-primary'
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <Image
                src={img?.url || Images.placeholder}
                alt={`${product?.name} ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {pdf.map((file, index) => (
            <a
              key={`pdf-${index}`}
              href={file?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square bg-slate-50 border border-slate-200 rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors flex items-center justify-center"
            >
              <div className="text-center p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-xs mt-1 block">PDF</span>
              </div>
            </a>
          ))}

          {thumbnailUrl && (
            <div 
              className="aspect-square bg-slate-50 border border-slate-200 rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors relative group"
              onClick={() => setShowYoutubeDialog(true)}
            >
              <img
                src={thumbnailUrl}
                alt="YouTube video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* YouTube Dialog */}
      <Dialog open={showYoutubeDialog} onOpenChange={setShowYoutubeDialog}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
          <div className="relative w-full aspect-video">
            <button 
              onClick={() => setShowYoutubeDialog(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 z-10"
              aria-label="Close video"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src={embedUrl || ''}
              className="w-full h-full rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
          <div className="relative w-full h-[80vh] bg-black rounded-lg">
            <button 
              onClick={() => setShowImageDialog(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 z-10"
              aria-label="Close image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {images.length > 1 && (
              <>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 z-10"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 z-10"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            <div className="w-full h-full flex items-center justify-center p-4">
              <Image
                src={currentImage?.url || Images.placeholder}
                alt={`${product?.name} (${selectedImageIndex + 1} of ${images.length})`}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain"
                priority
              />
            </div>
            
            {images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === selectedImageIndex 
                        ? 'bg-white' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex(index);
                    }}
                    aria-label={`View image ${index + 1} of ${images.length}`}
                  />
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
