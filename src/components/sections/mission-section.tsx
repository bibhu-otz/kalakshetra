'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Landmark,
  GraduationCap,
  Users,
  BookOpen,
} from 'lucide-react';

const values = [
  { key: 'preservation', icon: Landmark },
  { key: 'education', icon: GraduationCap },
  { key: 'community', icon: Users },
  { key: 'research', icon: BookOpen },
] as const;

export function MissionSection() {
  const t = useTranslations('home.mission');

  return (
    <section className="section-padding bg-gradient-to-b from-white to-muted-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('title')}
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('description')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.key}
              className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <value.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display text-xl font-semibold text-deep mb-2">
                {t(`values.${value.key}.title`)}
              </h3>
              <p className="text-text/70 text-sm leading-relaxed">
                {t(`values.${value.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
