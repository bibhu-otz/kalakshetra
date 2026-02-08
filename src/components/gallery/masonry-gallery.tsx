'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import { Lightbox } from '@/components/ui/lightbox';
import { Button } from '@/components/ui/button';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide';
}

interface MasonryGalleryProps {
  images: GalleryImage[];
  categories?: { id: string; label: string }[];
  showFilter?: boolean;
  columns?: 2 | 3 | 4;
  gap?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export function MasonryGallery({
  images,
  categories = [],
  showFilter = true,
  columns = 4,
  gap = 4,
}: MasonryGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter images by category
  const filteredImages = useMemo(() => {
    if (selectedCategory === 'all') return images;
    return images.filter((img) => img.category === selectedCategory);
  }, [images, selectedCategory]);

  // Distribute images into columns for masonry effect
  const columnImages = useMemo(() => {
    const cols: GalleryImage[][] = Array.from({ length: columns }, () => []);
    filteredImages.forEach((img, index) => {
      cols[index % columns].push(img);
    });
    return cols;
  }, [filteredImages, columns]);

  const handleOpenLightbox = (imageId: string) => {
    const actualIndex = filteredImages.findIndex((img) => img.id === imageId);
    if (actualIndex !== -1) {
      setCurrentImageIndex(actualIndex);
      setLightboxOpen(true);
    }
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => Math.min(filteredImages.length - 1, prev + 1));
  };

  // Get aspect ratio class
  const getAspectClass = (aspectRatio?: string, index?: number) => {
    if (aspectRatio === 'portrait') return 'aspect-[3/4]';
    if (aspectRatio === 'landscape') return 'aspect-[4/3]';
    if (aspectRatio === 'wide') return 'aspect-[16/9]';
    
    // Create visual variety if no aspect ratio specified
    if (index !== undefined) {
      const patterns = ['aspect-square', 'aspect-[3/4]', 'aspect-square', 'aspect-[4/3]', 'aspect-square'];
      return patterns[index % patterns.length];
    }
    
    return 'aspect-square';
  };

  return (
    <>
      {/* Category Filter */}
      {showFilter && categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className={selectedCategory === 'all' ? 'bg-primary hover:bg-primary-600' : ''}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? 'bg-primary hover:bg-primary-600' : ''}
            >
              {category.label}
            </Button>
          ))}
        </div>
      )}

      {/* Masonry Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`grid gap-${gap}`}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {columnImages.map((column, colIndex) => (
          <div key={colIndex} className={`flex flex-col gap-${gap}`} style={{ gap: `${gap * 4}px` }}>
            {column.map((image, rowIndex) => {
              const globalIndex = colIndex + rowIndex * columns;
              return (
                <motion.div
                  key={image.id}
                  variants={itemVariants}
                  className="relative overflow-hidden rounded-xl group cursor-pointer"
                  onClick={() => handleOpenLightbox(image.id)}
                >
                  <div className={getAspectClass(image.aspectRatio, globalIndex)}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes={`(max-width: 768px) 50vw, ${100 / columns}vw`}
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          <ZoomIn className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      
                      {/* Image Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm font-medium truncate">{image.alt}</p>
                        {image.category && (
                          <p className="text-white/70 text-xs capitalize mt-1">{image.category}</p>
                        )}
                      </div>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-white/0 group-hover:border-white/50 transition-all duration-300 rounded-tr-lg" />
                    <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-white/0 group-hover:border-white/50 transition-all duration-300 rounded-bl-lg" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </motion.div>

      {/* Results Count */}
      <div className="text-center mt-8 text-text/60 text-sm">
        Showing {filteredImages.length} {filteredImages.length === 1 ? 'image' : 'images'}
        {selectedCategory !== 'all' && ` in "${categories.find(c => c.id === selectedCategory)?.label}"`}
      </div>

      {/* Lightbox */}
      <Lightbox
        images={filteredImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  );
}
