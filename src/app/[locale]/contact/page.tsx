import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

import { PageHeader } from '@/components/common/page-header';
import { ContactForm } from '@/components/forms/contact-form';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: `${t('title')} | Kalakshetra Odisha`,
    description: t('subtitle'),
  };
}

const socialLinks = [
  { href: 'https://facebook.com/kalakshetraodisha', icon: Facebook, label: 'Facebook' },
  { href: 'https://instagram.com/kalakshetraodisha', icon: Instagram, label: 'Instagram' },
  { href: 'https://twitter.com/kalakshetraod', icon: Twitter, label: 'Twitter' },
  { href: 'https://youtube.com/@kalakshetraodisha', icon: Youtube, label: 'YouTube' },
];

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations('contact');

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-display font-bold text-deep mb-6">
                    Send us a message
                  </h2>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-display font-semibold text-deep mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep mb-1">
                        {t('info.address')}
                      </h4>
                      <p className="text-text/70">
                        Plot No 559/2514, Gandhi Nagar
                        <br />
                        Kousalyaganga, Purba Sasana
                        <br />
                        Bhubaneswar, Odisha, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep mb-1">
                        {t('info.phone')}
                      </h4>
                      <p className="text-text/70">
                        +91 94370 83555
                        <br />
                        +91 94372 34651
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep mb-1">
                        {t('info.email')}
                      </h4>
                      <p className="text-text/70">
                        kalakshetra@gmail.com
                        <br />
                        bmalbishoyi@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep mb-1">
                        {t('info.hours')}
                      </h4>
                      <p className="text-text/70">
                        Monday - Saturday: 10:00 AM - 6:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-display font-semibold text-deep mb-4">
                  {t('social')}
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="h-64 bg-muted/30 rounded-xl flex items-center justify-center">
                <p className="text-text/50">Map Integration</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
