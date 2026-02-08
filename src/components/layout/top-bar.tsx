'use client';

import { useState, useEffect } from 'react';
import { Phone, Mail, Facebook, Instagram, Twitter, Youtube, X, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const notifications = [
  'Village Day 2026 celebrations coming soon - Register now!',
  'Kalakshetra Samman 2026 nominations are open',
  'New art workshops starting in March 2026',
  'Join us in preserving Odisha\'s cultural heritage',
];

const socialLinks = [
  { href: 'https://facebook.com/kalakshetraodisha', icon: Facebook, label: 'Facebook' },
  { href: 'https://instagram.com/kalakshetraodisha', icon: Instagram, label: 'Instagram' },
  { href: 'https://twitter.com/kalakshetraod', icon: Twitter, label: 'Twitter' },
  { href: 'https://youtube.com/@kalakshetraodisha', icon: Youtube, label: 'YouTube' },
];

export function TopBar() {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification((prev) => (prev + 1) % notifications.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "fixed top-0 left-0 right-0 bg-[#1a0a0a] text-white text-sm z-50 transition-all duration-300 border-b border-white/10",
        isScrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2.5">
          {/* Left - Notification/Event Ticker */}
          <div className="flex-1 overflow-hidden pr-4">
            <div className="flex items-center gap-2">
              <span className="bg-primary text-white text-xs px-2 py-0.5 rounded font-medium flex-shrink-0">
                Latest
              </span>
              <Bell className="h-3.5 w-3.5 text-primary animate-pulse flex-shrink-0" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentNotification}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="whitespace-nowrap text-xs md:text-sm text-white/90"
                >
                  {notifications[currentNotification]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Right - Contact Info & Social Media */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Phone Numbers */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+919437083555"
                className="flex items-center gap-1.5 hover:text-primary transition-colors text-white/80 hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span>+91 94370 83555</span>
              </a>
              <a
                href="tel:+919437234651"
                className="flex items-center gap-1.5 hover:text-primary transition-colors text-white/80 hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span>+91 94372 34651</span>
              </a>
            </div>
            
            <span className="text-white/20">|</span>
            
            {/* Email */}
            <a
              href="mailto:kalakshetra@gmail.com"
              className="flex items-center gap-1.5 hover:text-primary transition-colors text-white/80 hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-primary" />
              <span>kalakshetra@gmail.com</span>
            </a>
            
            <span className="text-white/20">|</span>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full bg-white/10 hover:bg-primary hover:text-white transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Close Button - Mobile */}
          <button
            onClick={() => setIsVisible(false)}
            className="lg:hidden p-1 hover:text-primary transition-colors ml-2"
            aria-label="Close notification bar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
