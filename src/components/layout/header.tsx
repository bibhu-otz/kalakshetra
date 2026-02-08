'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';

import { Link, usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { LanguageSwitcher } from './language-switcher';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', labelKey: 'home' },
  { href: '/about', labelKey: 'about' },
  { href: '/leadership', labelKey: 'leadership' },
  { href: '/programs', labelKey: 'programs' },
  { href: '/events', labelKey: 'events' },
  { href: '/awards', labelKey: 'awards' },
  { href: '/gallery', labelKey: 'gallery' },
  { href: '/press', labelKey: 'press' },
  { href: '/contact', labelKey: 'contact' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed left-0 right-0 z-40 transition-all duration-300',
        isScrolled
          ? 'top-0 bg-white/95 backdrop-blur-md shadow-md py-2'
          : 'top-[44px] bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 md:w-14 md:h-14">
              <Image
                src="/images/logo.jpeg"
                alt="Kalakshetra Odisha"
                fill
                className="object-contain transition-transform group-hover:scale-105"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1
                className={cn(
                  'font-display text-lg md:text-xl font-bold transition-colors',
                  isScrolled ? 'text-deep' : 'text-white'
                )}
              >
                Kalakshetra
              </h1>
              <p
                className={cn(
                  'text-xs tracking-wider uppercase transition-colors',
                  isScrolled ? 'text-primary' : 'text-primary-300'
                )}
              >
                Odisha
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-all hover:bg-primary/10',
                  pathname === item.href
                    ? isScrolled
                      ? 'text-primary bg-primary/10'
                      : 'text-primary-300 bg-white/10'
                    : isScrolled
                    ? 'text-text hover:text-primary'
                    : 'text-white/90 hover:text-white'
                )}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher isScrolled={isScrolled} />

            <Button
              variant={isScrolled ? 'default' : 'outline'}
              size="sm"
              className={cn(
                'hidden md:inline-flex',
                !isScrolled &&
                  'border-white/30 text-white hover:bg-white hover:text-deep'
              )}
              asChild
            >
              <Link href="/contact">{t('donate')}</Link>
            </Button>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'lg:hidden',
                    isScrolled ? 'text-deep' : 'text-white'
                  )}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="relative w-10 h-10">
                      <Image
                        src="/images/logo.jpeg"
                        alt="Kalakshetra Odisha"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-bold text-deep">
                        Kalakshetra
                      </h2>
                      <p className="text-xs tracking-wider uppercase text-primary">
                        Odisha
                      </p>
                    </div>
                  </div>

                  <nav className="flex-grow">
                    <ul className="space-y-1">
                      {navItems.map((item) => (
                        <li key={item.href}>
                          <SheetClose asChild>
                            <Link
                              href={item.href}
                              className={cn(
                                'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                                pathname === item.href
                                  ? 'bg-primary/10 text-primary'
                                  : 'text-text hover:bg-muted/20 hover:text-primary'
                              )}
                            >
                              {t(item.labelKey)}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="pt-6 border-t">
                    <Button className="w-full" size="lg" asChild>
                      <Link href="/contact">{t('donate')}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
