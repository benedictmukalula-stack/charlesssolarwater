'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '@/components/scroll-reveal';
import { useTabStore } from '@/stores/tab-store';

export default function HeroSection() {
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setBgLoaded(true);
    img.src = '/hero-home.png';
  }, []);

  const handleCTA = (tab: 'contact' | 'services') => {
    const { setActiveTab } = useTabStore.getState();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen bg-navy overflow-hidden">
      {/* Hero image — full background below navbar with fade-in */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-hero-pattern"
        style={{
          opacity: bgLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/30" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text Content */}
          <div>
            <ScrollReveal delay={0.1}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
                <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
                <span className="text-gray-200 text-sm font-medium">
                  Engineering Excellence Since 2012
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6">
                Engineering Water.{' '}
                <span className="text-gradient">Powering Infrastructure.</span>{' '}
                Advancing Africa.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-xl">
                Integrated engineering solutions across water systems, electrical
                infrastructure, construction, and intelligent automation — delivering
                reliable performance across the African continent.
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  onClick={() => handleCTA('contact')}
                  className="bg-accent-green hover:bg-accent-green-dark text-white font-semibold text-sm px-6 py-2.5 h-auto"
                >
                  Request Consultation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleCTA('services')}
                  variant="outline"
                  className="border-accent-green/50 text-accent-green hover:bg-accent-green hover:text-white hover:border-accent-green font-semibold text-sm px-6 py-2.5 h-auto bg-transparent"
                >
                  Explore Services
                </Button>
              </div>
            </ScrollReveal>

            {/* Quick trust points */}
            <ScrollReveal delay={0.5}>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {[
                  'Qualified Engineers',
                  'Multi-Sector Expertise',
                  'Africa-Focused',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-green flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Stats Cards */}
          <ScrollReveal direction="right" delay={0.3}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '13+', label: 'Years Experience', icon: '⚡' },
                { value: '5', label: 'Engineering Sectors', icon: '🔧' },
                { value: '100+', label: 'Projects Delivered', icon: '✅' },
                { value: 'ZA', label: 'Africa-Focused', icon: '🌍' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

    </section>
  );
}
