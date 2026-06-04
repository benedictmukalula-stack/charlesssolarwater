'use client';

import {
  Target,
  Eye,
  Shield,
  Lightbulb,
  Recycle,
  Award,
  User,
  TrendingUp,
} from 'lucide-react';
import ScrollReveal from '@/components/scroll-reveal';
import Image from 'next/image';

const timeline = [
  {
    year: '2012',
    title: 'Founded',
    description: 'Established as a water engineering company in Johannesburg, South Africa.',
  },
  {
    year: '2014',
    title: 'Electrical + Construction',
    description: 'Expanded into electrical infrastructure and construction services.',
  },
  {
    year: '2017',
    title: 'Solar + Automation',
    description: 'Integrated solar water heating and smart automation capabilities.',
  },
  {
    year: '2025',
    title: 'Multi-Sector Partner',
    description: 'A trusted African infrastructure engineering partner across five sectors.',
  },
];

const teamMembers = [
  {
    name: 'Charles Somanje',
    role: 'Founder & Director',
    credential: 'Pr. Water & Electrical Engineer',
    description:
      'Multi-disciplinary engineer with deep expertise across water, electrical, construction, and automation. Leads strategic vision and project delivery.',
    photo: '/founder-photo.png',
    initial: 'CS',
    gradient: 'from-accent-green to-accent-green-dark',
  },
  {
    name: 'Chunda Mwewa',
    role: 'Senior Water Engineer',
    credential: 'BSc Water Engineering',
    description:
      'Specializes in water purification systems, borehole design, and municipal distribution networks across Southern Africa.',
    photo: '/chunda-photo.png',
    initial: 'CM',
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    name: 'Nomsa Dlamini',
    role: 'Electrical Infrastructure Lead',
    credential: 'Pr. Electrical Engineer',
    description:
      'Overheads high-voltage installations, reticulation networks, and solar-integrated power systems for commercial and industrial clients.',
    photo: '/nomsa-photo.png',
    initial: 'ND',
    gradient: 'from-amber-500 to-amber-700',
  },
  {
    name: 'David Nkosi',
    role: 'Construction & Projects Manager',
    credential: 'BSc Construction Management',
    description:
      'Manages end-to-end construction delivery from civil works to structural builds, ensuring quality, safety, and timeline adherence.',
    photo: '/david-photo.png',
    initial: 'DN',
    gradient: 'from-rose-500 to-rose-700',
  },
  {
    name: 'Tina Kaweme',
    role: 'Automation & Systems Engineer',
    credential: 'MSc Control Systems',
    description:
      'Designs and deploys SCADA systems, IoT monitoring, and building management solutions for smart infrastructure projects.',
    photo: '/tina-photo.png',
    initial: 'TK',
    gradient: 'from-violet-500 to-violet-700',
  },
];

const values = [
  { icon: Target, label: 'Precision' },
  { icon: Shield, label: 'Reliability' },
  { icon: Lightbulb, label: 'Innovation' },
  { icon: Recycle, label: 'Sustainability' },
  { icon: Award, label: 'Execution Excellence' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-accent-green font-semibold text-sm tracking-widest uppercase">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-3">
              Engineering Excellence from Africa
            </h2>
            <p className="text-steel mt-4 max-w-3xl mx-auto text-lg">
              Charlessolarwater Projects is a multi-disciplinary engineering company
              delivering integrated infrastructure solutions. Founded in 2012 by Charles
              Somanje, a qualified Water and Electrical Engineer, we have grown into a
              trusted partner for water systems, electrical infrastructure, construction,
              solar energy, and smart automation across Southern Africa.
            </p>
          </div>
        </ScrollReveal>

        {/* Company Overview Split */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <ScrollReveal direction="left">
            <div>
              <h3 className="text-2xl font-bold text-navy mb-6">
                Africa-Focused Engineering Credibility
              </h3>
              <p className="text-steel leading-relaxed mb-6">
                We understand the unique challenges of infrastructure development in Africa.
                Our engineering-led approach ensures every project is designed for reliability,
                scalability, and sustainability — from initial concept through to commissioning
                and long-term maintenance.
              </p>
              <p className="text-steel leading-relaxed">
                With multi-disciplinary expertise under one roof, we deliver integrated
                solutions that eliminate the complexity of managing multiple contractors.
                Our systems approach means every component works together — water, power,
                structures, and intelligence — as a unified infrastructure ecosystem.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: TrendingUp, value: '13+ Years', label: 'Industry Experience' },
                { icon: User, value: 'Qualified', label: 'Engineering Leadership' },
                { icon: Shield, value: 'End-to-End', label: 'Project Delivery' },
                { icon: Recycle, value: 'Sustainable', label: 'Systems Focus' },
              ].map((metric, i) => (
                <div
                  key={metric.label}
                  className="p-6 rounded-xl bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <metric.icon className="w-8 h-8 text-accent-green mb-3" />
                  <div className="text-2xl font-bold text-navy">{metric.value}</div>
                  <div className="text-steel text-sm mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Timeline */}
        <ScrollReveal>
          <div className="mb-24">
            <h3 className="text-2xl font-bold text-navy text-center mb-12">
              Our Journey
            </h3>
            <div className="relative max-w-3xl mx-auto">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <ScrollReveal key={item.year} delay={index * 0.15}>
                    <div className="relative flex items-start gap-6 md:pl-0">
                      <div className="flex-shrink-0 relative z-10">
                        <div className="w-16 h-16 rounded-full bg-accent-green flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {item.year}
                          </span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <h4 className="text-lg font-bold text-navy">{item.title}</h4>
                        <p className="text-steel mt-1">{item.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Leadership */}
        <ScrollReveal>
          <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12 mb-24">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-36 h-36 rounded-full overflow-hidden flex-shrink-0 border-4 border-accent-green/20 shadow-lg relative">
                <Image
                  src="/founder-photo.png"
                  alt="Charles Somanje — Founder & Director"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-navy">Charles Somanje</h3>
                <p className="text-accent-green font-semibold mt-1">
                  Founder & Director — Qualified Water & Electrical Engineer
                </p>
                <p className="text-steel mt-4 leading-relaxed">
                  With deep expertise spanning water engineering, electrical systems,
                  construction management, and intelligent automation, Charles leads
                  Charlessolarwater Projects with a vision of building reliable,
                  efficient, and sustainable infrastructure across Africa. His
                  multi-disciplinary approach ensures every project benefits from
                  integrated engineering excellence.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Team */}
        <ScrollReveal>
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="text-accent-green font-semibold text-sm tracking-widest uppercase">
                Our Team
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-navy mt-2">
                Engineering Experts Behind Every Project
              </h3>
              <p className="text-steel mt-4 max-w-2xl mx-auto">
                A multidisciplinary team of qualified engineers and project managers
                delivering integrated infrastructure solutions across Africa.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <ScrollReveal key={member.name} delay={index * 0.1}>
                  <div className="bg-white rounded-2xl border border-gray-100 p-8 hover:border-accent-green/30 hover:shadow-xl transition-all duration-500 text-center group h-full flex flex-col items-center">
                    {/* Avatar */}
                    {member.photo ? (
                      <div className="w-24 h-24 rounded-full overflow-hidden mb-6 shadow-lg border-4 border-accent-green/20 group-hover:scale-105 transition-transform duration-300 relative">
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300`}
                      >
                        <span className="text-white text-2xl font-bold tracking-wide">
                          {member.initial}
                        </span>
                      </div>
                    )}
                    {/* Info */}
                    <h4 className="text-lg font-bold text-navy">{member.name}</h4>
                    <p className="text-accent-green font-semibold text-sm mt-1">
                      {member.role}
                    </p>
                    <span className="inline-block text-xs text-steel bg-gray-50 rounded-full px-3 py-1 mt-2 font-medium">
                      {member.credential}
                    </span>
                    <p className="text-steel text-sm leading-relaxed mt-4 flex-1">
                      {member.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <ScrollReveal direction="left">
            <div className="p-8 rounded-2xl bg-navy text-white h-full">
              <Eye className="w-10 h-10 text-accent-green mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                To become the leading African infrastructure systems integrator —
                recognized for engineering excellence, innovation, and sustainable
                delivery across the continent.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="p-8 rounded-2xl bg-graphite text-white h-full">
              <Target className="w-10 h-10 text-accent-green mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To deliver reliable, efficient, and sustainable engineering solutions
                that empower communities, drive economic growth, and advance Africa&apos;s
                infrastructure development.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Core Values */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-navy">Core Values</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={value.label} delay={index * 0.1}>
                <div className="flex flex-col items-center p-6 rounded-xl bg-white border border-gray-100 hover:border-accent-green/30 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-accent-green/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-accent-green" />
                  </div>
                  <span className="font-semibold text-navy text-sm text-center">
                    {value.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
