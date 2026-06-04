'use client';

import { Badge } from '@/components/ui/badge';
import ScrollReveal from '@/components/scroll-reveal';
import Image from 'next/image';

const projects = [
  {
    title: 'Municipal Water Reticulation Upgrade',
    image: '/project-water.png',
    scope: 'Complete water distribution network overhaul including 12km of piping, 8 pressure stations, and SCADA integration.',
    outcome: 'Increased water supply reliability by 85% and reduced losses by 40% across the municipality.',
    category: 'Industrial',
    tags: ['Water Engineering', 'SCADA', 'Infrastructure'],
  },
  {
    title: 'Commercial Solar Hot Water System',
    image: '/project-solar.png',
    scope: 'Design and installation of a 200-panel solar thermal array for a commercial hotel complex.',
    outcome: 'Reduced water heating costs by 65% with a projected 4-year ROI.',
    category: 'Commercial',
    tags: ['Solar', 'Energy Efficiency', 'Commercial'],
  },
  {
    title: 'Industrial Electrical Reticulation',
    image: '/project-electrical.png',
    scope: 'High-voltage electrical distribution for a manufacturing facility including substation and power monitoring.',
    outcome: 'Achieved full electrical compliance and improved power quality by 30%.',
    category: 'Industrial',
    tags: ['Electrical', 'Compliance', 'Industrial'],
  },
  {
    title: 'Residential Estate Development',
    image: '/project-residential.png',
    scope: 'Full civil works and infrastructure for a 120-unit residential development including roads, water, and electrical.',
    outcome: 'Project delivered on schedule with zero compliance incidents.',
    category: 'Residential',
    tags: ['Construction', 'Civil Works', 'Residential'],
  },
  {
    title: 'Smart Building Automation',
    image: '/project-automation.png',
    scope: 'IoT-enabled building management system for a corporate office with energy analytics and remote monitoring.',
    outcome: 'Reduced energy consumption by 35% and enabled predictive maintenance.',
    category: 'Commercial',
    tags: ['Automation', 'IoT', 'Smart Building'],
  },
  {
    title: 'Rural Borehole Water Supply',
    image: '/project-borehole.png',
    scope: 'Borehole drilling, pump installation, and solar-powered distribution for rural community water access.',
    outcome: 'Provided clean water access to 3,000+ community members with sustainable solar power.',
    category: 'Residential',
    tags: ['Water', 'Solar', 'Community'],
  },
];

const categoryColors: Record<string, string> = {
  Residential: 'bg-blue-100 text-blue-800',
  Commercial: 'bg-emerald-100 text-emerald-800',
  Industrial: 'bg-amber-100 text-amber-800',
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-accent-green font-semibold text-sm tracking-widest uppercase">
              Our Projects
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-3">
              Proven Delivery Across Africa
            </h2>
            <p className="text-steel mt-4 max-w-2xl mx-auto text-lg">
              A selection of completed projects demonstrating our engineering
              capabilities across multiple sectors.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.1}>
              <div className="group bg-white rounded-2xl border border-gray-100 hover:border-accent-green/20 p-6 hover:shadow-xl hover:shadow-accent-green/5 transition-all duration-500 h-full flex flex-col">
                {/* Project Image */}
                <div className="h-48 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-2xl relative">
                  <Image src={project.image} alt={project.title} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>

                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <Badge
                    className={`text-xs font-semibold px-3 py-1 ${
                      categoryColors[project.category] || ''
                    }`}
                  >
                    {project.category}
                  </Badge>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-navy mb-3 group-hover:text-accent-green-dark transition-colors">
                  {project.title}
                </h3>

                {/* Scope */}
                <div className="mb-4">
                  <span className="text-xs font-semibold text-steel uppercase tracking-wider">
                    Scope
                  </span>
                  <p className="text-steel text-sm mt-1 leading-relaxed">
                    {project.scope}
                  </p>
                </div>

                {/* Outcome */}
                <div className="mb-4">
                  <span className="text-xs font-semibold text-accent-green uppercase tracking-wider">
                    Outcome
                  </span>
                  <p className="text-navy text-sm mt-1 font-medium leading-relaxed">
                    {project.outcome}
                  </p>
                </div>

                {/* Tags */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-50 text-steel px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
