'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';

// Gallery images from actual event photos
const galleryImages = [
  {
    id: '1',
    src: '/images/Launching of Kalakshetra-2021/IMG_9933.JPG',
    alt: 'Launching of Kalakshetra 2021',
    span: 'col-span-2 row-span-2',
  },
  {
    id: '2',
    src: '/images/Viilage Day Observed- 21 to 23 Oct 2025/IMG-20251031-WA0092.jpg',
    alt: 'Village Day Celebration',
    span: 'col-span-1 row-span-1',
  },
  {
    id: '3',
    src: '/images/Village Day Samman Baragarh-2025/20251109_145135.jpg',
    alt: 'Village Day Samman Baragarh',
    span: 'col-span-1 row-span-1',
  },
  {
    id: '4',
    src: '/images/Photo Phiringia VD Samman-25/IMG-20251213-WA0191.jpg',
    alt: 'Phiringia VD Samman',
    span: 'col-span-1 row-span-2',
  },
  {
    id: '5',
    src: '/images/Photo with Kandhamal/20250903_170113.jpg',
    alt: 'Cultural event in Kandhamal',
    span: 'col-span-1 row-span-1',
  },
  {
    id: '6',
    src: '/images/Launching of Kalakshetra-2021/IMG_9876.JPG',
    alt: 'Traditional performance',
    span: 'col-span-1 row-span-1',
  },
];

export function GalleryPreview() {
  const t = useTranslations('home.gallery');

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('title')}
            </motion.h2>
            <motion.p
              className="section-subtitle text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t('subtitle')}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button variant="outline" asChild>
              <Link href="/gallery">
                {t('viewAll')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${image.span}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-deep/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium px-4 text-center">
                  {image.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
