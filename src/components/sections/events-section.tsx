'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock } from 'lucide-react';

import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Sample events data - in production, this would come from Strapi
const upcomingEvents = [
  {
    id: '1',
    title: 'Village Day Celebration 2026',
    titleOr: 'ଗ୍ରାମ ଦିବସ ଉଦ୍ଯାପନ ୨୦୨୬',
    date: '2026-03-15',
    venue: 'Bhubaneswar, Odisha',
    time: '10:00 AM',
    image: '/images/events/village-day.jpg',
  },
  {
    id: '2',
    title: 'Traditional Dance Workshop',
    titleOr: 'ପାରମ୍ପରିକ ନୃତ୍ୟ କର୍ମଶାଳା',
    date: '2026-03-22',
    venue: 'Cuttack, Odisha',
    time: '9:00 AM',
    image: '/images/events/dance-workshop.jpg',
  },
  {
    id: '3',
    title: 'Kalakshetra Samman 2026',
    titleOr: 'କଳାକ୍ଷେତ୍ର ସମ୍ମାନ ୨୦୨୬',
    date: '2026-04-10',
    venue: 'Puri, Odisha',
    time: '5:00 PM',
    image: '/images/events/samman.jpg',
  },
];


export function EventsSection() {
  const t = useTranslations('home.events');
  const tEvents = useTranslations('events');

  return (
    <section className="section-padding bg-muted-50">
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
              <Link href="/events">
                {t('viewAll')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20">
                    <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-2 shadow-md">
                      <div className="text-2xl font-bold text-primary leading-none">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-xs text-text/70 uppercase">
                        {new Date(event.date).toLocaleDateString('en', {
                          month: 'short',
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-deep mb-3 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-sm text-text/70">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        {event.venue}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        {event.time}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <Button variant="ghost" size="sm" className="w-full" asChild>
                        <Link href={`/events/${event.id}`}>
                          {tEvents('details')}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
