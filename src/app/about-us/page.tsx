import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  UserCheck,
  Target,
  Eye,
  ShieldCheck,
  HeartHandshake,
  MapPin,
  Phone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Monitor,
  Award
} from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';
import GoogleMap from '@/components/GoogleMap';

export const metadata: Metadata = {
  title: 'About Us | Sanjit Rautaray Cyber Cafe',
  description:
    'Learn about Sanjit Rautaray and Cyber Café / Digital Service Center in Nirakarpur, Khordha, Odisha. Dedicated to providing trustworthy online form filling, printing, and digital support.',
};

export default function AboutUsPage() {
  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      <section className="bg-gradient-to-b from-navy-800 to-navy-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-800/80 border border-brand-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-brand-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Dedicated Digital Service Center</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            About Cyber Café <span className="text-brand-400">Nirakarpur, Khordha, Odisha</span>
          </h1>

          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Empowering students, job applicants, and citizens across Nirakarpur, Khordha, Odisha with reliable online application assistance, digital documentation, and cyber services.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-square w-full max-w-md mx-auto rounded-2xl bg-gradient-to-br from-brand-600 to-navy-800 p-8 text-white flex flex-col justify-between shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-400 font-bold">
                <UserCheck className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-200 block">Owner & Leadership</span>
                <h3 className="text-xl font-extrabold text-white">Sanjit Rautaray <span className="text-sm font-normal text-brand-200">(Owner)</span></h3>
                <h4 className="text-lg font-bold text-white">Bibhudatta Subudhi <span className="text-sm font-normal text-brand-200">(Manager)</span></h4>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  "Our goal is to make every online application and digital process simple, accurate, and stress-free for citizens in Nirakarpur, Khordha, Odisha."
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col gap-1 text-xs text-brand-200">
                <span>Contact: +91 9777735527 / +91 9668358119</span>
                <span>At - Nanapada, PO/PS - Nirakarpur, Khordha, Odisha - 752019</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
              Business Introduction
            </span>
            <h2 className="text-3xl font-bold text-slate-900">Personalized Service & Experienced Leadership</h2>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Founded by <strong>Sanjit Rautaray</strong> and managed by <strong>Bibhudatta Subudhi</strong>, our Cyber Café / Digital Service Center at Nanapada, Nirakarpur was established to bridge the digital gap in Nirakarpur, Khordha, Odisha. Online form submissions for competitive examinations, scholarships, PAN card requests, and government portal services often involve complex requirements and strict deadlines.
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              We provide individual guidance for every visitor, making sure documents are scanned correctly, certificates uploaded in correct dimensions, and details verified before submission.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Customer First Approach</h4>
                  <p className="text-xs text-slate-500">Patient assistance for every citizen</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Transparent Fee Structure</h4>
                  <p className="text-xs text-slate-500">No hidden charges or inflated fees</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-4 hover:border-brand-200 transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To deliver accurate, hassle-free online form filling assistance, ticket bookings, and digital document processing to every customer in Nirakarpur, Khordha, Odisha with the highest standards of integrity, data security, and speed.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-4 hover:border-brand-200 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To be recognized as the most trusted local digital assistance center in Nirakarpur, Khordha, Odisha, known for friendly customer service, error-free documentation, and modern cyber infrastructure.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-100/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm">
              Our Core Principles
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Why Customers in Nirakarpur, Khordha, Odisha Trust Us</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
              <ShieldCheck className="w-8 h-8 text-brand-600" />
              <h4 className="font-bold text-slate-900 text-base">Data Confidentiality</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                All uploaded documents, passwords, and sensitive credentials are handled with strict privacy protocols.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
              <Award className="w-8 h-8 text-amber-500" />
              <h4 className="font-bold text-slate-900 text-base">High Accuracy</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thorough review of names, dates of birth, category certificates, and photographs prior to final submission.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
              <HeartHandshake className="w-8 h-8 text-emerald-600" />
              <h4 className="font-bold text-slate-900 text-base">Locally Friendly</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Warm, polite communication tailored to the needs of rural and urban citizens across Nirakarpur, Khordha, Odisha.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
              <Monitor className="w-8 h-8 text-blue-600" />
              <h4 className="font-bold text-slate-900 text-base">Modern Equipment</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                High speed internet, laser printing, heavy-duty scanners, and fast computer stations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
              Location & Contact
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Visit Our Center in Nirakarpur</h2>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Have questions about document requirements or need assistance filling an urgent form? Reach out directly to Sanjit Rautaray or visit our center.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-brand-600 shrink-0" />
                <span className="text-slate-700"><strong>Owner:</strong> Sanjit Rautaray</span>
              </div>

              <div className="flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-brand-600 shrink-0" />
                <span className="text-slate-700"><strong>Manager:</strong> Bibhudatta Subudhi</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-slate-700"><strong>Mobile:</strong> 9777735527, 9668358119</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-slate-700"><strong>Address:</strong> At - Nanapada, PO/PS - Nirakarpur, Dist - Khordha, State - Odisha, Pin - 752019</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/contact-us"
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-colors shadow-md flex items-center gap-2"
              >
                <span>Contact Us Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <WhatsAppButton variant="inline" label="WhatsApp Sanjit Rautaray" className="py-3.5 px-6 text-sm" />
            </div>
          </div>

          <div className="lg:col-span-6">
            <GoogleMap className="h-[350px]" />
          </div>
        </div>
      </section>
    </div>
  );
}
