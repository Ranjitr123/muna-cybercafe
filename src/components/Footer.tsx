'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Monitor, ArrowRight, ShieldCheck } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

interface FooterProps {
  adminEmail?: string;
}

export default function Footer({ adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'sanjit007muna@gmail.com' }: FooterProps) {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-navy-800 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-lg">
                <Monitor className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Cyber Café <span className="text-brand-400">Odisha</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your trusted Digital Service Center & Cyber Café in Odisha. Offering fast, secure online application assistance, ticket bookings, printing, scanning, and documentation support.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-800 text-brand-300 border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Trusted Digital Assistance
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-base font-semibold tracking-wider uppercase text-sm border-l-2 border-brand-500 pl-3">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors inline-flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-400" /> Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors inline-flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-400" /> About Us
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors inline-flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-400" /> Computer Courses
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors inline-flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-400" /> Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white transition-colors inline-flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-400" /> Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-base font-semibold tracking-wider uppercase text-sm border-l-2 border-brand-500 pl-3">
              Key Services
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span> Online Form & Exam Application Assistance
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span> PAN Card & Aadhaar Online Assistance
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span> Passport & Scholarship Assistance
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span> Train, Bus & Flight Ticket Booking
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span> High-Quality Color Printing & Scanning
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-base font-semibold tracking-wider uppercase text-sm border-l-2 border-brand-500 pl-3">
              Contact Business
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">Business Address</span>
                  <span className="text-slate-400 text-xs leading-relaxed block">
                    At - Nanapada, PO/PS - Nirakarpur, Dist - Khordha, State - Odisha, Pin - 752019
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">Mobile / WhatsApp</span>
                  <div className="flex flex-col text-slate-300 text-xs gap-0.5 font-semibold">
                    <a href="tel:9777735527" className="hover:text-white transition-colors">
                      +91 9777735527
                    </a>
                    <a href="tel:9668358119" className="hover:text-white transition-colors">
                      +91 9668358119
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">Email</span>
                  <a href={`mailto:${adminEmail}`} className="text-slate-400 hover:text-white text-xs break-all">
                    {adminEmail}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <WhatsAppButton variant="inline" label="Direct WhatsApp" className="w-full text-xs py-2.5" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Cyber Café / Digital Service Center. Owner: Sanjit Rautaray | Manager: Bibhudatta Subudhi.</span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>

      {modalType && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-navy-800">
                {modalType === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold px-2"
              >
                &times;
              </button>
            </div>
            <div className="text-sm text-slate-600 space-y-3 leading-relaxed">
              {modalType === 'privacy' ? (
                <>
                  <p>
                    <strong>Cyber Café Odisha</strong> values customer privacy. We collect customer names, phone numbers, and email addresses solely for providing online form filling and digital application assistance.
                  </p>
                  <p>
                    We do not sell, leak, or share private credentials with unauthorized third parties. All submissions are stored securely for record-keeping and service status communication.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Service Disclaimer:</strong> Our business provides assistance, documentation support, scanning, and printing for online government and private forms. We do NOT represent official government authorities or claim official status unless explicitly authorized.
                  </p>
                  <p>
                    Customers are requested to verify their application details before final payment and submission.
                  </p>
                </>
              )}
            </div>
            <div className="pt-3 border-t text-right">
              <button
                onClick={() => setModalType(null)}
                className="bg-brand-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-brand-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
