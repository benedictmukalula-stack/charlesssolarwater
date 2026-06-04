'use client';

import ScrollReveal from '@/components/scroll-reveal';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTabStore } from '@/stores/tab-store';

export default function CTABand() {
  const handleCTA = (tab: 'contact' | 'about') => {
    const { setActiveTab } = useTabStore.getState();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-navy to-graphite relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-green rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-green rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Build Infrastructure That{' '}
            <span className="text-gradient">Performs.</span>
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Partner with an engineering-led company that delivers reliable, scalable,
            and sustainable infrastructure solutions across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => handleCTA('contact')}
              className="bg-accent-green hover:bg-accent-green-dark text-white font-semibold text-sm px-6 py-2.5 h-auto"
            >
              Request Quote
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              onClick={() => handleCTA('about')}
              variant="outline"
              className="border-accent-green/50 text-accent-green hover:bg-accent-green hover:text-white hover:border-accent-green font-semibold text-sm px-6 py-2.5 h-auto bg-transparent"
            >
              Contact Engineer
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
