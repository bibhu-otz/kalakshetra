import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Inter, Playfair_Display } from 'next/font/google';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { TopBar } from '@/components/layout/top-bar';
import { InstallPrompt, OfflineIndicator } from '@/components/pwa';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Kalakshetra Odisha" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Kalakshetra" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#AC884D" />
        <meta name="msapplication-TileColor" content="#AC884D" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Favicons */}
        <link rel="icon" type="image/jpeg" href="/images/logo.jpeg" />
        <link rel="shortcut icon" type="image/jpeg" href="/images/logo.jpeg" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/images/logo.jpeg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/images/logo.jpeg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.jpeg" />
        <link rel="apple-touch-icon" sizes="167x167" href="/images/logo.jpeg" />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <OfflineIndicator />
          <TopBar />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <InstallPrompt />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
