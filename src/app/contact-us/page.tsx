import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Phone, Mail, MapPin, UserCheck, Clock, Sparkles, ShieldCheck } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import GoogleMap from '@/components/GoogleMap';

export const metadata: Metadata = {
  title: 'Contact Us | Cyber Cafe & Online Services',
  description:
    'Contact Sanjit Rautaray at Cyber Café / Digital Service Center. Address: At - Nanapada, PO/PS - Nirakarpur, Dist - Khordha, State - Odisha, Pin - 752019. Mob: 9777735527, 9668358119.',
};

export default function ContactUsPage() {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'sanjit007muna@gmail.com';

  return (
    <div className="space-y-12 md:space-y-16 pb-16">
      <section className="bg-gradient-to-b from-navy-800 to-navy-900 text-white py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-brand-800/80 border border-brand-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-brand-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Direct Assistance Available</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Contact <span className="text-brand-400">Cyber Café Odisha</span>
          </h1>

          <p className="text-slate-300 text-base max-w-xl mx-auto">
            Have questions or need assistance with your online application? Contact owner <strong>Sanjit Rautaray</strong> directly or submit an enquiry below.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
              <div className="border-b pb-4">
                <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
                  Contact Information
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Get In Touch</h2>
              </div>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs">
                      <span className="font-medium text-slate-400">Owner: </span>
                      <strong className="text-slate-900 font-bold">Sanjit Rautaray</strong>
                    </div>
                    <div className="text-xs mt-1">
                      <span className="font-medium text-slate-400">Manager: </span>
                      <strong className="text-slate-900 font-bold">Bibhudatta Subudhi</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-slate-400">Mobile & WhatsApp</span>
                    <div className="space-y-1 mt-0.5">
                      <a href="tel:9777735527" className="text-brand-700 font-bold text-base hover:underline block">
                        +91 9777735527
                      </a>
                      <a href="tel:9668358119" className="text-brand-700 font-bold text-base hover:underline block">
                        +91 9668358119
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-slate-400">Email</span>
                    <a href={`mailto:${adminEmail}`} className="text-slate-700 font-semibold text-sm hover:underline break-all">
                      {adminEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-slate-400">Business Address</span>
                    <span className="text-slate-800 font-semibold block leading-snug text-sm">
                      At - Nanapada, PO/PS - Nirakarpur, Dist - Khordha, State - Odisha, Pin - 752019
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-slate-400">Business Hours</span>
                    <span className="text-slate-800 font-semibold">Mon - Sun: 8:00 AM - 9:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:9777735527"
                    className="inline-flex items-center justify-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-2 rounded-xl text-xs transition-colors shadow-sm text-center"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call 9777735527</span>
                  </a>
                  <a
                    href="tel:9668358119"
                    className="inline-flex items-center justify-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-2 rounded-xl text-xs transition-colors shadow-sm text-center"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call 9668358119</span>
                  </a>
                </div>

                <WhatsAppButton variant="inline" label="Chat on WhatsApp" className="w-full py-3 text-sm" />
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-emerald-900 text-xs flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Fast Response Guaranteed:</strong> Form submissions are recorded in Google Sheets and emailed directly to owner Sanjit Rautaray for quick follow-up.
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-4 mb-4">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
                Online Enquiry Form
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Send Us Your Requirement</h2>
            </div>

            <Suspense fallback={<div className="bg-white p-8 rounded-2xl animate-pulse h-96">Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
            Interactive Map
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">Our Location Map (Nanapada, Nirakarpur, Khordha)</h2>
        </div>

        <GoogleMap className="h-[420px]" />
      </section>
    </div>
  );
}
