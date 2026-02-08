'use client';

import { useState, useEffect } from 'react';
import { X, Download, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { usePWA } from '@/hooks/use-pwa';
import { Button } from '@/components/ui/button';

export function InstallPrompt() {
  const { isInstallable, isInstalled, promptInstall } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if user has previously dismissed
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      // Show again after 7 days
      if (Date.now() - dismissedTime < 7 * 24 * 60 * 60 * 1000) {
        setIsDismissed(true);
      }
    }

    // Show prompt after a delay (don't interrupt initial experience)
    const timer = setTimeout(() => {
      if (isInstallable && !isInstalled && !isDismissed) {
        setShowPrompt(true);
      }
    }, 30000); // 30 seconds delay

    return () => clearTimeout(timer);
  }, [isInstallable, isInstalled, isDismissed]);

  const handleDismiss = () => {
    setShowPrompt(false);
    setIsDismissed(true);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  const handleInstall = async () => {
    const result = await promptInstall();
    if (result.outcome === 'accepted') {
      setShowPrompt(false);
    }
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-muted/20 p-4 relative">
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 text-text/50 hover:text-text transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="font-display font-bold text-deep">
                  Install Kalakshetra
                </h3>
                <p className="text-sm text-text/70 mt-1">
                  Add to your home screen for quick access and offline viewing.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDismiss}
                className="flex-1"
              >
                Maybe Later
              </Button>
              <Button
                size="sm"
                onClick={handleInstall}
                className="flex-1 bg-primary hover:bg-primary-600"
              >
                <Download className="h-4 w-4 mr-2" />
                Install
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
