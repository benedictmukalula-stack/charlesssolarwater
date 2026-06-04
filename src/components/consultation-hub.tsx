'use client';

import { MessageSquare, Phone, Mail, Bot, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/scroll-reveal';
import { useTabStore } from '@/stores/tab-store';
import { COMPANY } from '@/lib/constants';

export default function ConsultationHub() {
  return (
    <section id="consultation" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* AI Assistant */}
          <ScrollReveal delay={0.1}>
            <div className="p-8 rounded-2xl border border-gray-100 hover:border-accent-green/30 hover:shadow-xl transition-all duration-500 text-center group">
              <div className="w-16 h-16 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-green group-hover:scale-110 transition-all duration-300">
                <Bot className="w-8 h-8 text-accent-green group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">AI Assistant</h3>
              <p className="text-steel mb-6 leading-relaxed">
                Our AI-powered assistant can answer service queries, suggest
                solutions, and help you determine the best approach for your
                project.
              </p>
              <Button
                onClick={() => {
                  const event = new CustomEvent('toggle-chat');
                  window.dispatchEvent(event);
                }}
                variant="outline"
                className="border-accent-green text-accent-green hover:bg-accent-green hover:text-white w-full"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Open AI Assistant
              </Button>
            </div>
          </ScrollReveal>

          {/* WhatsApp */}
          <ScrollReveal delay={0.2}>
            <div className="p-8 rounded-2xl border border-gray-100 hover:border-accent-green/30 hover:shadow-xl transition-all duration-500 text-center group">
              <div className="w-16 h-16 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-green group-hover:scale-110 transition-all duration-300">
                <Phone className="w-8 h-8 text-accent-green group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">WhatsApp</h3>
              <p className="text-steel mb-6 leading-relaxed">
                Send a message directly to our team via WhatsApp for a quick
                response. Ideal for project inquiries and scheduling
                consultations.
              </p>
              <a
                href={COMPANY.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-accent-green hover:bg-accent-green-dark text-white font-semibold py-2.5 rounded-md transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </ScrollReveal>

          {/* Email */}
          <ScrollReveal delay={0.3}>
            <div className="p-8 rounded-2xl border border-gray-100 hover:border-accent-green/30 hover:shadow-xl transition-all duration-500 text-center group">
              <div className="w-16 h-16 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-green group-hover:scale-110 transition-all duration-300">
                <Mail className="w-8 h-8 text-accent-green group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Email Us</h3>
              <p className="text-steel mb-6 leading-relaxed">
                Send a detailed inquiry via email. Best for formal proposals,
                tenders, and documentation requests.
              </p>
              <Button
                onClick={() => {
                  const el = document.querySelector('#contact');
                  if (el) {
                    const { setActiveTab } = useTabStore.getState();
                    setActiveTab('contact');
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                variant="outline"
                className="border-accent-green text-accent-green hover:bg-accent-green hover:text-white w-full"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Form
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Button>
            </div>
          </ScrollReveal>
        </div>

        {/* Why Choose Us Section */}
        <ScrollReveal>
          <div className="mt-24">
            <h3 className="text-2xl font-bold text-navy text-center mb-12">
              Why Choose Charlessolarwater
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Engineering-Driven Execution',
                  desc: 'Every project led by qualified engineers, not sales teams.',
                },
                {
                  title: 'Integrated Systems Approach',
                  desc: 'Multi-disciplinary expertise under one roof for seamless delivery.',
                },
                {
                  title: 'African Environment Proven',
                  desc: 'Designed for reliability in African conditions and contexts.',
                },
                {
                  title: 'Scalable Solutions',
                  desc: 'From residential to industrial — infrastructure that grows with you.',
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="p-6 rounded-xl bg-gray-50 border border-gray-100 hover:border-accent-green/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-green flex items-center justify-center mb-4">
                    <span className="text-white font-bold">{i + 1}</span>
                  </div>
                  <h4 className="font-bold text-navy mb-2">{item.title}</h4>
                  <p className="text-steel text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
