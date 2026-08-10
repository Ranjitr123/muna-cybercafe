import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, Award, CheckCircle2, ShieldCheck, Sparkles, Phone, ArrowRight } from 'lucide-react';
import { coursesData } from '@/lib/coursesData';
import CourseCard from '@/components/CourseCard';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Computer Courses & Training | PGDCA, Web Dev, Tally, MS Office, AI Tools',
  description:
    'Join Computer & Software Training Courses in Nanapada, Nirakarpur, Khordha, Odisha. PGDCA, Full-Stack Web Development (React/Angular), Backend Node.js, DevOps, Tally Prime with GST, MS Office, Photoshop, PageMaker, and AI Productivity Tools.',
  keywords: [
    'Computer Courses Nirakarpur',
    'PGDCA Admission Khordha',
    'Web Development Training Odisha',
    'React Angular Course Khordha',
    'Node js backend training',
    'Tally Prime GST course Odisha',
    'MS Office Excel training',
    'Graphic Design Photoshop PageMaker',
    'AI Tools Course Odisha',
  ],
};

export default function CoursesPage() {
  return (
    <div className="space-y-12 md:space-y-16 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-navy-800 to-navy-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-800/80 border border-brand-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-brand-200">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Practical Computer & Software Training</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Skill-Building <span className="text-brand-400">Computer Courses</span>
          </h1>

          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Gain industry-relevant skills in Software Development, Financial Accounting, Graphic Design, Office Productivity, and Artificial Intelligence at our training center in Nirakarpur, Khordha.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs font-semibold text-brand-200">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Certificate Provided
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Practical Lab Training
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" /> Experienced Mentorship
            </span>
          </div>
        </div>
      </section>

      {/* Courses Catalog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b pb-6">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
              Course Offerings
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Explore Our Training Programs
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Flexible batch timings available for students, job aspirants, and working professionals in Odisha.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Highlights & Training Benefits */}
      <section className="bg-slate-100/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm">
              Why Learn With Us
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Why Choose Sanjit Rautaray Computer Training?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-base">Hands-On Practical Labs</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                100% practical practice on high-speed computer systems with high-speed internet.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-base">Job & Career Guidance</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Resume building, portfolio creation, and guidance for competitive exam & job interviews.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-base">Affordable Fee Structure</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reasonable course fees with installment options tailored for students and local citizens.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                4
              </div>
              <h4 className="font-bold text-slate-900 text-base">AI-Powered Curriculum</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modern 2026 syllabus integrated with ChatGPT, Claude, and AI productivity tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-800 to-navy-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-brand-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Admissions Open</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to Start Your Training Journey?</h3>
            <p className="text-brand-200 text-sm max-w-xl">
              Contact <strong>Sanjit Rautaray</strong> to check batch timings, seat availability, and syllabus details for PGDCA, Web Development, Tally, or MS Office.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 shrink-0">
            <Link
              href="/contact-us"
              className="bg-white text-navy-900 font-bold px-6 py-3.5 rounded-xl hover:bg-brand-50 transition-all text-sm shadow-md flex items-center gap-2"
            >
              <span>Submit Course Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <WhatsAppButton variant="inline" label="WhatsApp Sanjit Rautaray" className="py-3.5 px-6 text-sm" />
          </div>
        </div>
      </section>
    </div>
  );
}
