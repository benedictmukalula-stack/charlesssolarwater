'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTabStore } from '@/stores/tab-store';

const navLinks = [
  { label: 'Home', tab: 'home' as const },
  { label: 'About', tab: 'about' as const },
  { label: 'Services', tab: 'services' as const },
  { label: 'Projects', tab: 'projects' as const },
  { label: 'Automation & AI', tab: 'automation' as const },
  { label: 'Contact', tab: 'contact' as const },
  { label: 'Consultation', tab: 'consultation' as const },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeTab, setActiveTab } = useTabStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tab: typeof navLinks[number]['tab']) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass-effect shadow-lg py-3'
          : 'bg-transparent py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-3 group"
        >
          <Image
            src="/company-logo.png"
            alt="Charlessolarwater Projects"
            width={128}
            height={64}
            unoptimized
            className="h-16 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_2px_12px_rgba(46,204,113,0.4)] transition-all duration-300"
          />
        </a>

        {/* Desktop Nav */}
        <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.tab}
              href={`#${link.tab}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.tab);
              }}
              aria-current={activeTab === link.tab ? 'page' : undefined}
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
                activeTab === link.tab
                  ? 'text-accent-green bg-accent-green/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              )}
            >
              {link.label}
            </a>
          ))}
          <Button
            onClick={() => handleNavClick('consultation')}
            className="ml-3 bg-accent-green hover:bg-accent-green-dark text-white font-semibold"
            size="sm"
          >
            Request Consultation
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav role="navigation" aria-label="Mobile navigation" className="glass-effect border-t border-white/10 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.tab}
              href={`#${link.tab}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.tab);
              }}
              aria-current={activeTab === link.tab ? 'page' : undefined}
              className={cn(
                'block w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-all duration-200',
                activeTab === link.tab
                  ? 'text-accent-green bg-accent-green/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              )}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <Button
              onClick={() => handleNavClick('consultation')}
              className="w-full bg-accent-green hover:bg-accent-green-dark text-white font-semibold"
            >
              Request Consultation
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
