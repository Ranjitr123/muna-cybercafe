import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  UserCheck,
  ShieldCheck,
  Clock,
  ThumbsUp,
  MapPin,
  Phone,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import ServiceCard, { ServiceItem } from '@/components/ServiceCard';
import CourseCard from '@/components/CourseCard';
import { coursesData } from '@/lib/coursesData';
import WhatsAppButton from '@/components/WhatsAppButton';
import Gallery from '@/components/Gallery';
import GoogleMap from '@/components/GoogleMap';
import GovtUpdatesTicker from '@/components/GovtUpdatesTicker';
import PrintCalculator from '@/components/PrintCalculator';
import ImageResizerTool from '@/components/ImageResizerTool';
import DocumentWizard from '@/components/DocumentWizard';
import Testimonials from '@/components/Testimonials';

export const metadata: Metadata = {
  title: 'Cyber Cafe & Online Services in Odisha | Sanjit Rautaray',
  description:
    'Modern Cyber Café & Digital Service Center in Odisha owned by Sanjit Rautaray. Fast online form filling assistance, ticket bookings, printing, scanning, and documentation.',
};

const homeServices: ServiceItem[] = [
  {
    id: 'form-filling',
    title: 'Online Form Filling Assistance',
    description: 'Expert assistance for submitting recruitment, job applications, and state/central government online forms.',
    features: ['Recruitment Applications', 'Document Upload Support', 'Form Verification'],
    iconName: 'FileText',
    popular: true,
  },
  {
    id: 'pan-card',
    title: 'PAN Card Online Assistance',
    description: 'Guidance and processing support for new PAN application and correction in existing PAN details.',
    features: ['New PAN Application', 'PAN Correction & Updates', 'e-PAN Download'],
    iconName: 'CreditCard',
    popular: true,
  },
  {
    id: 'aadhaar-help',
    title: 'Aadhaar Online Assistance',
    description: 'Help with online Aadhaar address update requests, downloading e-Aadhaar, and document uploads.',
    features: ['e-Aadhaar Download', 'Address Update Request', 'Document Update Help'],
    iconName: 'UserCheck',
    popular: true,
  },
  {
    id: 'passport-help',
    title: 'Passport Application Assistance',
    description: 'Complete guidance for online Passport Seva slot booking, form submission, and document checklist.',
    features: ['Passport Seva Registration', 'Slot Appointment Booking', 'Document Guidance'],
    iconName: 'Globe',
  },
  {
    id: 'ticket-booking',
    title: 'Railway, Bus & Flight Ticket Booking',
    description: 'Instant ticket reservations for IRCTC train journeys, interstate bus travel, and domestic flight tickets.',
    features: ['IRCTC Train Tickets', 'Bus & Flight Booking', 'Tatkal Assistance'],
    iconName: 'Ticket',
    popular: true,
  },
  {
    id: 'exam-form',
    title: 'Exam & Admission Form Filling',
    description: 'Accurate online application submission for school, college admissions, competitive exams, and hall tickets.',
    features: ['Admit Card Download', 'Entrance Exam Forms', 'Admissions Portal Help'],
    iconName: 'GraduationCap',
  },
  {
    id: 'scholarships',
    title: 'Scholarship Applications Support',
    description: 'Assistance for state and national scholarship portal applications for students in Odisha.',
    features: ['State Scholarship Odisha', 'NSP Portal Assistance', 'Document Uploads'],
    iconName: 'Award',
  },
  {
    id: 'resume-cv',
    title: 'Resume & CV Creation',
    description: 'Professional resume building, formatting, and bio-data creation tailored for job applications.',
    features: ['Modern CV Formats', 'PDF Download', 'Bio-Data Printing'],
    iconName: 'FileCheck2',
  },
  {
    id: 'printing-photocopy',
    title: 'Color Printing & High-Speed Photocopy',
    description: 'Crisp black & white and full-color document printing, photocopy, and scanning services.',
    features: ['Color & B/W Prints', 'Bulk Photocopy', 'High Resolution Scans'],
    iconName: 'Printer',
    popular: true,
  },
  {
    id: 'lamination-photo',
    title: 'Lamination & Passport Photo Printing',
    description: 'Instant passport size photo prints with custom backgrounds and heavy-duty document lamination.',
    features: ['Instant Passport Photos', 'Heavy Lamination', 'ID Card Sleeves'],
    iconName: 'Layers',
  },
  {
    id: 'online-payments',
    title: 'Digital Payments & Utility Bill Pay',
    description: 'Assistance for online electricity bill payments, water bills, mobile recharges, and fee payments.',
    features: ['Electricity & Utility Bills', 'Challan Payments', 'Online Transactions'],
    iconName: 'QrCode',
  },
  {
    id: 'internet-computer',
    title: 'High-Speed Computer & Internet Cabin',
    description: 'Dedicated high-speed fiber internet workstations for browsing, typing, downloads, and computer work.',
    features: ['High-Speed Fiber Internet', 'Secure Systems', 'Quiet Work Environment'],
    iconName: 'Laptop',
  },
];

export default function HomePage() {
  return (
    <div className="pb-16">
      <GovtUpdatesTicker />
      
      <div className="space-y-16 md:space-y-24">
        {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-900 via-navy-800 to-navy-900 text-white pt-12 pb-20 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-brand-800/80 border border-brand-500/30 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold text-brand-200">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Your Trusted Digital Service Center in Odisha</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Fast, Reliable <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-brand-400 via-blue-300 to-emerald-400 bg-clip-text text-transparent">
                  Cyber Café & Online
                </span> Services
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Welcome to <strong>Cyber Café & Digital Service Center</strong>, owned by <strong>Sanjit Rautaray</strong> & managed by <strong>Bibhudatta Subudhi</strong>. We provide expert online application assistance, PAN card help, ticket bookings, printing, scanning, and digital documentation in Odisha.
              </p>

              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-3.5 rounded-xl text-xs text-slate-200 flex items-start gap-2.5 max-w-xl mx-auto lg:mx-0">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Note:</strong> We provide independent online submission assistance, typing, and digital documentation support to help citizens complete online procedures accurately.
                </span>
              </div>

              <div className="pt-4 flex flex-wrap justify-center lg:justify-start items-center gap-4">
                <Link
                  href="/contact-us"
                  className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-7 py-4 rounded-xl shadow-lg hover:shadow-brand-500/25 transition-all duration-300 flex items-center gap-2 text-sm transform hover:scale-105"
                >
                  <span>Visit Us / Enquire</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="tel:9777735527"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-4 rounded-xl backdrop-blur-sm transition-all duration-200 flex items-center gap-2 text-sm"
                >
                  <Phone className="w-4 h-4 text-brand-400" />
                  <span>Call 9777735527</span>
                </a>

                <WhatsAppButton variant="inline" label="WhatsApp Us" className="py-4 px-6 text-sm" />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 relative space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-navy-800">Business Details</h3>
                    <p className="text-xs text-slate-500">Cyber Café & Online Hub</p>
                  </div>
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs">
                        <span className="font-medium text-slate-400">Owner: </span>
                        <strong className="text-slate-800 font-semibold text-sm">Sanjit Rautaray</strong>
                      </div>
                      <div className="text-xs mt-0.5">
                        <span className="font-medium text-slate-400">Manager: </span>
                        <strong className="text-slate-800 font-semibold text-sm">Bibhudatta Subudhi</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-slate-400">Mobile & WhatsApp</span>
                      <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                        <a href="tel:9777735527" className="text-brand-700 hover:underline">9777735527</a>
                        <span className="text-slate-400">/</span>
                        <a href="tel:9668358119" className="text-brand-700 hover:underline">9668358119</a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-slate-400">Business Address</span>
                      <span className="text-slate-700 font-semibold text-xs leading-relaxed block">
                        At - Nanapada, PO/PS - Nirakarpur, Dist - Khordha, State - Odisha, Pin - 752019
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t space-y-2">
                  <Link
                    href="/contact-us"
                    className="w-full bg-navy-800 hover:bg-navy-900 text-white font-bold py-3 px-4 rounded-xl text-center text-xs block transition-colors"
                  >
                    Send Quick Form Enquiry
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
            Trust & Efficiency
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">Why Choose Sanjit Rautaray Cyber Café?</h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            We prioritize customer satisfaction, speed, data accuracy, and transparent service fees for every digital task.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-brand-200 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-600 flex items-center justify-center font-bold text-lg">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Fast & Timely Submissions</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Never miss exam or job application deadlines. We double-check form entries before final submit to ensure zero errors.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-brand-200 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Privacy & Data Protection</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Your personal details, OTPs, certificates, and ID documents remain strictly confidential and safe at all times.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-brand-200 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
              <ThumbsUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Friendly Local Guidance</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Direct consultation with owner <strong>Sanjit Rautaray</strong> and manager <strong>Bibhudatta Subudhi</strong>. Get step-by-step guidance on required documents.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
              Comprehensive Offerings
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Major Services Provided</h2>
          </div>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            <span>Have a specific requirement? Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {homeServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Computer Courses Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b pb-6">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
              Computer Training & Courses
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Learn High-Demand Technical & Office Skills
            </h2>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 px-5 py-2.5 rounded-xl shadow-md transition-all"
          >
            <span>View All Courses & Syllabi</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800 hover:underline"
          >
            <span>Explore all 8 Courses (PGDCA, Tally, Node.js, DevOps, MS Office, AI Tools...)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="bg-slate-100/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm">
                Facility & Infrastructure
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Cyber Café Gallery Preview</h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <Gallery limit={3} />
        </div>
      </section>

      {/* Location & Google Maps Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
              Visit Our Center
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Convenient Location in Odisha</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Visit our Cyber Café for face-to-face assistance with your online forms, document printing, or internet needs. Managed by <strong>Bibhudatta Subudhi</strong> (Owner: <strong>Sanjit Rautaray</strong>).
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Center Location</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    At - Nanapada, PO/PS - Nirakarpur, Dist - Khordha, State - Odisha, Pin - 752019
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Contact Numbers</h4>
                  <p className="text-slate-600 text-xs">
                    9777735527, 9668358119 (Call / WhatsApp)
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-900 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-md"
              >
                <span>Get Full Directions & Contact Form</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <GoogleMap className="h-[380px]" />
          </div>
        </div>
      </section>

      {/* Document Checklist Wizard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DocumentWizard />
      </section>

      {/* Print Cost Calculator & Instant Order */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PrintCalculator />
      </section>

      {/* Govt Application Photo & Signature Resizer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ImageResizerTool />
      </section>

      {/* Customer & Student Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Testimonials />
      </section>

      {/* Customer Enquiry CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-800 to-navy-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-3 text-center md:text-left z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Need Quick Digital Service Assistance?</h3>
            <p className="text-brand-200 text-sm max-w-xl">
              Have questions about an upcoming exam form deadline or ticket booking? Submit an enquiry or reach out directly to Sanjit Rautaray.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 z-10 shrink-0">
            <Link
              href="/contact-us"
              className="bg-white text-navy-900 font-bold px-6 py-3.5 rounded-xl hover:bg-brand-50 transition-all text-sm shadow-md"
            >
              Submit Online Form
            </Link>
            <WhatsAppButton variant="inline" label="WhatsApp Support" className="py-3.5 px-6 text-sm" />
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
