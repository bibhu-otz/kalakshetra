'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Calendar } from 'lucide-react';

import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Press data with actual newspaper clip images
const pressItems = [
  {
    id: '1',
    title: 'Kalakshetra Odisha Celebrates 10 Years of Cultural Preservation',
    titleOr: 'କଳାକ୍ଷେତ୍ର ଓଡ଼ିଶା ସାଂସ୍କୃତିକ ସଂରକ୍ଷଣର ୧୦ ବର୍ଷ ପାଳନ କରୁଛି',
    source: 'The Dharitri',
    date: '2025-12-15',
    excerpt: 'A decade of tireless efforts in preserving and promoting the rich cultural heritage of Odisha.',
    link: '#',
    image: '/images/Paper Clips All Kalaskhetra/IMG-20251214-WA0260.jpg',
  },
  {
    id: '2',
    title: 'Village Day Celebration Brings Together 500 Artists',
    titleOr: 'ଗ୍ରାମ ଦିବସ ଉତ୍ସବରେ ୫୦୦ କଳାକାର ଏକତ୍ରିତ',
    source: 'Sambad',
    date: '2025-10-25',
    excerpt: 'The annual Village Day celebration witnessed an unprecedented gathering of folk artists.',
    link: '#',
    image: '/images/Paper Clips All Kalaskhetra/IMG-20251031-WA0104.jpg',
  },
  {
    id: '3',
    title: 'Traditional Art Forms Getting Revival Through Kalakshetra',
    titleOr: 'କଳାକ୍ଷେତ୍ର ମାଧ୍ୟମରେ ପାରମ୍ପରିକ କଳା ପୁନରୁଜ୍ଜୀବିତ',
    source: 'Odisha TV',
    date: '2025-09-10',
    excerpt: 'Dying art forms find new life through dedicated workshops and documentation efforts.',
    link: '#',
    image: '/images/Paper Clips All Kalaskhetra/IMG-20251113-WA0053.jpg',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function PressSection() {
  const t = useTranslations('home.press');

  return (
    <section className="section-padding bg-deep text-white overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary-300 text-sm font-medium rounded-full mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Press Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pressItems.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Card className="group h-full bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep/80 to-transparent" />
                    
                    {/* Source Badge */}
                    <div className="absolute bottom-3 left-3">
                      <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                        {item.source}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-white/50 text-sm mb-3">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(item.date).toLocaleDateString('en', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-primary-300 transition-colors">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-white/60 text-sm line-clamp-2 mb-4">
                      {item.excerpt}
                    </p>

                    {/* Read More */}
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary-300 text-sm font-medium hover:text-primary transition-colors"
                    >
                      {t('readMore')}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white/30 text-white hover:bg-white hover:text-deep"
            asChild
          >
            <Link href="/press">
              {t('viewAll')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
