'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero-section';
import ServicesPreview from '@/components/services-preview';
import AboutSection from '@/components/about-section';
import ServicesSection from '@/components/services-section';
import ProjectsSection from '@/components/projects-section';
import AutomationSection from '@/components/automation-section';
import ContactSection from '@/components/contact-section';
import ConsultationHub from '@/components/consultation-hub';
import CTABand from '@/components/cta-band';
import Footer from '@/components/footer';
import WhatsAppAIChat from '@/components/whatsapp-ai-chat';
import AIChatWidget from '@/components/ai-chat-widget';
import LegalModals from '@/components/legal-modals';
import { useTabStore, type TabId, initTabFromUrl } from '@/stores/tab-store';

const heroImages: Record<TabId, string> = {
  home: '/hero-home.png',
  about: '/hero-about.png',
  services: '/hero-services.png',
  projects: '/hero-projects.png',
  automation: '/hero-automation.png',
  contact: '/hero-contact.png',
  consultation: '/hero-consultation.png',
};

export default function Home() {
  const { activeTab } = useTabStore();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  useEffect(() => {
    initTabFromUrl();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent-green focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection />
            <ServicesPreview />
            <CTABand />
          </>
        )}
        {activeTab === 'about' && (
          <>
            <PageHero title="About Us" subtitle="Engineering Excellence from Africa" tab={activeTab} />
            <AboutSection />
          </>
        )}
        {activeTab === 'services' && (
          <>
            <PageHero title="Our Services" subtitle="Engineering Solutions That Perform" tab={activeTab} />
            <ServicesPreview />
            <ServicesSection />
          </>
        )}
        {activeTab === 'projects' && (
          <>
            <PageHero title="Our Projects" subtitle="Proven Delivery Across Africa" tab={activeTab} />
            <ProjectsSection />
          </>
        )}
        {activeTab === 'automation' && (
          <>
            <PageHero title="Automation & AI" subtitle="Smart Engineering Meets Intelligent Systems" tab={activeTab} />
            <AutomationSection />
          </>
        )}
        {activeTab === 'contact' && (
          <>
            <PageHero title="Contact Us" subtitle="Speak to an Engineer Today" tab={activeTab} />
            <ContactSection />
          </>
        )}
        {activeTab === 'consultation' && (
          <>
            <PageHero title="Consultation Hub" subtitle="Get Expert Engineering Advice" tab={activeTab} />
            <ConsultationHub />
          </>
        )}
      </main>
      <Footer onOpenPrivacy={() => setPrivacyOpen(true)} onOpenTerms={() => setTermsOpen(true)} />
      <WhatsAppAIChat />
      <AIChatWidget />
      <LegalModals privacyOpen={privacyOpen} onPrivacyChange={setPrivacyOpen} termsOpen={termsOpen} onTermsChange={setTermsOpen} />
    </div>
  );
}

function PageHero({ title, subtitle, tab }: { title: string; subtitle: string; tab: TabId }) {
  const imageUrl = heroImages[tab];
  const [imageLoaded, setImageLoaded] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Preload image and set loaded state in async callback only
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = imageUrl;
  }, [imageUrl]);

  // Focus h1 when tab changes for accessibility
  useEffect(() => {
    headingRef.current?.focus();
  }, [tab]);

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-navy">
      {/* Background Image with fade-in */}
      <div
        className="absolute inset-0 bg-page-hero"
        style={{
          backgroundImage: `url(${imageUrl})`,
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.4s ease-in-out',
        }}
      />
      {/* Gradient Overlay — always visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/90" />
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 pb-16">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight outline-none"
        >
          {title}
        </h1>
        <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </section>
  );
}
