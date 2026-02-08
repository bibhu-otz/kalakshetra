'use client';

import { useLocale } from 'next-intl';
import { Globe, Check, ChevronDown } from 'lucide-react';

import { useRouter, usePathname, locales, localeNames, type Locale } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  isScrolled?: boolean;
}

export function LanguageSwitcher({ isScrolled = true }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'flex items-center gap-1.5 font-medium',
            isScrolled
              ? 'text-text hover:text-primary hover:bg-primary/10'
              : 'text-white/90 hover:text-white hover:bg-white/10'
          )}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{localeNames[locale]}</span>
          <span className="sm:hidden">{locale === 'en' ? 'En' : 'ଓ'}</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => switchLocale(loc)}
            className={cn(
              'flex items-center justify-between cursor-pointer',
              locale === loc && 'bg-primary/10'
            )}
          >
            <span className={locale === loc ? 'font-medium text-primary' : ''}>
              {localeNames[loc]}
            </span>
            {locale === loc && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
