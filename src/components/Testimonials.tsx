'use client';

import React from 'react';
import { Star, Quote, ShieldCheck, UserCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  role: string;
  comment: string;
  rating: number;
  service: string;
}

const REVIEWS: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar Mohanty',
    location: 'Nirakarpur',
    role: 'OSSSC Aspirant',
    comment: 'Best Cyber Café in Nirakarpur area! Sanjit bhai filled my OSSSC Revenue Inspector form with 100% accuracy. Photo resizing and payment slip generation was done in 5 minutes.',
    rating: 5,
    service: 'Online Form Filling',
  },
  {
    id: '2',
    name: 'Priyanka Das',
    location: 'Nanapada, Khordha',
    role: 'PGDCA Student',
    comment: 'Completed my PGDCA and Tally Prime GST course here. Sanjit Sir explains concepts very practically. Now I am working as an accountant in Khordha.',
    rating: 5,
    service: 'Computer Course',
  },
  {
    id: '3',
    name: 'Soumya Ranjan Nayak',
    location: 'Khordha',
    role: 'College Student',
    comment: 'Got my State Scholarship form submitted smoothly. Also got high quality color printouts for my college project at very reasonable rates. Highly recommended!',
    rating: 5,
    service: 'Scholarship & Printing',
  },
];

export default function Testimonials() {
  return (
    <section className="py-14 bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-10 space-y-10 shadow-sm">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-4 py-1.5 rounded-full text-xs font-bold border border-brand-200">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Customer & Student Reviews</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Trusted by 5,000+ Customers in Nirakarpur, Khordha, Odisha
        </h2>

        <div className="flex items-center justify-center gap-2 text-sm font-bold text-slate-700">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <span>4.9 / 5.0 Rating on Google Reviews</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-4 flex flex-col justify-between hover:shadow-lg transition-shadow relative"
          >
            <Quote className="w-8 h-8 text-brand-100 absolute top-4 right-4" />

            <div className="space-y-3 relative">
              <div className="flex text-amber-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 font-extrabold flex items-center justify-center text-sm shadow-inner shrink-0">
                {rev.name.charAt(0)}
              </div>
              <div>
                <strong className="block text-slate-900 text-xs sm:text-sm">{rev.name}</strong>
                <span className="text-slate-400 text-xs block">{rev.role} • {rev.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
