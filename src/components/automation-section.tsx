'use client';

import { Cpu, Wifi, BarChart3, Shield, Brain, Radio } from 'lucide-react';
import ScrollReveal from '@/components/scroll-reveal';

const features = [
  {
    icon: Wifi,
    title: 'IoT Systems',
    description:
      'Deploy sensor networks across your infrastructure for real-time monitoring of water flow, energy consumption, pressure, temperature, and more.',
  },
  {
    icon: Brain,
    title: 'Smart Monitoring',
    description:
      'Centralized dashboards providing live visibility into all infrastructure systems, enabling proactive management and rapid response.',
  },
  {
    icon: Shield,
    title: 'Predictive Maintenance',
    description:
      'AI-powered analytics that identify potential failures before they occur, reducing downtime and maintenance costs by up to 40%.',
  },
  {
    icon: BarChart3,
    title: 'Energy Analytics',
    description:
      'Detailed energy consumption analysis and optimization recommendations to reduce operational costs and improve sustainability metrics.',
  },
];

export default function AutomationSection() {
  return (
    <section id="automation" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-accent-green font-semibold text-sm tracking-widest uppercase">
              Automation & AI
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-3">
              Smart Engineering Meets Intelligent Systems
            </h2>
            <p className="text-steel mt-4 max-w-2xl mx-auto text-lg">
              Transform your infrastructure with IoT-enabled monitoring,
              predictive analytics, and intelligent automation — built for
              the demands of modern African infrastructure.
            </p>
          </div>
        </ScrollReveal>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.1}>
              <div className="flex gap-5 p-6 rounded-2xl border border-gray-100 hover:border-accent-green/30 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-accent-green/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-accent-green" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-steel leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Integration Diagram */}
        <ScrollReveal>
          <div className="bg-gradient-to-br from-navy to-graphite rounded-2xl p-8 md:p-12 text-white">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <Cpu className="w-10 h-10 text-accent-green" />
                  <h3 className="text-2xl font-bold">How It Works</h3>
                </div>
                <div className="space-y-6">
                  {[
                    {
                      step: '01',
                      title: 'Deploy Sensors',
                      desc: 'Install IoT sensors across water, power, and building systems.',
                    },
                    {
                      step: '02',
                      title: 'Collect Data',
                      desc: 'Real-time data flows to centralized cloud-based dashboards.',
                    },
                    {
                      step: '03',
                      title: 'Analyze & Optimize',
                      desc: 'AI algorithms identify patterns, predict failures, and recommend optimizations.',
                    },
                    {
                      step: '04',
                      title: 'Automate Actions',
                      desc: 'Automated responses and alerts ensure continuous optimal performance.',
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent-green flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">
                          {item.step}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-gray-400 text-sm mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Radio className="w-4 h-4 text-accent-green" />
                    <span className="text-sm font-medium text-accent-green">
                      System Status Demo
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Water Flow Rate', value: '92%', status: 'normal' },
                      { label: 'Power Consumption', value: '78%', status: 'normal' },
                      { label: 'System Efficiency', value: '95%', status: 'optimal' },
                      { label: 'Predictive Score', value: '98%', status: 'optimal' },
                    ].map((metric) => (
                      <div
                        key={metric.label}
                        className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                      >
                        <span className="text-gray-300 text-sm">
                          {metric.label}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent-green rounded-full"
                              style={{ width: metric.value }}
                            />
                          </div>
                          <span className="text-white text-sm font-mono w-10 text-right">
                            {metric.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
