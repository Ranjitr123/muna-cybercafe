'use client';

import React, { useState } from 'react';
import { FileCheck, CheckCircle2, MessageCircle, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

interface ServiceChecklist {
  id: string;
  name: string;
  category: string;
  requiredDocuments: string[];
  notes: string;
}

const CHECKLISTS: ServiceChecklist[] = [
  {
    id: 'pan_new',
    name: 'New PAN Card Application',
    category: 'ID Cards',
    requiredDocuments: [
      'Aadhaar Card (Original / Copy)',
      'Active Mobile Number linked with Aadhaar',
      '2 Recent Passport Size Photographs',
    ],
    notes: 'PAN card usually arrives in 7 to 10 days by India Post. Digital e-PAN delivered in 24 hours.',
  },
  {
    id: 'aadhaar_update',
    name: 'Aadhaar Address & Mobile Link Online Assistance',
    category: 'ID Cards',
    requiredDocuments: [
      'Existing Aadhaar Card Number',
      'Proof of Address (Voter ID / Bank Passbook / Ration Card / Electric Bill)',
      'Active Mobile for OTP verification',
    ],
    notes: 'Update fee is nominal. Address update usually processes in 3-5 days.',
  },
  {
    id: 'passport_new',
    name: 'Passport Online Application',
    category: 'Government Services',
    requiredDocuments: [
      'Aadhaar Card',
      'Matriculation (10th) Certificate / Marksheet (for ECNR status)',
      'Bank Passbook with photo & branch seal',
      'Voter ID Card or PAN Card',
    ],
    notes: 'Slot booking at Passport Seva Kendra (Bhubaneswar) assistance provided.',
  },
  {
    id: 'scholarship_odisha',
    name: 'Odisha State Scholarship (Medhabruti / Post-Matric)',
    category: 'Scholarships',
    requiredDocuments: [
      'Student Aadhaar Card & Active Mobile Number',
      'Bank Account Passbook (Aadhaar Seeded / DBT Linked)',
      'Income Certificate (Issued by Tahsildar)',
      'Caste Certificate & Resident/Nativity Certificate',
      'Matric / Previous Year Marksheet',
      'College Admission Fee Receipt & Roll Number',
    ],
    notes: 'Ensure your bank account is DBT linked with Aadhaar for direct scholarship credit.',
  },
  {
    id: 'exam_osssc',
    name: 'OSSSC / OSSC / Government Job Form Filling',
    category: 'Job Applications',
    requiredDocuments: [
      'Matriculation & Higher Qualification Certificates',
      'Caste Certificate (SEBC / SC / ST if applicable)',
      'Resident Certificate & Employment Exchange Card (if required)',
      'Passport Photo (under 50KB) & Signature (under 20KB)',
    ],
    notes: 'Instant registration slip & payment receipt generated at Cyber Café Nanapada.',
  },
];

export default function DocumentWizard() {
  const [selectedService, setSelectedService] = useState<ServiceChecklist>(CHECKLISTS[0]);

  const handleWhatsAppSend = () => {
    const docs = selectedService.requiredDocuments.map((d) => `• ${d}`).join('\n');
    const message = `Hello Sanjit, I checked the required document checklist for *${selectedService.name}* on your website:\n\n` +
      `📋 *Required Documents:* \n${docs}\n\n` +
      `I am coming to Cyber Café Nanapada, Nirakarpur for assistance. Please guide me.`;

    const url = `https://wa.me/919777735527?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-12 bg-slate-900 bg-gradient-to-br from-slate-950 via-navy-900 to-brand-900 text-white rounded-3xl p-6 sm:p-10 border border-brand-500/30 shadow-2xl space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-700/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-brand-500/25 text-brand-300 px-4 py-1.5 rounded-full text-xs font-extrabold border border-brand-400/40 mb-3 shadow-sm">
            <FileCheck className="w-4 h-4 text-brand-400" />
            <span className="tracking-wide uppercase text-[11px]">Document Checklist Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-sm">
            Required Documents Wizard
          </h2>
          <p className="text-slate-200 text-sm sm:text-base mt-2 font-medium">
            Check exactly what documents to bring before visiting Cyber Café Nanapada, Nirakarpur.
          </p>
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="flex flex-wrap gap-2.5">
        {CHECKLISTS.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedService(item)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
              selectedService.id === item.id
                ? 'bg-brand-600 text-white border-brand-400 shadow-lg scale-102'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border-slate-700'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Selected Checklist Card */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-inner">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h3 className="text-lg sm:text-xl font-black text-brand-300 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            {selectedService.name}
          </h3>
          <span className="bg-brand-500/25 text-brand-200 border border-brand-400/40 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            {selectedService.category}
          </span>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            What Documents to Bring:
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-100">
            {selectedService.requiredDocuments.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-3 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 shadow-sm">
                <span className="w-5 h-5 rounded-full bg-brand-600/40 text-brand-200 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-brand-400/30">
                  {idx + 1}
                </span>
                <span className="font-semibold text-xs leading-relaxed text-slate-100">{doc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-brand-950/90 border border-brand-500/30 p-4 rounded-2xl text-xs sm:text-sm text-brand-200 flex items-start gap-3 shadow-sm">
          <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300">Important Tip:</strong> {selectedService.notes}
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleWhatsAppSend}
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl text-xs transition-transform hover:scale-102 shadow-lg"
          >
            <MessageCircle className="w-4 h-4 fill-current stroke-emerald-600 text-white" />
            <span>Send Checklist & Confirm on WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
}
