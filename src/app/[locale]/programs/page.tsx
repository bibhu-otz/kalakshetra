import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Users, BookOpen, Award, ArrowRight, Calendar, Target } from 'lucide-react';

import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getPrograms, getStrapiMediaUrl } from '@/lib/strapi';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'programs' });

  return {
    title: `${t('title')} | Kalakshetra Odisha`,
    description: t('subtitle'),
  };
}

// Icon mapping for Strapi icon field
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'map-pin': MapPin,
  'users': Users,
  'book-open': BookOpen,
  'award': Award,
  'calendar': Calendar,
  'target': Target,
};

// Fallback programs when Strapi is not available
const fallbackPrograms = [
  {
    id: 1,
    attributes: {
      title: 'Village Day Celebration',
      slug: 'village-day',
      shortDescription: 'Annual celebration honoring rural traditions and folk arts across Odisha\'s villages.',
      description: '<p>The Village Day celebration is our flagship program that brings together rural communities to celebrate their unique cultural heritage. Through folk performances, traditional crafts exhibitions, and cultural exchanges, we preserve the living traditions of Odisha\'s diverse villages.</p>',
      icon: 'map-pin',
      image: { data: { attributes: { url: '/images/Viilage Day Observed- 21 to 23 Oct 2025/IMG-20251031-WA0092.jpg' } } },
    },
  },
  {
    id: 2,
    attributes: {
      title: 'Art Workshops',
      slug: 'art-workshops',
      shortDescription: 'Training programs for traditional crafts, painting, and performing arts.',
      description: '<p>Our workshops provide hands-on training in traditional Odia art forms including Pattachitra, palm leaf engraving, stone carving, and classical dance. Led by master artisans, these programs ensure the transmission of skills to new generations.</p>',
      icon: 'users',
      image: { data: { attributes: { url: '/images/Launching of Kalakshetra-2021/IMG_9876.JPG' } } },
    },
  },
  {
    id: 3,
    attributes: {
      title: 'Cultural Documentation',
      slug: 'cultural-documentation',
      shortDescription: 'Recording and archiving oral traditions, folk songs, and traditional knowledge.',
      description: '<p>We systematically document the intangible cultural heritage of Odisha through audio-visual recordings, written archives, and digital preservation. This includes folk songs, oral histories, traditional recipes, and indigenous knowledge systems.</p>',
      icon: 'book-open',
      image: { data: { attributes: { url: '/images/Paper Clips All Kalaskhetra/IMG-20251113-WA0053.jpg' } } },
    },
  },
  {
    id: 4,
    attributes: {
      title: 'Artist Scholarships',
      slug: 'artist-scholarships',
      shortDescription: 'Financial support for young artists pursuing traditional art forms.',
      description: '<p>Our scholarship program provides financial assistance to talented young artists who wish to dedicate themselves to traditional art forms. This includes stipends for training, materials support, and mentorship opportunities with master artists.</p>',
      icon: 'award',
      image: { data: { attributes: { url: '/images/Village Day Samman Baragarh-2025/20251109_145135.jpg' } } },
    },
  },
];

interface StrapiProgram {
  id: number;
  attributes: {
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    icon: string;
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
  data: StrapiProgram[];
}

export default async function ProgramsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'programs' });

  // Fetch programs from Strapi with fallback
  let programs: StrapiProgram[] = fallbackPrograms;
  try {
    const response = await getPrograms(locale) as StrapiResponse;
    if (response?.data?.length > 0) {
      programs = response.data;
    }
  } catch {
    console.log('Using fallback programs data');
  }

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      {/* Programs Grid */}
      <section className="section-padding bg-gradient-to-b from-white to-muted-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => {
              const IconComponent = iconMap[program.attributes.icon] || Target;
              const imageUrl = program.attributes.image?.data?.attributes?.url
                ? getStrapiMediaUrl(program.attributes.image.data.attributes.url)
                : `/images/${(index % 10) + 1}.jpeg`;

              return (
                <Link
                  key={program.id}
                  href={`/${locale}/programs/${program.attributes.slug}`}
                  className="group"
                >
                  <Card className="h-full overflow-hidden border-0 shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={program.attributes.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-display font-bold text-deep mb-3 group-hover:text-primary transition-colors">
                        {program.attributes.title}
                      </h3>
                      <p className="text-text/70 leading-relaxed mb-4 line-clamp-3">
                        {program.attributes.shortDescription}
                      </p>
                      <div className="flex items-center text-primary font-medium">
                        <span>{t('learnMore')}</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-deep text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            {t('ctaDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-primary hover:bg-primary-600">
              <Link href={`/${locale}/contact`}>{t('volunteer')}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white hover:text-deep">
              <Link href={`/${locale}/contact`}>{t('donate')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
