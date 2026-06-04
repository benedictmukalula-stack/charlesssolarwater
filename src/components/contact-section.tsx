'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import ScrollReveal from '@/components/scroll-reveal';
import { COMPANY } from '@/lib/constants';

const serviceOptions = [
  'Water Engineering Systems',
  'Electrical Infrastructure',
  'Solar Water Heating',
  'Construction & Civil Works',
  'Smart Automation Systems',
  'Consultation / General Inquiry',
];

/* ─── Build WhatsApp URL with all form data ─── */
function buildWhatsAppUrl(formData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  engineer?: string;
}): string {
  const lines = [
    `📋 *New Inquiry — Charlessolarwater Website*`,
    ``,
    `👤 *Name:* ${formData.name}`,
    `📧 *Email:* ${formData.email}`,
    formData.phone ? `📞 *Phone:* ${formData.phone}` : null,
    `🔧 *Service:* ${formData.service}`,
    formData.engineer ? `👷 *Preferred Engineer:* ${formData.engineer}` : null,
    ``,
    `💬 *Message:*`,
    formData.message,
    ``,
    `---`,
    `Sent from charlessolarwater.co.za`,
  ].filter(Boolean).join('\n');

  const encoded = encodeURIComponent(lines);
  const number = COMPANY.phone.replace(/\s+/g, '').replace('+', '');
  return `https://wa.me/${number}?text=${encoded}`;
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    engineer: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', service: '', message: '', engineer: '' });
        toast.success(data.message || 'Message sent successfully!');
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Send form data via WhatsApp — opens WhatsApp with pre-filled message */
  const handleSendWhatsApp = () => {
    const url = buildWhatsAppUrl(formData);
    window.open(url, '_blank', 'noopener,noreferrer');
    setWhatsappSent(true);
    toast.success('WhatsApp opened! Send the pre-filled message to reach our team.');
  };

  /* Send via both channels simultaneously */
  const handleSendBoth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Submit to API
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setFormData({ name: '', email: '', phone: '', service: '', message: '', engineer: '' });
        toast.success(data.message || 'Message saved! Opening WhatsApp...');
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.');
        setIsSubmitting(false);
        return;
      }
    } catch {
      toast.error('Network error. Form not saved. You can still send via WhatsApp.');
    }

    // Open WhatsApp with all details
    const url = buildWhatsAppUrl(formData);
    window.open(url, '_blank', 'noopener,noreferrer');
    setWhatsappSent(true);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <ScrollReveal direction="left" className="lg:col-span-2">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-green/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent-green" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Phone</h4>
                  <a
                    href={COMPANY.phoneHref}
                    className="text-steel hover:text-accent-green transition-colors"
                  >
                    {COMPANY.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-green/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-accent-green" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Email</h4>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-steel hover:text-accent-green transition-colors break-all"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-green/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent-green" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Location</h4>
                  <p className="text-steel">{COMPANY.location}</p>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="p-6 rounded-2xl bg-navy text-white">
                <h4 className="font-bold mb-2">Prefer WhatsApp?</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Send us a message directly for a faster response.
                </p>
                <a
                  href={COMPANY.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent-green hover:bg-accent-green-dark text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
                >
                  Chat on WhatsApp
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right" className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="relative inline-block mb-6">
                    <CheckCircle2 className="w-20 h-20 text-accent-green" />
                    {whatsappSent && (
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-steel mb-2">
                    Your inquiry has been saved to our system. Our engineering team
                    will review and respond within 24 hours.
                  </p>
                  {whatsappSent && (
                    <div className="inline-flex items-center gap-2 bg-[#25D366]/10 text-[#075E54] px-4 py-2 rounded-full text-sm font-medium mb-6">
                      <MessageCircle className="w-4 h-4" />
                      Also sent via WhatsApp for faster response
                    </div>
                  )}
                  {!whatsappSent && (
                    <p className="text-steel mb-6">
                      For a faster response, consider sending via WhatsApp too.
                    </p>
                  )}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
                    <Button
                      onClick={() => {
                        setIsSubmitted(false);
                        setWhatsappSent(false);
                      }}
                      variant="outline"
                      className="border-navy text-navy"
                    >
                      Send Another Message
                    </Button>
                    {whatsappSent && (
                      <Button
                        variant="outline"
                        className="border-[#25D366] text-[#075E54] hover:bg-[#25D366] hover:text-white gap-2"
                        onClick={() => window.open(COMPANY.whatsapp, '_blank', 'noopener,noreferrer')}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Continue on WhatsApp
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSendBoth} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-navy font-semibold">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="bg-gray-50 border-gray-200 focus:border-accent-green"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-navy font-semibold">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="bg-gray-50 border-gray-200 focus:border-accent-green"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-navy font-semibold">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+27 XX XXX XXXX"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="bg-gray-50 border-gray-200 focus:border-accent-green"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="service"
                        className="text-navy font-semibold"
                      >
                        Service Required *
                      </Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) =>
                          setFormData({ ...formData, service: value })
                        }
                      >
                        <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-accent-green">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-navy font-semibold">
                      Project Details *
                    </Label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Describe your project requirements, location, timeline, and any specific technical needs..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="bg-gray-50 border-gray-200 focus:border-accent-green resize-none"
                    />
                  </div>

                  {/* Submit Buttons — dual channel */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-accent-green hover:bg-accent-green-dark text-white font-semibold py-3 text-sm"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send className="w-4 h-4" />
                          Submit & Send via WhatsApp
                        </span>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSendWhatsApp}
                      disabled={!formData.name || !formData.email || !formData.service || !formData.message}
                      className="flex-1 border-[#25D366] text-[#075E54] hover:bg-[#25D366] hover:text-white font-semibold py-3 text-sm gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp Only
                    </Button>
                  </div>
                  <p className="text-[11px] text-gray-400 text-center">
                    Primary submit saves to our system <strong>and</strong> opens WhatsApp with all your details pre-filled. &quot;WhatsApp Only&quot; sends just via WhatsApp.
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
