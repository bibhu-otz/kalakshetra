'use client';

import Image from 'next/image';
import Link from 'next/link';
import { WifiOff, RefreshCw, Home } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <Image
            src="/images/logo.jpeg"
            alt="Kalakshetra Odisha"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Offline Icon */}
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-10 h-10 text-primary" />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-display font-bold text-deep mb-4">
          You&apos;re Offline
        </h1>

        {/* Description */}
        <p className="text-text/70 text-lg mb-8 leading-relaxed">
          It seems you&apos;ve lost your internet connection. Don&apos;t worry, you can
          still explore some of our previously visited pages.
        </p>

        {/* Decorative Element */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="w-12 h-0.5 bg-primary/30 rounded-full" />
          <span className="w-2 h-2 bg-primary rounded-full" />
          <span className="w-12 h-0.5 bg-primary/30 rounded-full" />
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary/30 text-primary hover:bg-primary/10 font-medium rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-12 text-sm text-text/50">
          Kalakshetra Odisha • Preserving Cultural Heritage
        </p>
      </div>
    </div>
  );
}
