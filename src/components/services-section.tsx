'use client';

import { Droplets, Zap, Sun, HardHat, Cpu, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/scroll-reveal';
import { useTabStore } from '@/stores/tab-store';

const serviceSections = [
  {
    id: 'water',
    icon: Droplets,
    title: 'Water Engineering Systems',
    color: 'from-blue-500 to-cyan-500',
    description:
      'Comprehensive water infrastructure solutions designed for reliability and sustainability in African environments.',
    capabilities: [
      'Water purification and treatment systems',
      'Municipal and industrial water distribution',
      'Borehole drilling and pump installation',
      'Wastewater management and recycling',
      'Stormwater drainage systems',
      'Water storage tanks and reservoirs',
      'Pipe laying and reticulation networks',
      'Water quality testing and compliance',
    ],
  },
  {
    id: 'electrical',
    icon: Zap,
    title: 'Electrical Infrastructure',
    color: 'from-amber-500 to-orange-500',
    description:
      'Industrial-grade electrical systems delivering safe, compliant, and efficient power solutions.',
    capabilities: [
      'High-voltage and low-voltage reticulation',
      'Substation design and installation',
      'Industrial power distribution',
      'Electrical compliance and certification',
      'Generator and UPS installations',
      'Street and area lighting systems',
      'Cable laying and jointing',
      'Load balancing and power factor correction',
    ],
  },
  {
    id: 'solar',
    icon: Sun,
    title: 'Solar Water Heating',
    color: 'from-yellow-400 to-amber-500',
    description:
      'Energy-efficient solar thermal systems that reduce operational costs and environmental impact.',
    capabilities: [
      'Solar water heater installations',
      'Heat pump integration systems',
      'Commercial solar thermal arrays',
      'System design and sizing',
      'Maintenance and performance optimization',
      'Hot water recirculation systems',
      'Energy efficiency audits',
      'Hybrid heating solutions',
    ],
  },
  {
    id: 'construction',
    icon: HardHat,
    title: 'Construction & Civil Works',
    color: 'from-emerald-500 to-green-600',
    description:
      'End-to-end construction management delivering quality infrastructure on time and within budget.',
    capabilities: [
      'Residential and commercial building',
      'Industrial facility construction',
      'Civil engineering and earthworks',
      'Project management and supervision',
      'Renovation and refurbishment',
      'Structural engineering assessments',
      'Site preparation and leveling',
      'Quality assurance and compliance',
    ],
  },
  {
    id: 'automation',
    icon: Cpu,
    title: 'Smart Automation Systems',
    color: 'from-violet-500 to-purple-600',
    description:
      'IoT-enabled intelligent systems that monitor, control, and optimize infrastructure performance.',
    capabilities: [
      'IoT sensor networks and deployment',
      'SCADA systems and monitoring',
      'Predictive maintenance platforms',
      'Energy management and analytics',
      'Building management systems (BMS)',
      'Remote monitoring dashboards',
      'Automated control systems',
      'Data-driven performance optimization',
    ],
  },
];

export default function ServicesSection() {
  const handleQuote = () => {
    const { setActiveTab } = useTabStore.getState();
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-accent-green font-semibold text-sm tracking-widest uppercase">
              Detailed Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-3">
              Engineering Solutions That Perform
            </h2>
            <p className="text-steel mt-4 max-w-2xl mx-auto text-lg">
              Each service is delivered with engineering precision, technical authority,
              and a commitment to long-term reliability.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-16">
          {serviceSections.map((service, sectionIndex) => (
            <ScrollReveal key={service.id}>
              <div
                id={service.id}
                className={`flex flex-col ${
                  sectionIndex % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-12 items-start`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center`}
                    >
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-navy">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-steel text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {service.capabilities.map((cap) => (
                      <div key={cap} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" />
                        <span className="text-navy text-sm">{cap}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={handleQuote}
                    className="bg-accent-green hover:bg-accent-green-dark text-white font-semibold"
                  >
                    Request Quote
                  </Button>
                </div>

                {/* Visual Card */}
                <div className="flex-1 w-full">
                  <div className="rounded-2xl bg-gradient-to-br from-navy to-graphite p-8 text-white h-full min-h-[300px] flex flex-col justify-center">
                    <service.icon className="w-16 h-16 text-accent-green mb-6 opacity-80" />
                    <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                    <p className="text-gray-400 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {service.capabilities.slice(0, 4).map((cap) => (
                        <span
                          key={cap}
                          className="text-xs bg-white/10 px-3 py-1 rounded-full"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {sectionIndex < serviceSections.length - 1 && (
                <div className="border-b border-gray-100 mt-16" />
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
