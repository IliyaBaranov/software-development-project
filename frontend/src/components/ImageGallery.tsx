import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const showPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-2 rounded-xl overflow-hidden">
        {/* Main Image */}
        <div
          className="col-span-4 md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto relative cursor-pointer group"
          onClick={() => setIsFullscreen(true)}
        >
          <img
            src={images[0]}
            alt="Main view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
        </div>

        {/* Thumbnails */}
        {images.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className="hidden md:block aspect-[4/3] relative cursor-pointer group"
            onClick={() => {
              setSelectedIndex(index + 1);
              setIsFullscreen(true);
            }}
          >
            <img
              src={image}
              alt={`View ${index + 2}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                <span className="text-background font-semibold">
                  +{images.length - 5} more
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-background/10 rounded-full flex items-center justify-center text-background hover:bg-background/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={showPrevious}
            className="absolute left-4 w-10 h-10 bg-background/10 rounded-full flex items-center justify-center text-background hover:bg-background/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <img
            src={images[selectedIndex]}
            alt={`View ${selectedIndex + 1}`}
            className="max-w-full max-h-[90vh] object-contain"
          />

          <button
            onClick={showNext}
            className="absolute right-4 w-10 h-10 bg-background/10 rounded-full flex items-center justify-center text-background hover:bg-background/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === selectedIndex ? "bg-background" : "bg-background/40"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
