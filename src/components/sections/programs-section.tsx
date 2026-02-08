'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Calendar, Users, MapPin } from 'lucide-react';

import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const programs = [
  {
    key: 'villageDay',
    image: '/images/Viilage Day Observed- 21 to 23 Oct 2025/IMG-20251031-WA0092.jpg',
    icon: MapPin,
  },
  {
    key: 'artWorkshops',
    image: '/images/Launching of Kalakshetra-2021/IMG_9876.JPG',
    icon: Users,
  },
  {
    key: 'documentation',
    image: '/images/Paper Clips All Kalaskhetra/IMG-20251113-WA0053.jpg',
    icon: Calendar,
  },
];

export function ProgramsSection() {
  const t = useTranslations('home.programs');
  const tPrograms = useTranslations('programs');

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('title')}
            </motion.h2>
            <motion.p
              className="section-subtitle text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t('subtitle')}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button variant="outline" asChild>
              <Link href="/programs">
                {t('viewAll')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={tPrograms(`${program.key}.title`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <program.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-semibold text-deep mb-2 group-hover:text-primary transition-colors">
                    {tPrograms(`${program.key}.title`)}
                  </h3>
                  <p className="text-text/70 text-sm leading-relaxed mb-4">
                    {tPrograms(`${program.key}.description`)}
                  </p>
                  <Link
                    href={`/programs#${program.key}`}
                    className="inline-flex items-center text-primary font-medium text-sm hover:underline"
                  >
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
