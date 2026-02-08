import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Users, BookOpen, Award, Calendar, Target, CheckCircle, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProgramBySlug, getPrograms, getStrapiMediaUrl } from '@/lib/strapi';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'map-pin': MapPin,
  'users': Users,
  'book-open': BookOpen,
  'award': Award,
  'calendar': Calendar,
  'target': Target,
};

// Fallback programs data
const fallbackPrograms: Record<string, {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  highlights: string[];
  impact: { number: string; label: string }[];
}> = {
  'village-day': {
    title: 'Village Day Celebration',
    slug: 'village-day',
    shortDescription: 'Annual celebration honoring rural traditions and folk arts across Odisha\'s villages.',
    description: `<p>The Village Day celebration is our flagship program that brings together rural communities to celebrate their unique cultural heritage. Through folk performances, traditional crafts exhibitions, and cultural exchanges, we preserve the living traditions of Odisha's diverse villages.</p>
    <p>Each year, we organize celebrations in multiple districts, featuring local artists, traditional food festivals, and community gatherings. The program aims to instill pride in rural heritage while creating economic opportunities for village artisans.</p>
    <p>Our celebrations include:</p>
    <ul>
      <li>Traditional folk dance performances</li>
      <li>Handloom and handicraft exhibitions</li>
      <li>Indigenous food festivals</li>
      <li>Cultural seminars and discussions</li>
      <li>Recognition ceremonies for village elders</li>
    </ul>`,
    icon: 'map-pin',
    image: '/images/Viilage Day Observed- 21 to 23 Oct 2025/IMG-20251031-WA0092.jpg',
    highlights: [
      'Annual celebrations across 50+ villages',
      'Platform for 200+ folk artists yearly',
      'Preservation of indigenous traditions',
      'Economic support for rural artisans',
    ],
    impact: [
      { number: '50+', label: 'Villages Reached' },
      { number: '200+', label: 'Artists Featured' },
      { number: '10K+', label: 'Participants Yearly' },
    ],
  },
  'art-workshops': {
    title: 'Art Workshops',
    slug: 'art-workshops',
    shortDescription: 'Training programs for traditional crafts, painting, and performing arts.',
    description: `<p>Our workshops provide hands-on training in traditional Odia art forms including Pattachitra, palm leaf engraving, stone carving, and classical dance. Led by master artisans, these programs ensure the transmission of skills to new generations.</p>
    <p>We conduct specialized workshops throughout the year, ranging from weekend introductory sessions to month-long intensive training programs. Participants learn directly from national award-winning artists who have dedicated their lives to preserving these art forms.</p>
    <p>Workshop categories include:</p>
    <ul>
      <li>Pattachitra painting techniques</li>
      <li>Palm leaf manuscript creation</li>
      <li>Traditional appliqué work</li>
      <li>Odissi dance fundamentals</li>
      <li>Folk music and instruments</li>
    </ul>`,
    icon: 'users',
    image: '/images/Launching of Kalakshetra-2021/IMG_9876.JPG',
    highlights: [
      'Expert instruction from master artisans',
      'Hands-on practical training',
      'Certificate programs available',
      'All materials provided',
    ],
    impact: [
      { number: '30+', label: 'Workshops Yearly' },
      { number: '500+', label: 'Students Trained' },
      { number: '15+', label: 'Art Forms Taught' },
    ],
  },
  'cultural-documentation': {
    title: 'Cultural Documentation',
    slug: 'cultural-documentation',
    shortDescription: 'Recording and archiving oral traditions, folk songs, and traditional knowledge.',
    description: `<p>We systematically document the intangible cultural heritage of Odisha through audio-visual recordings, written archives, and digital preservation. This includes folk songs, oral histories, traditional recipes, and indigenous knowledge systems.</p>
    <p>Our documentation team travels to remote villages to record practitioners of dying art forms, capturing their knowledge before it is lost forever. These archives serve as invaluable resources for researchers, students, and future generations.</p>
    <p>Documentation areas include:</p>
    <ul>
      <li>Oral histories and folklore</li>
      <li>Traditional music recordings</li>
      <li>Ritual and ceremonial documentation</li>
      <li>Indigenous healing practices</li>
      <li>Traditional agricultural knowledge</li>
    </ul>`,
    icon: 'book-open',
    image: '/images/Paper Clips All Kalaskhetra/IMG-20251113-WA0053.jpg',
    highlights: [
      'Comprehensive audio-visual archives',
      'Digital preservation initiative',
      'Research partnerships with universities',
      'Open access cultural database',
    ],
    impact: [
      { number: '1000+', label: 'Hours Recorded' },
      { number: '200+', label: 'Artists Documented' },
      { number: '30+', label: 'Districts Covered' },
    ],
  },
  'artist-scholarships': {
    title: 'Artist Scholarships',
    slug: 'artist-scholarships',
    shortDescription: 'Financial support for young artists pursuing traditional art forms.',
    description: `<p>Our scholarship program provides financial assistance to talented young artists who wish to dedicate themselves to traditional art forms. This includes stipends for training, materials support, and mentorship opportunities with master artists.</p>
    <p>We believe that economic barriers should not prevent talented individuals from pursuing traditional arts. Our scholarships cover training fees, provide monthly stipends, and include support for artistic materials and travel to learning centers.</p>
    <p>Scholarship benefits include:</p>
    <ul>
      <li>Monthly training stipends</li>
      <li>Materials and equipment support</li>
      <li>Mentorship from master artists</li>
      <li>Exhibition opportunities</li>
      <li>Career development guidance</li>
    </ul>`,
    icon: 'award',
    image: '/images/Village Day Samman Baragarh-2025/20251109_145135.jpg',
    highlights: [
      'Full training fee coverage',
      'Monthly living stipends',
      'Master artist mentorship',
      'Career launch support',
    ],
    impact: [
      { number: '100+', label: 'Scholars Supported' },
      { number: '₹10L+', label: 'Annual Distribution' },
      { number: '85%', label: 'Career Success Rate' },
    ],
  },
};

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  
  // Try to get from Strapi first
  try {
    const response = await getProgramBySlug(slug, locale) as StrapiResponse;
    if (response?.data?.[0]) {
      const program = response.data[0].attributes;
      return {
        title: `${program.title} | Kalakshetra Odisha`,
        description: program.shortDescription,
      };
    }
  } catch {
    // Fall through to fallback
  }

  // Use fallback
  const program = fallbackPrograms[slug];
  if (program) {
    return {
      title: `${program.title} | Kalakshetra Odisha`,
      description: program.shortDescription,
    };
  }

  return {
    title: 'Program | Kalakshetra Odisha',
  };
}

export async function generateStaticParams() {
  // Generate params for fallback programs
  const slugs = Object.keys(fallbackPrograms);
  
  // Try to get from Strapi as well
  try {
    const response = await getPrograms('en') as StrapiResponse;
    if (response?.data) {
      response.data.forEach((program) => {
        if (!slugs.includes(program.attributes.slug)) {
          slugs.push(program.attributes.slug);
        }
      });
    }
  } catch {
    // Use only fallback slugs
  }

  return slugs.flatMap((slug) => [
    { locale: 'en', slug },
    { locale: 'or', slug },
  ]);
}

export default async function ProgramDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'programs' });

  // Try to fetch from Strapi
  let programData: {
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    icon: string;
    image: string;
    highlights: string[];
    impact: { number: string; label: string }[];
  } | null = null;

  try {
    const response = await getProgramBySlug(slug, locale) as StrapiResponse;
    if (response?.data?.[0]) {
      const strapiProgram = response.data[0].attributes;
      const imageUrl = strapiProgram.image?.data?.attributes?.url
        ? getStrapiMediaUrl(strapiProgram.image.data.attributes.url)
        : '/images/1.jpeg';
      
      programData = {
        title: strapiProgram.title,
        slug: strapiProgram.slug,
        shortDescription: strapiProgram.shortDescription,
        description: strapiProgram.description,
        icon: strapiProgram.icon || 'target',
        image: imageUrl,
        highlights: fallbackPrograms[slug]?.highlights || [
          'Community-focused approach',
          'Expert guidance and support',
          'Sustainable cultural impact',
          'Measurable outcomes',
        ],
        impact: fallbackPrograms[slug]?.impact || [
          { number: '100+', label: 'Beneficiaries' },
          { number: '25+', label: 'Events' },
          { number: '10+', label: 'Years Active' },
        ],
      };
    }
  } catch {
    console.log('Using fallback program data');
  }

  // Fall back to static data
  if (!programData) {
    programData = fallbackPrograms[slug];
  }

  if (!programData) {
    notFound();
  }

  const IconComponent = iconMap[programData.icon] || Target;

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-deep">
          <Image
            src={programData.image}
            alt={programData.title}
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep/60 via-deep/70 to-deep" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-24 pb-12">
          <div className="max-w-4xl mx-auto">
            <Link
              href={`/${locale}/programs`}
              className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('backToPrograms')}
            </Link>

            <div className="w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
              <IconComponent className="h-8 w-8 text-primary-300" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              {programData.title}
            </h1>

            <p className="text-xl text-white/80 leading-relaxed max-w-3xl">
              {programData.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {programData.impact.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-sm text-white/80 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Description */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-deep mb-6">
                {t('aboutProgram')}
              </h2>
              <div 
                className="prose prose-lg max-w-none text-text/80 prose-headings:text-deep prose-strong:text-deep prose-li:marker:text-primary"
                dangerouslySetInnerHTML={{ __html: programData.description }}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-0 shadow-soft">
                <CardContent className="p-6">
                  <h3 className="text-lg font-display font-bold text-deep mb-4">
                    {t('programHighlights')}
                  </h3>
                  <ul className="space-y-3">
                    {programData.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-text/70">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-muted/20">
                    <h3 className="text-lg font-display font-bold text-deep mb-4">
                      {t('getInvolved')}
                    </h3>
                    <div className="space-y-3">
                      <Button asChild className="w-full bg-primary hover:bg-primary-600">
                        <Link href={`/${locale}/contact`}>
                          {t('volunteer')}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/${locale}/contact`}>
                          {t('donate')}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Other Programs CTA */}
      <section className="section-padding bg-muted-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-deep mb-4">
            {t('exploreOtherPrograms')}
          </h2>
          <p className="text-text/70 max-w-2xl mx-auto mb-8">
            {t('otherProgramsDescription')}
          </p>
          <Button asChild size="lg">
            <Link href={`/${locale}/programs`}>
              {t('viewAllPrograms')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
