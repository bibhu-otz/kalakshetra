import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { HeroSection } from '@/components/sections/hero-section';
import { MissionSection } from '@/components/sections/mission-section';
import { ObjectivesSection } from '@/components/sections/objectives-section';
import { StatsSection } from '@/components/sections/stats-section';
import { ProgramsSection } from '@/components/sections/programs-section';
import { LeadershipSection } from '@/components/sections/leadership-section';
import { GalleryPreview } from '@/components/sections/gallery-preview';
import { PressSection } from '@/components/sections/press-section';
import { CTASection } from '@/components/sections/cta-section';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kalakshetraodisha.com';

  return {
    metadataBase: new URL(baseUrl),
    title: t('title'),
    description: t('description'),
    keywords: ['Kalakshetra Odisha', 'Odisha Culture', 'Folk Arts', 'Village Day', 'Cultural Heritage', 'Odissi', 'Traditional Arts', 'Mo Biswa', 'Gaan Mo Maa'],
    authors: [{ name: 'Kalakshetra Odisha' }],
    creator: 'Kalakshetra Odisha',
    publisher: 'Kalakshetra Odisha',
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'or': `${baseUrl}/or`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: `${baseUrl}/${locale}`,
      siteName: 'Kalakshetra Odisha',
      locale: locale === 'or' ? 'or_IN' : 'en_IN',
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Kalakshetra Odisha - Preserving Cultural Heritage',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/images/og-image.jpg'],
      creator: '@kalakshetraod',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <MissionSection />
      <ObjectivesSection />
      <StatsSection />
      <ProgramsSection />
      <LeadershipSection />
      <GalleryPreview />
      <PressSection />
      <CTASection />
    </>
  );
}
