'use client';

import { motion } from 'framer-motion';
import { Target, MapPin, Home, Calendar, Award, PartyPopper } from 'lucide-react';

const objectives = [
  {
    icon: MapPin,
    titleEn: 'Kalakshetra Village in Every District',
    titleOr: 'ପ୍ରତ୍ୟେକ ଜିଲ୍ଲାରେ ଗୋଟିଏ "କଳାକ୍ଷେତ୍ର ଗ୍ରାମ"',
    description: 'Establish one Kalakshetra Village in each of Odisha\'s 30 districts',
  },
  {
    icon: Target,
    titleEn: '10 Model Kalakshetra Districts',
    titleOr: '୧୦ ଟି ଆଦର୍ଶ କଳାକ୍ଷେତ୍ର ଜିଲ୍ଲା ସୃଷ୍ଟି କରିବା',
    description: 'Create 10 model districts showcasing cultural excellence',
  },
  {
    icon: Home,
    titleEn: '"Gaan Mo Maa" in 40,000 Villages',
    titleOr: '"ଗାଁ ମୋ ମାଁ" କାର୍ଯ୍ୟକ୍ରମ- ୪୦,୦୦୦ ଗ୍ରାମରେ',
    description: 'Village is My Mother program reaching 40,000 villages',
  },
  {
    icon: Calendar,
    titleEn: 'Annual Village Day Celebration',
    titleOr: 'ପ୍ରତିବର୍ଷ ଗାଁ ଦିବସ ପାଳନ',
    description: 'Celebrate Village Day every year across Odisha',
  },
  {
    icon: Award,
    titleEn: 'Annual Kalakshetra Samman',
    titleOr: 'ପ୍ରତିବର୍ଷ କଳାକ୍ଷେତ୍ର ସମ୍ମାନ',
    description: 'Honor outstanding cultural contributors yearly',
  },
  {
    icon: PartyPopper,
    titleEn: 'Annual Kalakshetra Festival',
    titleOr: 'ପ୍ରତ୍ୟେକ ବର୍ଷ କଳାକ୍ଷେତ୍ର ମହୋତ୍ସବ ପାଳନ',
    description: 'Grand cultural festival celebration every year',
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

export function ObjectivesSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-muted-50 to-white">
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
            Our Goals
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-deep mb-4">
            Our Objectives
          </h2>
          <p className="text-lg text-text/70 leading-relaxed">
            Committed to preserving and promoting Odisha&apos;s rich cultural heritage through ambitious goals
          </p>
        </motion.div>

        {/* Objectives Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {objectives.map((objective, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-primary/20"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <objective.icon className="h-7 w-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="font-display text-lg font-bold text-deep mb-2">
                {objective.titleEn}
              </h3>
              <p className="text-sm text-primary/80 font-medium mb-2 font-odia">
                {objective.titleOr}
              </p>
              <p className="text-text/70 text-sm">
                {objective.description}
              </p>

              {/* Decorative Element */}
              <div className="absolute top-4 right-4 w-8 h-8 border-2 border-primary/10 rounded-full group-hover:border-primary/30 transition-colors" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center p-6 bg-primary/5 rounded-xl">
            <span className="text-3xl md:text-4xl font-display font-bold text-primary">30</span>
            <p className="text-text/70 text-sm mt-1">Districts Covered</p>
          </div>
          <div className="text-center p-6 bg-secondary/5 rounded-xl">
            <span className="text-3xl md:text-4xl font-display font-bold text-secondary">40,000</span>
            <p className="text-text/70 text-sm mt-1">Villages Target</p>
          </div>
          <div className="text-center p-6 bg-primary/5 rounded-xl">
            <span className="text-3xl md:text-4xl font-display font-bold text-primary">10</span>
            <p className="text-text/70 text-sm mt-1">Model Districts</p>
          </div>
          <div className="text-center p-6 bg-secondary/5 rounded-xl">
            <span className="text-3xl md:text-4xl font-display font-bold text-secondary">Annual</span>
            <p className="text-text/70 text-sm mt-1">Events & Awards</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
