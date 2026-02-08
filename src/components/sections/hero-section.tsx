'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-deep">
        <div className="absolute inset-0 bg-gradient-to-b from-deep/90 via-deep/95 to-deep" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/15 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-dusty/10 rounded-full blur-2xl" />
      
      {/* Floating Cultural Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23AC884D'%3E%3Cpath d='M40 0l40 40-40 40L0 40 40 0zm0 10L10 40l30 30 30-30L40 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-24 pb-12">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto">
              <Image
                src="/images/logo.jpeg"
                alt="Kalakshetra Odisha"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
              {/* Logo Glow */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl -z-10 scale-150" />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md text-primary-300 text-sm font-medium rounded-full border border-white/10 mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Cultural Heritage Foundation of Odisha
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="block">{t('title')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Button 
              size="xl" 
              className="min-w-[200px] bg-primary hover:bg-primary-600 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
              asChild
            >
              <Link href="/programs">
                {t('cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="min-w-[200px] border-white/30 text-white hover:bg-white hover:text-deep backdrop-blur-sm"
              asChild
            >
              <Link href="/about">{t('secondaryCta')}</Link>
            </Button>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 pt-8 border-t border-white/10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {[
              { number: '25+', label: 'Years of Service' },
              { number: '500+', label: 'Artists Supported' },
              { number: '50+', label: 'Events Organized' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-primary-300">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-white/60 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.div 
            className="flex flex-col items-center gap-2 text-white/50 cursor-pointer hover:text-white/80 transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-xs uppercase tracking-widest">Explore</span>
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
