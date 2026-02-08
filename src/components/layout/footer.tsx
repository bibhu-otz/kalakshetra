'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  Heart,
} from 'lucide-react';

import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const quickLinks = [
  { href: '/about', labelKey: 'about' },
  { href: '/programs', labelKey: 'programs' },
  { href: '/events', labelKey: 'events' },
  { href: '/gallery', labelKey: 'gallery' },
  { href: '/contact', labelKey: 'contact' },
] as const;

const programLinks = [
  { href: '/programs#village-day', label: 'Village Day' },
  { href: '/programs#art-workshops', label: 'Art Workshops' },
  { href: '/programs#documentation', label: 'Documentation' },
  { href: '/awards', label: 'Kalakshetra Samman' },
] as const;

const socialLinks = [
  { href: 'https://facebook.com/kalakshetraodisha', icon: Facebook, label: 'Facebook' },
  { href: 'https://instagram.com/kalakshetraodisha', icon: Instagram, label: 'Instagram' },
  { href: 'https://twitter.com/kalakshetraod', icon: Twitter, label: 'Twitter' },
  { href: 'https://youtube.com/@kalakshetraodisha', icon: Youtube, label: 'YouTube' },
] as const;

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deep text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & About */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logo.jpeg"
                  alt="Kalakshetra Odisha"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">Kalakshetra</h3>
                <p className="text-xs tracking-wider uppercase text-primary-300">
                  Odisha
                </p>
              </div>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              {t('about')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-primary transition-colors"
                  >
                    {tNav(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              {t('programs')}
            </h4>
            <ul className="space-y-2">
              {programLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              {t('newsletter.title')}
            </h4>
            <p className="text-sm text-white/70 mb-4">
              Subscribe to receive updates about our events and programs.
            </p>
            <form className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
              />
              <Button type="submit" className="w-full">
                {t('newsletter.button')}
              </Button>
            </form>

            <div className="mt-6 space-y-2">
              <a
                href="tel:+919437083555"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                +91 94370 83555
              </a>
              <a
                href="tel:+919437234651"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                +91 94372 34651
              </a>
              <a
                href="mailto:kalakshetra@gmail.com"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                kalakshetra@gmail.com
              </a>
              <a
                href="mailto:bmalbishoyi@gmail.com"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                bmalbishoyi@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>{t('copyright', { year: currentYear })}</p>
            <p className="flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-primary fill-primary" /> for Odisha
            </p>
            <p>{t('registrationNo')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
