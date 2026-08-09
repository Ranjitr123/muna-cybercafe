'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  CreditCard,
  UserCheck,
  Globe,
  Ticket,
  GraduationCap,
  Award,
  Printer,
  QrCode,
  Laptop,
  Layers,
  FileCheck2
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  FileText,
  CreditCard,
  UserCheck,
  Globe,
  Ticket,
  GraduationCap,
  Award,
  Printer,
  QrCode,
  Laptop,
  Layers,
  FileCheck2,
};

export interface ServiceItem {
  id: string;
  title: string;
  category?: string;
  description: string;
  features?: string[];
  iconName: string;
  popular?: boolean;
}

interface ServiceCardProps {
  service: ServiceItem;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = iconMap[service.iconName] || FileText;
  const whatsappMsg = `Hello Sanjit, I would like to enquire about: ${service.title}`;
  const whatsappUrl = `https://wa.me/919777735527?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-brand-200 flex flex-col justify-between h-full transform hover:-translate-y-1">
      {service.popular && (
        <div className="absolute -top-3 right-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm tracking-wider uppercase">
          Popular
        </div>
      )}

      <div>
        <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300 shadow-sm">
          <IconComponent className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-700 transition-colors">
          {service.title}
        </h3>

        <p className="text-slate-600 text-sm mb-4 leading-relaxed">
          {service.description}
        </p>

        {service.features && service.features.length > 0 && (
          <ul className="space-y-1.5 mb-6 text-xs text-slate-500">
            {service.features.map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <Link
          href={`/contact-us?service=${encodeURIComponent(service.title)}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-800 transition-colors"
        >
          <span>Request Service</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-md transition-colors"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
