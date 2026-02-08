import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Calendar } from 'lucide-react';

import { PageHeader } from '@/components/common/page-header';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'events' });

  return {
    title: `${t('title')} | Kalakshetra Odisha`,
    description: t('subtitle'),
  };
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <EventsContent />;
}

function EventsContent() {
  const t = useTranslations('events');

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      {/* Coming Soon */}
      <section className="section-padding min-h-[50vh] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Calendar className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-deep mb-4">
              Coming Soon
            </h2>
            <p className="text-lg text-text/70 leading-relaxed mb-8">
              We are working on bringing you exciting events and cultural programs. 
              Stay tuned for updates on upcoming Village Day celebrations, workshops, 
              and cultural festivals across Odisha.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/5 rounded-full text-primary font-medium">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Under Development
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
