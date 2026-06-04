'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface LegalModalsProps {
  privacyOpen: boolean;
  onPrivacyChange: (open: boolean) => void;
  termsOpen: boolean;
  onTermsChange: (open: boolean) => void;
}

export default function LegalModals({
  privacyOpen,
  onPrivacyChange,
  termsOpen,
  onTermsChange,
}: LegalModalsProps) {
  return (
    <>
      {/* Privacy Policy Dialog */}
      <Dialog open={privacyOpen} onOpenChange={onPrivacyChange}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Privacy Policy</DialogTitle>
            <DialogDescription>
              Last updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
            <section>
              <h3 className="text-white font-semibold text-base mb-2">1. Introduction</h3>
              <p>
                Charlessolarwater Projects (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operating from Edenvale, Johannesburg, South Africa, is committed to protecting your personal information in compliance with the Protection of Personal Information Act 4 of 2013 (POPIA) and other applicable South African data protection laws. This Privacy Policy explains how we collect, use, store, and protect your information when you interact with our website, contact forms, AI chat assistant, and related services.
              </p>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">2. Information We Collect</h3>
              <p className="mb-3">We collect personal information through the following channels:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  <strong className="text-white">Contact Form Submissions:</strong> When you submit our contact or consultation form, we collect your name, email address, phone number, selected service interest, and message content.
                </li>
                <li>
                  <strong className="text-white">AI Chat Assistant:</strong> Conversations with our AI chat widget may include personal information you voluntarily share. Chat messages are processed to provide responses and are not stored permanently beyond the session.
                </li>
                <li>
                  <strong className="text-white">WhatsApp Communications:</strong> Information shared via our WhatsApp contact channel is processed through WhatsApp&apos;s own systems subject to their privacy policy.
                </li>
                <li>
                  <strong className="text-white">Website Analytics:</strong> We may collect anonymised usage data such as page visits, browser type, and device information to improve our website performance.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">3. Purpose of Collection</h3>
              <p className="mb-3">Your personal information is collected and processed for the following legitimate purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Responding to service enquiries and consultation requests</li>
                <li>Providing accurate engineering project quotations</li>
                <li>Delivering AI-powered assistance for general service information</li>
                <li>Improving our website, services, and user experience</li>
                <li>Compliance with legal and regulatory obligations</li>
              </ul>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">4. Legal Basis for Processing</h3>
              <p>
                Under POPIA, we process your personal information based on your explicit consent (provided when you submit a form or engage with our AI assistant), the legitimate interests of our business in providing engineering services, and the necessity of processing for the performance of a contract with you.
              </p>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">5. Data Storage and Security</h3>
              <p>
                Your information is stored securely on servers located within South Africa. We implement appropriate technical and organisational measures to protect your data against unauthorised access, alteration, disclosure, or destruction. These measures include encrypted data transmission, access controls, and secure hosting environments.
              </p>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">6. Data Retention</h3>
              <p>
                We retain personal information only for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Contact form submissions are retained for up to 24 months for follow-up purposes. You may request earlier deletion of your data at any time.
              </p>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">7. Your Rights</h3>
              <p className="mb-3">Under POPIA, you have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-white">Right of Access:</strong> Request a copy of the personal information we hold about you.</li>
                <li><strong className="text-white">Right to Correction:</strong> Request correction of inaccurate or incomplete information.</li>
                <li><strong className="text-white">Right to Deletion:</strong> Request deletion of your personal information.</li>
                <li><strong className="text-white">Right to Object:</strong> Object to the processing of your personal information.</li>
                <li><strong className="text-white">Right to Data Portability:</strong> Request your data in a structured, commonly used format.</li>
                <li><strong className="text-white">Right to Withdraw Consent:</strong> Withdraw your consent at any time where processing is based on consent.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">8. Third-Party Sharing</h3>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist in operating our website and delivering services, subject to strict confidentiality agreements. We may also disclose information when required by law or to protect our legal rights.
              </p>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">9. Cookies</h3>
              <p>
                Our website may use essential cookies required for basic functionality. We do not use tracking or advertising cookies. You may manage your cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">10. Children&apos;s Privacy</h3>
              <p>
                Our services are not directed at individuals under the age of 18. We do not knowingly collect personal information from minors. If we discover that we have collected information from a child, we will promptly delete it.
              </p>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">11. Changes to This Policy</h3>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">12. Contact Us</h3>
              <p>
                For any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us:
              </p>
              <div className="mt-3 bg-white/5 rounded-lg p-4 space-y-1">
                <p className="text-white font-medium">Charlessolarwater Projects</p>
                <p>Edenvale, Johannesburg, South Africa</p>
                <p>Email: <a href="mailto:info@charlessolarwater.co.za" className="text-accent-green hover:underline">info@charlessolarwater.co.za</a></p>
                <p>Phone: <a href="tel:+27833145636" className="text-accent-green hover:underline">+27 83 314 5636</a></p>
              </div>
            </section>
          </div>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Dialog */}
      <Dialog open={termsOpen} onOpenChange={onTermsChange}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Terms of Service</DialogTitle>
            <DialogDescription>
              Last updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
            <section>
              <h3 className="text-white font-semibold text-base mb-2">1. Acceptance of Terms</h3>
              <p>
                By accessing and using the Charlessolarwater Projects website (the &quot;Site&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Site. These Terms constitute a legally binding agreement between you and Charlessolarwater Projects, a registered engineering company based in Edenvale, Johannesburg, South Africa.
              </p>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">2. Services Description</h3>
              <p>
                Charlessolarwater Projects provides integrated engineering solutions including water engineering systems, electrical infrastructure, solar water heating, construction and civil works, and intelligent automation services. The information on this Site is intended for general informational purposes and does not constitute a binding quotation unless explicitly confirmed in writing by our team.
              </p>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">3. Use of the Website</h3>
              <p className="mb-3">You agree to use the Site only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Use the Site in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorised access to any part of the Site or its systems</li>
                <li>Submit false, misleading, or fraudulent information through our forms</li>
                <li>Use the AI chat assistant to generate harmful, offensive, or illegal content</li>
                <li>Interfere with or disrupt the Site&apos;s functionality or servers</li>
                <li>Copy, reproduce, or distribute any content from the Site without written permission</li>
              </ul>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">4. AI Assistant Disclaimer</h3>
              <p>
                Our AI chat assistant is provided as an informational tool to help guide your enquiries about our services. Responses generated by the AI are for general guidance only and do not constitute professional engineering advice, a binding contract, or an official quotation. For accurate project-specific quotes and engineering assessments, please contact our team directly via phone, email, or WhatsApp. We do not guarantee the accuracy, completeness, or timeliness of AI-generated responses.
              </p>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">5. Intellectual Property</h3>
              <p>
                All content on this Site, including but not limited to text, graphics, logos, images, photographs, design elements, and software, is the property of Charlessolarwater Projects or its licensors and is protected by South African and international intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent.
              </p>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">6. User Submissions</h3>
              <p>
                By submitting information through our contact forms or AI chat, you grant Charlessolarwater Projects a non-exclusive, royalty-free licence to use, process, and store the submitted information for the purpose of responding to your enquiry and improving our services. You retain ownership of your submitted content.
              </p>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">7. Limitation of Liability</h3>
              <p>
                To the fullest extent permitted by South African law, Charlessolarwater Projects shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of the Site, reliance on AI-generated information, or inability to access the Site. This includes, but is not limited to, damages for loss of profits, data, or business opportunities.
              </p>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">8. Accuracy of Information</h3>
              <p>
                While we strive to maintain accurate and up-to-date information on the Site, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the Site. Service descriptions, project details, and specifications may be subject to change without notice.
              </p>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">9. External Links</h3>
              <p>
                The Site may contain links to third-party websites or services (including WhatsApp) that are not owned or controlled by Charlessolarwater Projects. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
              </p>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">10. Indemnification</h3>
              <p>
                You agree to indemnify and hold harmless Charlessolarwater Projects, its directors, employees, and agents from and against any claims, damages, losses, liabilities, and expenses arising from your use of the Site, your violation of these Terms, or your violation of any rights of a third party.
              </p>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">11. Governing Law</h3>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising from these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts of South Africa, with the courts of Johannesburg having primary jurisdiction.
              </p>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">12. Modifications to Terms</h3>
              <p>
                We reserve the right to modify these Terms at any time. Updated Terms will be posted on this page with a revised effective date. Your continued use of the Site after any changes constitutes acceptance of the revised Terms. We encourage you to review these Terms periodically.
              </p>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">13. Severability</h3>
              <p>
                If any provision of these Terms is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
              </p>
            </section>

            <section>
              <h3 className="text-white font-semibold text-base mb-2">14. Contact Information</h3>
              <p>
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-3 bg-white/5 rounded-lg p-4 space-y-1">
                <p className="text-white font-medium">Charlessolarwater Projects</p>
                <p>Edenvale, Johannesburg, South Africa</p>
                <p>Email: <a href="mailto:info@charlessolarwater.co.za" className="text-accent-green hover:underline">info@charlessolarwater.co.za</a></p>
                <p>Phone: <a href="tel:+27833145636" className="text-accent-green hover:underline">+27 83 314 5636</a></p>
              </div>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
