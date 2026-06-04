'use client';

import { Droplets, Zap, Sun, HardHat, Cpu } from 'lucide-react';
import ScrollReveal from '@/components/scroll-reveal';
import { useTabStore } from '@/stores/tab-store';

const services = [
  {
    icon: Droplets,
    title: 'Water Engineering Systems',
    description:
      'Complete water infrastructure solutions — from purification and distribution to wastewater management and borehole systems.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Zap,
    title: 'Electrical Infrastructure',
    description:
      'Industrial and commercial electrical systems including reticulation, substations, power distribution, and compliance.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Sun,
    title: 'Solar Water Heating',
    description:
      'Energy-efficient solar thermal systems for residential and commercial hot water, reducing costs and carbon footprint.',
    color: 'from-yellow-400 to-amber-500',
  },
  {
    icon: HardHat,
    title: 'Construction & Civil Works',
    description:
      'End-to-end construction management for residential, commercial, and industrial projects across Southern Africa.',
    color: 'from-emerald-500 to-green-600',
  },
  {
    icon: Cpu,
    title: 'Smart Automation Systems',
    description:
      'IoT-enabled monitoring, predictive maintenance, and intelligent control systems for modern infrastructure.',
    color: 'from-violet-500 to-purple-600',
  },
];

export default function ServicesPreview() {
  return (
    <section id="services-preview" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-accent-green font-semibold text-sm tracking-widest uppercase">
              Our Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-3">
              Integrated Engineering Solutions
            </h2>
            <p className="text-steel mt-4 max-w-2xl mx-auto text-lg">
              Multi-disciplinary expertise delivering end-to-end infrastructure
              solutions across five core engineering sectors.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.1}>
              <div className="group relative p-8 rounded-2xl border border-gray-100 hover:border-accent-green/30 bg-white hover:shadow-xl hover:shadow-accent-green/5 transition-all duration-500 h-full">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">
                  {service.title}
                </h3>
                <p className="text-steel leading-relaxed mb-6">
                  {service.description}
                </p>
                <button
                  onClick={() => {
                    const { setActiveTab } = useTabStore.getState();
                    setActiveTab('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center text-accent-green font-semibold text-sm hover:gap-2 transition-all duration-200"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
