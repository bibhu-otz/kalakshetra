import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  Target,
  Eye,
  Heart,
  Award,
  CheckCircle,
} from 'lucide-react';

import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: `${t('title')} | Kalakshetra Odisha`,
    description: t('subtitle'),
  };
}

const values = [
  { key: 'authenticity', icon: CheckCircle },
  { key: 'inclusivity', icon: Heart },
  { key: 'sustainability', icon: Target },
  { key: 'excellence', icon: Award },
];

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations('about');

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      {/* Story Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-deep mb-6">
                {t('history.title')}
              </h2>
              <p className="text-text/80 leading-relaxed mb-6">
                {t('history.description')}
              </p>
              <p className="text-text/70 leading-relaxed">
                Through years of dedicated effort, we have touched the lives of
                thousands of artists and communities across Odisha, preserving
                traditions that might otherwise be lost to time.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/Launching of Kalakshetra-2021/IMG_9957.JPG"
                alt="Kalakshetra Odisha History"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Messages */}
      <section className="section-padding bg-gradient-to-b from-white to-muted-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">Messages from Our Leaders</h2>
          
          {/* President's Message */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/President.jpg"
                  alt="Shri Ashrumohan Mohanty - President"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/40 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            </div>
            <div className="lg:pl-8">
              <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                Message from the President
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-deep mb-4">
                Shri Ashrumohan Mohanty
              </h3>
              <blockquote className="text-lg text-text/80 leading-relaxed italic border-l-4 border-primary pl-6">
                &quot;Culture is not only performance—it is identity, values, and pride. Kalakshetra stands to protect Odisha&apos;s folk traditions, support artists, and bring cultural awareness to every village and every generation. Let us celebrate our roots and strengthen our community through art.&quot;
              </blockquote>
            </div>
          </div>

          {/* Member Secretary's Message */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2 relative">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/Secretary.jpg"
                  alt="Shri Basudev Malbisoi - Member Secretary"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/40 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl" />
            </div>
            <div className="lg:order-1 lg:pr-8">
              <div className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-sm font-medium rounded-full mb-4">
                Message from the Member Secretary
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-deep mb-4">
                Shri Basudev Malbisoi
              </h3>
              <blockquote className="text-lg text-text/80 leading-relaxed italic border-l-4 border-secondary pl-6">
                &quot;Villages are the heart of India&apos;s culture. Through the &apos;Mo Biswa&apos; initiative and Village Day programs, we promote unity, awareness, and cultural dignity across communities. Kalakshetra will continue connecting people through folk art, cultural events, and recognition of dedicated contributors.&quot;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-muted-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Eye className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold text-deep mb-4">
                  {t('vision.title')}
                </h3>
                <p className="text-text/70 leading-relaxed">
                  {t('vision.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-2xl font-display font-bold text-deep mb-4">
                  {t('mission.title')}
                </h3>
                <p className="text-text/70 leading-relaxed">
                  {t('mission.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">{t('values.title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.key}
                className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-deep">
                  {t(`values.${value.key}`)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
