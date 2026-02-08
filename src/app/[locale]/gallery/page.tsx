import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PageHeader } from '@/components/common/page-header';
import { MasonryGallery } from '@/components/gallery/masonry-gallery';
import { getGalleryItems, getStrapiMediaUrl } from '@/lib/strapi';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'gallery' });

  return {
    title: `${t('title')} | Kalakshetra Odisha`,
    description: t('subtitle'),
  };
}

// Gallery categories
const categories = [
  { id: 'events', label: 'Events' },
  { id: 'village-day', label: 'Village Day' },
  { id: 'awards', label: 'Awards & Samman' },
  { id: 'workshops', label: 'Workshops' },
  { id: 'community', label: 'Community' },
];

// Generate gallery items from actual images
const generateGalleryItems = () => {
  const items = [];
  
  // Add numbered images (1.jpeg to 74.jpeg)
  for (let i = 1; i <= 74; i++) {
    const categoryIndex = (i - 1) % categories.length;
    const aspectPatterns: Array<'square' | 'portrait' | 'landscape'> = ['square', 'portrait', 'square', 'landscape', 'square'];
    
    items.push({
      id: `img-${i}`,
      src: `/images/${i}.jpeg`,
      alt: `Kalakshetra Odisha - Cultural Heritage ${i}`,
      category: categories[categoryIndex].id,
      aspectRatio: aspectPatterns[i % aspectPatterns.length],
    });
  }
  
  return items;
};

const fallbackGalleryItems = generateGalleryItems();

interface StrapiGalleryItem {
  id: number;
  attributes: {
    title: string;
    category: string;
    image: {
      data: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      } | null;
    };
  };
}

interface StrapiResponse {
  data: StrapiGalleryItem[];
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'gallery' });

  // Try to fetch from Strapi, fall back to local images
  let galleryItems = fallbackGalleryItems;
  
  try {
    const response = await getGalleryItems(locale) as StrapiResponse;
    if (response?.data?.length > 0) {
      const aspectPatterns: Array<'square' | 'portrait' | 'landscape'> = ['square', 'portrait', 'square', 'landscape', 'square'];
      galleryItems = response.data.map((item, index) => ({
        id: `strapi-${item.id}`,
        src: item.attributes.image?.data?.attributes?.url
          ? getStrapiMediaUrl(item.attributes.image.data.attributes.url)
          : `/images/${(index % 74) + 1}.jpeg`,
        alt: item.attributes.title || `Gallery image ${index + 1}`,
        category: item.attributes.category || categories[index % categories.length].id,
        aspectRatio: aspectPatterns[index % aspectPatterns.length],
      }));
    }
  } catch {
    console.log('Using fallback gallery data');
  }

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      <section className="section-padding bg-gradient-to-b from-white to-muted-50">
        <div className="container mx-auto px-4">
          <MasonryGallery
            images={galleryItems}
            categories={categories}
            showFilter={true}
            columns={4}
            gap={4}
          />
        </div>
      </section>

      {/* Gallery CTA */}
      <section className="section-padding bg-deep text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t('ctaTitle') || 'Share Your Moments'}
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            {t('ctaDescription') || 'Have photos from our events? We\'d love to feature them in our gallery.'}
          </p>
        </div>
      </section>
    </>
  );
}
