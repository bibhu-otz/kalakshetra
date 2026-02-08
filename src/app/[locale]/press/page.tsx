import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { FileText, Calendar, ExternalLink, Download } from 'lucide-react';
import Image from 'next/image';

import { PageHeader } from '@/components/common/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'press' });

  return {
    title: `${t('title')} | Kalakshetra Odisha`,
    description: t('subtitle'),
  };
}

// Press data with actual newspaper clip images
const newsArticles = [
  {
    id: '1',
    title: 'Kalakshetra Odisha Celebrates 10 Years of Cultural Preservation',
    source: 'The Dharitri',
    date: '2025-12-15',
    link: '#',
    image: '/images/Paper Clips All Kalaskhetra/IMG-20251214-WA0260.jpg',
  },
  {
    id: '2',
    title: 'Village Day Celebration Brings Together 500 Artists',
    source: 'Sambad',
    date: '2025-10-25',
    link: '#',
    image: '/images/Paper Clips All Kalaskhetra/IMG-20251031-WA0104.jpg',
  },
  {
    id: '3',
    title: 'Traditional Art Forms Getting Revival Through Kalakshetra',
    source: 'Odisha TV',
    date: '2025-09-10',
    link: '#',
    image: '/images/Paper Clips All Kalaskhetra/IMG-20251113-WA0053.jpg',
  },
  {
    id: '4',
    title: 'Mo Biswa Initiative Empowers Rural Communities',
    source: 'The Samaja',
    date: '2025-11-16',
    link: '#',
    image: '/images/Paper Clips All Kalaskhetra/IMG-20251116-WA0065.jpg',
  },
  {
    id: '5',
    title: 'Kalakshetra Samman Awards Honor Folk Artists',
    source: 'Pragativadi',
    date: '2025-12-17',
    link: '#',
    image: '/images/Paper Clips All Kalaskhetra/IMG-20251217-WA0102.jpg',
  },
  {
    id: '6',
    title: 'Village Day Observed Across Multiple Districts',
    source: 'Dharitri',
    date: '2025-10-31',
    link: '#',
    image: '/images/Paper Clips All Kalaskhetra/IMG-20251031-WA0105.jpg',
  },
];

const pressReleases = [
  {
    id: '1',
    title: 'Kalakshetra Samman 2026 Nominations Open',
    date: '2026-01-15',
  },
  {
    id: '2',
    title: 'Annual Report 2025 - A Year of Cultural Impact',
    date: '2025-12-31',
  },
];

export default async function PressPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PressContent />;
}

function PressContent() {
  const t = useTranslations('press');

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      {/* News Articles */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-8">{t('articles')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((article) => (
              <Card
                key={article.id}
                className="group hover:shadow-lg transition-all overflow-hidden"
              >
                {/* Article Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-text/60 mb-3">
                    <Calendar className="h-4 w-4" />
                    {new Date(article.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                  <h3 className="font-display font-semibold text-deep mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-4">
                    {article.source}
                  </p>
                  <a
                    href={article.link}
                    className="inline-flex items-center text-sm text-text/70 hover:text-primary"
                  >
                    Read Article
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Press Releases */}
      <section className="section-padding bg-muted-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title mb-0">{t('releases')}</h2>
            <Button variant="outline" asChild>
              <a href="#">
                <Download className="mr-2 h-4 w-4" />
                {t('mediaKit')}
              </a>
            </Button>
          </div>

          <div className="space-y-4 max-w-3xl">
            {pressReleases.map((release) => (
              <Card key={release.id} className="border-0 shadow-sm">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-deep">
                        {release.title}
                      </h3>
                      <p className="text-sm text-text/70">
                        {new Date(release.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-display font-bold text-deep mb-4">
                {t('contact')}
              </h3>
              <p className="text-text/70 mb-6">
                For media inquiries, interviews, and press-related requests,
                please contact our communications team.
              </p>
              <div className="space-y-2 text-text/80">
                <p>
                  <strong>Email:</strong> kalakshetra@gmail.com / bmalbishoyi@gmail.com
                </p>
                <p>
                  <strong>Phone:</strong> +91 94370 83555
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
