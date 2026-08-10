'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Code,
  Server,
  Cpu,
  Calculator,
  FileSpreadsheet,
  Palette,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Phone
} from 'lucide-react';
import { CourseItem } from '@/lib/coursesData';

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Code,
  Server,
  Cpu,
  Calculator,
  FileSpreadsheet,
  Palette,
  Sparkles,
};

interface CourseCardProps {
  course: CourseItem;
}

export default function CourseCard({ course }: CourseCardProps) {
  const [showFullSyllabus, setShowFullSyllabus] = useState(false);
  const IconComponent = iconMap[course.iconName] || GraduationCap;
  
  const whatsappMsg = `Hello Sanjit Rautaray, I want to enquire about the course: ${course.title} (${course.duration}). Please send syllabus & fee details.`;
  const whatsappUrl = `https://wa.me/919777735527?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="group relative bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-brand-200 flex flex-col justify-between h-full transform hover:-translate-y-1">
      {course.badge && (
        <div className="absolute -top-3 right-6 bg-gradient-to-r from-brand-600 to-navy-800 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm tracking-wider uppercase border border-brand-400/30">
          {course.badge}
        </div>
      )}

      <div className="space-y-4">
        {/* Category & Icon */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300 shadow-sm">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-brand-600" />
            {course.duration}
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-700 transition-colors leading-snug">
            {course.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Key Syllabus Modules */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-brand-600" />
              Syllabus Highlights
            </span>
            <button
              onClick={() => setShowFullSyllabus(!showFullSyllabus)}
              className="text-[11px] font-semibold text-brand-700 hover:underline flex items-center gap-0.5"
            >
              {showFullSyllabus ? (
                <>Hide Details <ChevronUp className="w-3 h-3" /></>
              ) : (
                <>View All ({course.syllabus.length}) <ChevronDown className="w-3 h-3" /></>
              )}
            </button>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-600">
            {(showFullSyllabus ? course.syllabus : course.syllabus.slice(0, 3)).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-tight">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {course.outcome && (
          <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
            <strong className="text-slate-700 shrink-0">Outcome:</strong>
            <span className="text-slate-600 truncate">{course.outcome}</span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/contact-us?service=${encodeURIComponent(course.title)}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <span>Enquire Now</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1"
          >
            WhatsApp
          </a>
          <a
            href="tel:9777735527"
            className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-2.5 rounded-xl transition-colors"
            title="Call Sanjit Rautaray"
          >
            <Phone className="w-3.5 h-3.5 text-brand-600" />
          </a>
        </div>
      </div>
    </div>
  );
}
