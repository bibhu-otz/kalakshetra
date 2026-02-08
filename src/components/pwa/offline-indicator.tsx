'use client';

import { WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { usePWA } from '@/hooks/use-pwa';

export function OfflineIndicator() {
  const { isOnline } = usePWA();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-white py-2 px-4"
        >
          <div className="container mx-auto flex items-center justify-center gap-2 text-sm font-medium">
            <WifiOff className="h-4 w-4" />
            <span>You&apos;re offline. Some content may not be available.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
