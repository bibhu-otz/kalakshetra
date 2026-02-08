'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';

// Leadership data
const leaders = [
  {
    id: '1',
    name: 'Shri Ashrumohan Mohanty',
    nameOr: 'ଶ୍ରୀ ଅଶ୍ରୁମୋହନ ମହାନ୍ତି',
    role: 'President',
    roleOr: 'ସଭାପତି',
    image: '/images/President.jpg',
  },
  {
    id: '2',
    name: 'Shri Basudev Malbisoi',
    nameOr: 'ଶ୍ରୀ ବାସୁଦେବ ମାଲବିସୋଇ',
    role: 'Member Secretary',
    roleOr: 'ସଦସ୍ୟ ସଚିବ',
    image: '/images/Secretary.jpg',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export function LeadershipSection() {
  const t = useTranslations('home.leadership');

  return (
    <section className="section-padding bg-gradient-to-b from-white to-muted-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-deep mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-text/70 leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Leadership Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {leaders.map((leader) => (
            <motion.div
              key={leader.id}
              variants={itemVariants}
              className="group"
            >
              <div className="relative bg-white rounded-2xl shadow-soft overflow-hidden transition-all duration-500 hover:shadow-strong hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/20 to-transparent opacity-60" />
                  
                  {/* Decorative Element */}
                  <div className="absolute top-4 right-4 w-12 h-12 border-2 border-primary/30 rounded-full" />
                </div>

                {/* Content */}
                <div className="relative p-6 text-center -mt-8">
                  {/* Avatar Ring */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  <div className="pt-14">
                    <h3 className="font-display text-xl font-bold text-deep mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-primary font-medium text-sm mb-4">
                      {leader.role}
                    </p>
                    
                    {/* Decorative Line */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="w-8 h-0.5 bg-primary/30 rounded-full" />
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      <span className="w-8 h-0.5 bg-primary/30 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
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
          <Button variant="outline" size="lg" asChild>
            <Link href="/leadership">
              {t('viewAll')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
